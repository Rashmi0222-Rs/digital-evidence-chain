import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Home, LockKeyhole, Mail, KeyRound, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

import loginBg from "../assets/login-bg.png";
import CyberBackground from "../components/CyberBackground";
import CyberEffects from "../components/CyberEffects";

function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter registered email");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/forgot-password/send-otp",
        { email }
      );

      toast.success(res.data.message);
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    if (!email || !otp || !newPassword) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/forgot-password/reset",
        {
          email,
          otp,
          newPassword
        }
      );

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <img
        src={loginBg}
        alt="Forgot Password Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/60 to-[#020617]/90" />

      <CyberBackground />
      <CyberEffects />

      <button
        type="button"
        onClick={() => navigate("/")}
        className="fixed top-6 left-6 z-[9999] flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-slate-950/80 px-5 py-3 backdrop-blur-xl hover:bg-cyan-500/20 transition"
      >
        <Home size={20} />
        Home
      </button>

      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-between p-14 pt-28">
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <ShieldCheck className="text-cyan-300" size={34} />
            </div>

            <div>
              <h1 className="text-4xl font-extrabold">
                CYBER<span className="text-cyan-300">PORTAL</span>
              </h1>
              <p className="text-sm text-slate-400">
                DIGITAL EVIDENCE CHAIN SYSTEM
              </p>
            </div>
          </div>

          <div>
            <div className="inline-flex px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-bold mb-6">
              PASSWORD RECOVERY
            </div>

            <h2 className="text-6xl font-extrabold leading-tight max-w-2xl">
              Recover Access to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500">
                Secure Workspace
              </span>
            </h2>

            <p className="text-slate-300 mt-6 max-w-xl text-lg">
              Request a one-time password on your registered email and reset
              your account password securely.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl p-5">
            {[
              ["Step 1", "Enter Email"],
              ["Step 2", "Verify OTP"],
              ["Step 3", "Reset Password"]
            ].map(([title, desc]) => (
              <div key={title}>
                <p className="text-cyan-300 font-bold">{title}</p>
                <p className="text-xs text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center p-6">
          <form
            onSubmit={step === 1 ? sendOtp : resetPassword}
            className="w-full max-w-xl rounded-[2rem] border border-cyan-400/30 bg-slate-950/75 backdrop-blur-2xl p-10 shadow-[0_0_70px_rgba(6,182,212,0.25)]"
          >
            <div className="mx-auto mb-5 h-20 w-20 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <LockKeyhole className="text-cyan-300" size={40} />
            </div>

            <h2 className="text-4xl font-extrabold text-center">
              Forgot <span className="text-purple-400">Password</span>
            </h2>

            <p className="text-center text-slate-400 mt-2 mb-7">
              {step === 1
                ? "Enter your registered email to receive OTP"
                : "Enter OTP and create your new password"}
            </p>

            <label className="text-sm font-semibold">Registered Email</label>
            <div className="mt-2 mb-5 flex items-center gap-3 rounded-xl bg-slate-950 border border-white/10 px-4 py-3">
              <Mail className="text-slate-400" size={18} />
              <input
                type="email"
                placeholder="Enter registered email"
                className="w-full bg-transparent outline-none"
                value={email}
                disabled={step === 2}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {step === 2 && (
              <>
                <label className="text-sm font-semibold">OTP</label>
                <div className="mt-2 mb-5 flex items-center gap-3 rounded-xl bg-slate-950 border border-white/10 px-4 py-3">
                  <KeyRound className="text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    className="w-full bg-transparent outline-none"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <label className="text-sm font-semibold">New Password</label>
                <div className="mt-2 mb-5 flex items-center gap-3 rounded-xl bg-slate-950 border border-white/10 px-4 py-3">
                  <KeyRound className="text-slate-400" size={18} />
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full bg-transparent outline-none"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </>
            )}

            <button
              disabled={loading}
              className="w-full rounded-xl py-4 bg-gradient-to-r from-cyan-400 to-purple-600 font-bold hover:scale-[1.02] transition disabled:opacity-50"
            >
              {loading
                ? step === 1
                  ? "Sending OTP..."
                  : "Resetting..."
                : step === 1
                ? "SEND OTP"
                : "RESET PASSWORD"}
            </button>

            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full mt-4 rounded-xl py-3 border border-white/10 hover:bg-white/10"
              >
                Change Email
              </button>
            )}

            <p className="text-center text-slate-400 mt-6">
              Remember your password?
              <Link to="/login" className="text-cyan-300 ml-2 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;