import { CheckCircle } from "lucide-react";

function WhyChooseUs() {
  const points = [
    "Tamper detection",
    "Complete chain of custody",
    "Role-based security",
    "Real-time notifications",
    "Professional analytics",
    "PDF and Excel reports"
  ];

  return (
    <section className="relative z-10 px-10 py-12">
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
        <h2 className="text-4xl font-extrabold mb-8">Why Organizations Choose CyberPortal</h2>

        <div className="grid md:grid-cols-3 gap-5">
          {points.map((p) => (
            <div key={p} className="flex items-center gap-3 rounded-2xl bg-slate-950/70 p-5">
              <CheckCircle className="text-green-300" />
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;