import { useEffect, useState } from "react";

function CyberEffects() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const move = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(34,211,238,0.22), transparent 28%)`
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee14_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee14_1px,transparent_1px)] bg-[size:70px_70px]" />

      {[...Array(35)].map((_, i) => (
        <span
          key={i}
          className="absolute text-cyan-300/20 text-xs animate-pulse"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 29) % 100}%`,
            animationDelay: `${i * 0.2}s`
          }}
        >
          {i % 2 === 0 ? "101011" : "010110"}
        </span>
      ))}

      {[...Array(18)].map((_, i) => (
        <div
          key={`node-${i}`}
          className="absolute h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.9)] animate-ping"
          style={{
            left: `${(i * 23) % 100}%`,
            top: `${(i * 41) % 100}%`,
            animationDelay: `${i * 0.3}s`
          }}
        />
      ))}

      {[...Array(8)].map((_, i) => (
        <div
          key={`hex-${i}`}
          className="absolute h-24 w-24 border border-cyan-400/20 rotate-45 animate-bounce"
          style={{
            left: `${(i * 13) % 90}%`,
            top: `${(i * 19) % 85}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${5 + i}s`
          }}
        />
      ))}

      <div className="absolute -bottom-40 left-1/2 h-[650px] w-[650px] -translate-x-1/2 rounded-full border border-cyan-400/20 animate-pulse" />
      <div className="absolute -bottom-56 left-1/2 h-[850px] w-[850px] -translate-x-1/2 rounded-full border border-purple-400/10 animate-pulse" />

      <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl animate-pulse" />
    </div>
  );
}

export default CyberEffects;