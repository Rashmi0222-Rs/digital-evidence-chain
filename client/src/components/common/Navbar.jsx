import { NavLink, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <ShieldCheck />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-white">
              CYBER
              <span className="text-cyan-300">
                PORTAL
              </span>
            </h1>

            <p className="text-xs text-slate-400">
              DIGITAL EVIDENCE CHAIN
            </p>
          </div>
        </div>

        <div className="hidden lg:flex gap-10 font-semibold text-white">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-300"
                : "hover:text-cyan-300 transition"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/features"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-300"
                : "hover:text-cyan-300 transition"
            }
          >
            Features
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-300"
                : "hover:text-cyan-300 transition"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-cyan-300"
                : "hover:text-cyan-300 transition"
            }
          >
            Contact
          </NavLink>

        </div>

        <div className="flex gap-4">

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-xl border border-cyan-400/30 text-white hover:bg-cyan-500/20 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-600 font-bold text-white"
          >
            Register
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;