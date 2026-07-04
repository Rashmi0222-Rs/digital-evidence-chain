import { ShieldCheck } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-12 mt-20">

      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-10">

        <div>
          <div className="flex items-center gap-3 mb-4">

            <ShieldCheck className="text-cyan-300" />

            <h2 className="text-2xl font-bold text-white">
              CYBERPORTAL
            </h2>

          </div>

          <p className="text-slate-400">
            Secure Digital Evidence Chain Management System
            for organizations and investigators.
          </p>

        </div>

        <div>
          <h3 className="font-bold text-white mb-4">
            Product
          </h3>

          <p className="text-slate-400">Features</p>
          <p className="text-slate-400">Analytics</p>
          <p className="text-slate-400">Reports</p>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4">
            Company
          </h3>

          <p className="text-slate-400">About</p>
          <p className="text-slate-400">Contact</p>
          <p className="text-slate-400">Support</p>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4">
            Security
          </h3>

          <p className="text-slate-400">
            SHA-256 Integrity
          </p>

          <p className="text-slate-400">
            JWT Authentication
          </p>

          <p className="text-slate-400">
            Role-Based Access
          </p>

        </div>

      </div>

      <div className="text-center text-slate-500 mt-10">
        © {new Date().getFullYear()} CyberPortal • All Rights Reserved
      </div>

    </footer>
  );
}

export default Footer;