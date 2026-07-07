const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const PasswordReset = require("../models/PasswordReset");

const sendMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  family: 4,
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 15000,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
  return transporter.sendMail({
    from: `"CyberPortal" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "CyberPortal Password Reset OTP",
    html: `
      <h2>Password Reset Request</h2>
      <p>Your OTP is:</p>
      <h1>${otp}</h1>
      <p>This OTP expires in 10 minutes.</p>
    `
  });
};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    console.log("OTP request received for:", email);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing EMAIL_USER or EMAIL_PASS");
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

    const record = await PasswordReset.findOne({ email, otp });

    if (!record) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    if (record.expiresAt < Date.now()) {
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