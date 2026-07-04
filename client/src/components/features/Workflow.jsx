import { Upload, Hash, Database, BadgeCheck, Activity } from "lucide-react";

function Workflow() {
  const steps = [
    ["Upload", Upload],
    ["Generate Hash", Hash],
    ["Secure Storage", Database],
    ["Verify Evidence", BadgeCheck],
    ["Audit Trail", Activity]
  ];

  return (
    <section className="relative z-10 px-10 py-12">
      <h2 className="text-4xl font-extrabold mb-8">How CyberPortal Works</h2>

      <div className="grid md:grid-cols-5 gap-5">
        {steps.map(([title, Icon], i) => (
          <div key={title} className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 text-center">
            <Icon className="mx-auto text-cyan-300 mb-4" size={42} />
            <p className="font-bold">{title}</p>
            <p className="text-slate-500 text-sm mt-2">Step {i + 1}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Workflow;