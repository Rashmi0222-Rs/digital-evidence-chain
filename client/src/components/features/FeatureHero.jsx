import { useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight, Play } from "lucide-react";

function FeatureHero() {
  const navigate = useNavigate();

  return (
    <section className="relative z-10 px-10 py-20">
      <div className="max-w-4xl">
        <p className="text-cyan-300 font-bold mb-4">CYBERPORTAL FEATURES</p>

        <h1 className="text-7xl font-extrabold leading-tight">
          Enterprise Digital
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500">
            Evidence Platform
          </span>
        </h1>

        <p className="text-slate-300 text-lg mt-6 max-w-2xl">
          Securely upload evidence, generate SHA-256 hashes, verify integrity,
          detect tampering, monitor chain of custody and manage investigation workflows.
        </p>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 font-bold flex gap-2"
          >
            Get Started <ArrowRight />
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 font-bold flex gap-2"
          >
            Live Demo <Play />
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeatureHero;