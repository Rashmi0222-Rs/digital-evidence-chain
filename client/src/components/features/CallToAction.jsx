import { useNavigate } from "react-router-dom";

function CallToAction() {
  const navigate = useNavigate();

  return (
    <section className="relative z-10 px-10 py-16">
      <div className="rounded-3xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 p-10 text-center">
        <h2 className="text-5xl font-extrabold">Ready to Secure Your Digital Evidence?</h2>

        <p className="text-slate-300 mt-4">
          Start managing digital evidence with confidence, transparency and security.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 font-bold"
          >
            Register
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 rounded-xl border border-white/20"
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;