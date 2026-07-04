import { Globe2 } from "lucide-react";

function CyberGlobe() {
  return (
    <div className="relative h-[420px] rounded-3xl border border-cyan-400/20 bg-slate-950/80 overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.15)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#06b6d433,transparent_45%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee14_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee14_1px,transparent_1px)] bg-[size:45px_45px]" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="relative h-72 w-72 rounded-full border border-cyan-400/40 flex items-center justify-center animate-pulse">
          <div className="absolute h-96 w-96 rounded-full border border-purple-400/20 animate-ping" />
          <div className="absolute h-80 w-80 rounded-full border border-cyan-400/20 animate-spin [animation-duration:18s]" />

          <Globe2 size={150} className="text-cyan-300 drop-shadow-[0_0_30px_rgba(34,211,238,0.9)]" />

          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <span
              key={i}
              className="absolute h-3 w-3 rounded-full bg-green-400 shadow-[0_0_20px_rgba(34,197,94,1)]"
              style={{
                left: `${20 + i * 8}%`,
                top: `${25 + (i % 3) * 18}%`
              }}
            />
          ))}
        </div>

        <h3 className="text-2xl font-bold mt-6">Global Evidence Monitoring</h3>
        <p className="text-slate-400 text-sm mt-2">
          Live cyber evidence security surveillance
        </p>
      </div>
    </div>
  );
}

export default CyberGlobe;