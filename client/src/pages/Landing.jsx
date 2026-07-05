import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CyberBackground from "../components/CyberBackground";
import CyberEffects from "../components/CyberEffects";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import {
  ShieldCheck,
  Lock,
  Fingerprint,
  Bell,
  Users,
  BarChart3,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  ChevronUp
} from "lucide-react";
import API from "../services/api";
import cyberHero from "../assets/Cyber-hero.png";

function Landing() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    evidence: 0,
    users: 0,
    cases: 0,
    integrity: 100
  });

  const [info, setInfo] = useState(null);

  useEffect(() => {
   API
  .get("/public/stats")
  .then((res) => setStats(res.data))
  .catch((err) => console.log(err));
  }, []);

  const features = [
    ["Secure Evidence", ShieldCheck, "Protect and store digital evidence safely."],
    ["Hash Verification", Fingerprint, "SHA-256 hash verification detects tampering instantly."],
    ["Chain of Custody", Lock, "Maintain a complete audit trail for every evidence file."],
    ["Live Analytics", BarChart3, "Track evidence, cases, users and verification status."],
    ["Instant Alerts", Bell, "Receive real-time notifications for important activities."],
    ["Role Access", Users, "Separate dashboards for Admin, Verifier and User."]
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden relative">
      <img
        src={cyberHero}
        className="absolute inset-0 w-full h-[760px] object-cover opacity-55"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/40 via-[#020617]/80 to-[#020617]" />
      <CyberBackground />
      <CyberEffects />
      <nav className="relative z-10 flex justify-between items-center px-10 py-6">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <ShieldCheck className="text-cyan-300" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold">
              CYBER<span className="text-cyan-300">PORTAL</span>
            </h1>
            <p className="text-xs text-slate-400">DIGITAL EVIDENCE CHAIN SYSTEM</p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-10 font-semibold">

  <Link
    to="/"
    className="hover:text-cyan-300 transition"
  >
    HOME
  </Link>

  <Link
    to="/features"
    className="hover:text-cyan-300 transition"
  >
    FEATURES
  </Link>

  <Link
    to="/about"
    className="hover:text-cyan-300 transition"
  >
    ABOUT
  </Link>

  <Link
    to="/contact"
    className="hover:text-cyan-300 transition"
  >
    CONTACT
  </Link>

</div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-7 py-3 rounded-xl border border-cyan-400/40 hover:bg-cyan-500/20"
          >
            LOGIN
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 font-bold"
          >
            REGISTER
          </button>
        </div>
      </nav>

      <section id="home" className="relative z-10 px-10 pt-20 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-bold mb-6">
            SECURE • VERIFY • PROTECT
          </div>

          <h2 className="text-7xl font-extrabold leading-tight">
            DIGITAL EVIDENCE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500">
              CHAIN OF CUSTODY
            </span>
          </h2>

          <p className="text-slate-300 text-lg mt-6 leading-relaxed">
            A secure MERN platform for managing cases, uploading evidence,
            verifying SHA-256 hashes, detecting tampering and maintaining a
            complete chain of custody.
          </p>

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 font-bold flex items-center gap-2"
            >
              GET STARTED <ArrowRight size={18} />
            </button>

            <a
              href="#features"
              className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 font-bold"
            >
              LEARN MORE
            </a>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-4 gap-4 rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-xl p-4">
          {[
            ["Evidence Verified", "2 sec ago"],
            ["New Case Created", "5 sec ago"],
            ["Verifier Logged In", "8 sec ago"],
            ["Evidence Uploaded", "12 sec ago"]
          ].map(([title, time]) => (
            <div key={title} className="border-r border-white/10 last:border-r-0 px-4">
              <p className="text-green-300 text-sm font-bold">● LIVE UPDATE</p>
              <p>{title}</p>
              <p className="text-xs text-slate-500">{time}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="relative z-10 px-10 py-12 grid md:grid-cols-3 xl:grid-cols-6 gap-5">
        {features.map(([title, Icon, desc]) => (
          <div
            key={title}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-cyan-400/50 hover:-translate-y-2 transition"
          >
            <div className="h-16 w-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-5 shadow-lg shadow-cyan-500/20">
              <Icon className="text-cyan-300" size={32} />
            </div>

            <h3 className="font-bold text-cyan-300 mb-3">{title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{desc}</p>

            <button
              onClick={() => setInfo({ title, desc })}
              className="text-cyan-300 text-sm mt-5"
            >
              Learn more →
            </button>
          </div>
        ))}
      </section>

      <section id="about" className="relative z-10 px-10 py-12 grid lg:grid-cols-2 gap-10">
        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-xl p-8">
         <img
  src="https://images.indianexpress.com/2018/06/hacking_111.jpg"
  className="w-full h-72 object-cover rounded-3xl mb-6 border border-cyan-400/30"
/>

          <h3 className="text-4xl font-extrabold">
            Building Trust in Digital Investigations
          </h3>

          <p className="text-slate-300 mt-5 leading-relaxed">
            CyberPortal is designed for secure digital evidence management,
            forensic workflows, tamper detection, real-time monitoring and
            transparent investigation reporting.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {[
            [stats.evidence, "Evidence Files"],
            [stats.users, "Registered Users"],
            [stats.cases, "Cases Managed"],
            [`${stats.integrity}%`, "Data Integrity"]
          ].map(([num, label]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center hover:border-cyan-400/40 transition"
            >
              <h2 className="text-5xl font-extrabold">{num}</h2>
              <p className="text-slate-400 mt-2">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="relative z-10 mx-10 mb-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 grid md:grid-cols-4 gap-6">
        <div>
          <p className="text-purple-300 font-bold">HAVE QUESTIONS?</p>
          <h3 className="text-2xl font-bold mt-2">We're Here to Help!</h3>
        </div>

        <div className="flex items-center gap-4">
          <Mail className="text-cyan-300" />
          <div>
            <p className="text-sm text-slate-400">Email</p>
            <p>support@cyberportal.com</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Phone className="text-cyan-300" />
          <div>
            <p className="text-sm text-slate-400">Phone</p>
            <p>+91 98765 43210</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <MapPin className="text-cyan-300" />
          <div>
            <p className="text-sm text-slate-400">Location</p>
            <p>Bangalore, India</p>
          </div>
        </div>
      </section>

      {info && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-5">
          <div className="max-w-lg rounded-3xl border border-cyan-400/30 bg-slate-950 p-8 shadow-2xl">
            <h2 className="text-3xl font-bold text-cyan-300 mb-4">
              {info.title}
            </h2>

            <p className="text-slate-300 leading-relaxed">
              {info.desc}
            </p>

            <button
              onClick={() => setInfo(null)}
              className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-20 h-14 w-14 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center shadow-xl"
      >
        <ChevronUp />
      </button>
    </div>
  );
}

export default Landing;