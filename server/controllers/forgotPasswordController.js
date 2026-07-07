const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const PasswordReset = require("../models/PasswordReset");

const sendMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.verify();

  return transporter.sendMail({
    from: `"CyberPortal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "CyberPortal Password Reset OTP",
    html: `
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
  });
};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    console.log("OTP request received for:", email);

    if (
      !process.env.EMAIL_HOST ||
      !process.env.EMAIL_PORT ||
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS
    ) {
      console.error("Missing email environment variables");

      return res.status(500).json({
        message: "Email service is not configured"
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

    console.log("OTP sent successfully to:", email);

    res.json({
      message: "OTP sent to your email"
    });
  } catch (err) {
    console.error("OTP SEND ERROR:", err);

    res.status(500).json({
      message: "Unable to send OTP",
      error: err.message
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
    console.error("PASSWORD RESET ERROR:", err);

    res.status(500).json({
      message: "Password reset failed",
      error: err.message
    });
  }
};