import { ShieldCheck, Fingerprint, Bell, BarChart3, Users, FileCheck2 } from "lucide-react";

function FeatureCards() {
  const features = [
    ["Secure Evidence", ShieldCheck, "Protected evidence storage with controlled access."],
    ["SHA-256 Verification", Fingerprint, "Detect file tampering using cryptographic hashing."],
    ["Chain of Custody", FileCheck2, "Complete evidence movement and action history."],
    ["Live Alerts", Bell, "Instant notifications for key investigation events."],
    ["Analytics", BarChart3, "Visual dashboards for cases, evidence and logs."],
    ["Role Access", Users, "Separate dashboards for Admin, Verifier and User."]
  ];

  return (
    <section className="relative z-10 px-10 py-10">
      <h2 className="text-4xl font-extrabold mb-8">Core Security Features</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map(([title, Icon, desc]) => (
          <div
            key={title}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 hover:border-cyan-400/50 hover:-translate-y-2 transition"
          >
            <Icon className="text-cyan-300 mb-5" size={42} />
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-slate-400">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeatureCards;