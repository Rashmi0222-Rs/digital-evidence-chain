const bcrypt = require("bcryptjs");
const axios = require("axios");
const User = require("../models/User");
const PasswordReset = require("../models/PasswordReset");

const sendMail = async (email, otp) => {
  return axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: {
        name: "CyberPortal",
        email: process.env.EMAIL_FROM
      },
      to: [
        {
          email: email
        }
      ],
      subject: "CyberPortal Password Reset OTP",
      htmlContent: `
        <div style="font-family:Arial,sans-serif;padding:20px">
          <h2>Password Reset Request</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <h1 style="color:#2563eb">${otp}</h1>
          <p>This OTP is valid for <b>10 minutes</b>.</p>
          <p>If you did not request this, please ignore this email.</p>
          <hr />
          <p>Digital Evidence Chain System</p>
        </div>
      `
    },
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json"
      },
      timeout: 15000
    }
  );
};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    if (!process.env.BREVO_API_KEY || !process.env.EMAIL_FROM) {
      return res.status(500).json({
        message: "Brevo email service is not configured"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await PasswordReset.deleteMany({ email });

    await PasswordReset.create({
      email,
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    });

    await sendMail(email, otp);

    res.json({
      message: "OTP sent to your email"
    });
  } catch (err) {
    console.error("BREVO OTP ERROR:", err.response?.data || err.message);

    res.status(500).json({
      message: "Unable to send OTP",
      error: err.response?.data?.message || err.message
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        message: "Please fill all fields"
      });
    }

    const record = await PasswordReset.findOne({ email, otp });

    if (!record) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    if (record.expiresAt < Date.now()) {
      await PasswordReset.deleteMany({ email });

      return res.status(400).json({
        message: "OTP expired"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    await PasswordReset.deleteMany({ email });

    res.json({
      message: "Password reset successful"
    });
  } catch (err) {
    console.error("PASSWORD RESET ERROR:", err.message);

    res.status(500).json({
      message: "Password reset failed",
      error: err.message
    });
  }
};