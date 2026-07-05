import { useState } from "react";
import API from "../services/api";
import {
  LockKeyhole,
  ShieldCheck,
  Mail,
  KeyRound,
  Home
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import loginBg from "../assets/login-bg.png";
import CyberBackground from "../components/CyberBackground";
import CyberEffects from "../components/CyberEffects";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
  email,
  password,
});
      if (res.data.user.role !== role) {
        toast.error(
          `This account is registered as ${res.data.user.role}, not ${role}`
        );
        setLoading(false);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <img
        src={loginBg}
        alt="Cyber Login Background"
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
              SECURE • VERIFY • PROTECT
            </div>

            <h2 className="text-6xl font-extrabold leading-tight max-w-2xl">
              Secure Access for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500">
                Digital Evidence Control
              </span>
            </h2>

            <p className="text-slate-300 mt-6 max-w-xl text-lg">
              Login to manage cases, verify hashes, detect tampering, monitor
              activity logs and protect the chain of custody.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4 rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl p-5">
            {[
              ["Secure", "Encrypted access"],
              ["Verify", "SHA-256 hashing"],
              ["Track", "Audit trails"],
              ["Protect", "Role access"]
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
            onSubmit={loginHandler}
            className="w-full max-w-xl rounded-[2rem] border border-cyan-400/30 bg-slate-950/75 backdrop-blur-2xl p-10 shadow-[0_0_70px_rgba(6,182,212,0.25)]"
          >
            <div className="mx-auto mb-5 h-20 w-20 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <LockKeyhole className="text-cyan-300" size={40} />
            </div>

            <h2 className="text-4xl font-extrabold text-center">
              Welcome <span className="text-purple-400">Back</span>
            </h2>

            <p className="text-center text-slate-400 mt-2 mb-7">
              Sign in to access your secure workspace
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {["admin", "verifier", "user"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`rounded-xl p-3 capitalize font-semibold transition ${
                    role === r
                      ? "bg-gradient-to-r from-cyan-400 to-purple-600"
                      : "border border-white/10 bg-slate-950/60 hover:bg-white/10"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <label className="text-sm font-semibold">Email Address</label>
            <div className="mt-2 mb-5 flex items-center gap-3 rounded-xl bg-slate-950 border border-white/10 px-4 py-3">
              <Mail className="text-slate-400" size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <label className="text-sm font-semibold">Password</label>
            <div className="mt-2 mb-5 flex items-center gap-3 rounded-xl bg-slate-950 border border-white/10 px-4 py-3">
              <KeyRound className="text-slate-400" size={18} />
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={loading}
              className="w-full rounded-xl py-4 bg-gradient-to-r from-cyan-400 to-purple-600 font-bold hover:scale-[1.02] transition disabled:opacity-50"
            >
              {loading ? "Signing In..." : "LOGIN"}
            </button>

            <div className="flex justify-between mt-6 text-sm">
              <Link to="/register" className="text-cyan-300 hover:underline">
                Create Account
              </Link>

              <Link
                to="/forgot-password"
                className="text-purple-300 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;