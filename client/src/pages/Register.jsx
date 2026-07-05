import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  ShieldCheck,
  Home
} from "lucide-react";
import API from "../services/api";
import toast from "react-hot-toast";

import registerBg from "../assets/register-bg.png";
import CyberBackground from "../components/CyberBackground";
import CyberEffects from "../components/CyberEffects";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const passwordStrength = () => {
    const p = form.password;

    if (p.length < 6) return "Weak";

    if (p.match(/[A-Z]/) && p.match(/[0-9]/) && p.match(/[^A-Za-z0-9]/)) {
      return "Strong";
    }

    return "Medium";
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      return toast.error("Please fill all fields");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password
      });

      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <img
        src={registerBg}
        alt="Register Background"
        className="absolute inset-0 w-full h-full object-cover"
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

      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">
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
              CREATE YOUR ACCOUNT
            </div>

            <h2 className="text-6xl font-extrabold leading-tight">
              Join Our
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500">
                Secure Evidence Platform
              </span>
            </h2>

            <p className="text-slate-300 mt-6 max-w-xl text-lg">
              Register to securely upload evidence, manage investigations,
              verify SHA-256 hashes and maintain the complete chain of custody.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4 rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl p-5">
            {[
              ["Secure", "Encrypted"],
              ["Verify", "SHA-256"],
              ["Track", "Evidence"],
              ["Protect", "Role Access"]
            ].map(([t, s]) => (
              <div key={t}>
                <p className="text-cyan-300 font-bold">{t}</p>
                <p className="text-xs text-slate-400">{s}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center p-6 lg:p-10">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-xl rounded-[2rem] bg-slate-950/75 backdrop-blur-2xl border border-cyan-400/30 p-8 lg:p-10 shadow-[0_0_70px_rgba(6,182,212,0.25)]"
          >
            <div className="flex justify-center mb-5">
              <div className="h-20 w-20 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <UserPlus size={38} className="text-cyan-300" />
              </div>
            </div>

            <h2 className="text-center text-4xl font-extrabold mb-3">
              Create <span className="text-purple-400">Account</span>
            </h2>

            <p className="text-center text-slate-400 mb-7">
              Join us and secure your digital evidence
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold">Full Name</label>
                <div className="mt-2 flex items-center bg-slate-950 rounded-xl px-4 border border-white/10">
                  <User className="text-cyan-300" size={19} />
                  <input
                    className="w-full bg-transparent p-4 outline-none text-white"
                    placeholder="Enter your full name"
                    name="name"
                    value={form.name}
                    onChange={changeHandler}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold">Email Address</label>
                <div className="mt-2 flex items-center bg-slate-950 rounded-xl px-4 border border-white/10">
                  <Mail className="text-cyan-300" size={19} />
                  <input
                    className="w-full bg-transparent p-4 outline-none text-white"
                    placeholder="Enter your email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={changeHandler}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold">Password</label>
                <div className="mt-2 flex items-center bg-slate-950 rounded-xl px-4 border border-white/10">
                  <Lock className="text-cyan-300" size={19} />
                  <input
                    className="w-full bg-transparent p-4 outline-none text-white"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    name="password"
                    value={form.password}
                    onChange={changeHandler}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold">Confirm Password</label>
                <div className="mt-2 flex items-center bg-slate-950 rounded-xl px-4 border border-white/10">
                  <Lock className="text-cyan-300" size={19} />
                  <input
                    className="w-full bg-transparent p-4 outline-none text-white"
                    type="password"
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={changeHandler}
                  />
                </div>
              </div>

              <p
                className={`text-sm font-semibold ${
                  passwordStrength() === "Strong"
                    ? "text-green-300"
                    : passwordStrength() === "Medium"
                    ? "text-yellow-300"
                    : "text-red-300"
                }`}
              >
                Password Strength: {passwordStrength()}
              </p>

              <button className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 p-4 text-xl font-bold hover:scale-[1.02] transition">
                REGISTER
              </button>

              <p className="text-center text-slate-400">
                Already have an account?
                <Link className="text-cyan-300 ml-2 hover:underline" to="/login">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;