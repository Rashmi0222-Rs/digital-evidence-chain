import { useEffect, useState } from "react";
import axios from "axios";
import { ShieldCheck, Target, Eye, Lock, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import CyberBackground from "../components/CyberBackground";
import CyberEffects from "../components/CyberEffects";

function About() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    evidence: 0,
    users: 0,
    cases: 0,
    integrity: 100
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/public/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  const principles = [
    "Evidence Integrity",
    "Tamper Detection",
    "Secure Chain of Custody",
    "Role-Based Access",
    "Audit Transparency",
    "Real-Time Monitoring"
  ];

  return (
    <div className="relative min-h-screen bg-[#020617] text-white overflow-hidden">
      <CyberBackground />
      <CyberEffects />
      <Navbar />

      <section className="relative z-10 px-10 py-24">
        <p className="text-cyan-300 font-bold mb-4">ABOUT CYBERPORTAL</p>

        <h1 className="text-7xl font-extrabold leading-tight max-w-5xl">
          Building Trust in
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500">
            Digital Investigations
          </span>
        </h1>

        <p className="text-slate-300 text-lg mt-6 max-w-3xl">
          CyberPortal is a secure Digital Evidence Chain Management System
          designed to protect evidence integrity, maintain chain of custody,
          detect tampering and support transparent investigation workflows.
        </p>
      </section>

      <section className="relative z-10 px-10 grid lg:grid-cols-3 gap-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <Target className="text-cyan-300 mb-5" size={50} />
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-slate-300">
            To provide a secure and reliable platform for managing digital
            evidence with transparency, traceability and cryptographic integrity.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <Eye className="text-purple-300 mb-5" size={50} />
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-slate-300">
            To become a trusted digital investigation platform for institutions,
            forensic teams, organizations and cyber security professionals.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
          <Lock className="text-green-300 mb-5" size={50} />
          <h2 className="text-3xl font-bold mb-4">Security First</h2>
          <p className="text-slate-300">
            Every evidence file is protected using SHA-256 hashing, activity logs,
            verification controls and role-based dashboard access.
          </p>
        </div>
      </section>

      <section className="relative z-10 px-10 py-20">
        <h2 className="text-4xl font-extrabold mb-8">Platform Statistics</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            [stats.evidence, "Evidence Files"],
            [stats.users, "Registered Users"],
            [stats.cases, "Cases Managed"],
            [`${stats.integrity}%`, "Data Integrity"]
          ].map(([num, label]) => (
            <div
              key={label}
              className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-8 text-center backdrop-blur-xl"
            >
              <h3 className="text-5xl font-extrabold">{num}</h3>
              <p className="text-slate-400 mt-2">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-10 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10">
          <h2 className="text-4xl font-extrabold mb-8">Security Principles</h2>

          <div className="grid md:grid-cols-3 gap-5">
            {principles.map((p) => (
              <div key={p} className="flex items-center gap-3 rounded-2xl bg-slate-950/70 p-5">
                <CheckCircle className="text-green-300" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-10 py-20">
        <div className="rounded-3xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 p-10 text-center">
          <ShieldCheck className="mx-auto text-cyan-300 mb-5" size={70} />

          <h2 className="text-5xl font-extrabold">
            Secure Your Digital Evidence Today
          </h2>

          <p className="text-slate-300 mt-4">
            Start managing evidence with confidence and transparency.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="mt-8 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 font-bold inline-flex items-center gap-2"
          >
            Get Started <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;