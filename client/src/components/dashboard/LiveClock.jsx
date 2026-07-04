import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

function LiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Clock /> Live Time
      </h3>

      <p className="text-cyan-300 text-xl font-bold">
        {now.toLocaleDateString("en-IN", { weekday: "long" })}
      </p>

      <p className="text-slate-300 mt-1">
        {now.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        })}
      </p>

      <h2 className="text-4xl font-extrabold mt-3">
        {now.toLocaleTimeString("en-IN")}
      </h2>
    </div>
  );
}

export default LiveClock;