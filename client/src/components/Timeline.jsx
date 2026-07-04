import { Clock } from "lucide-react";

function Timeline({ logs }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Clock /> Chain of Custody Timeline
      </h3>

      <div className="relative border-l border-cyan-400/40 ml-4 space-y-7">
        {logs.length === 0 ? (
          <p className="text-slate-400 pl-6">No timeline records.</p>
        ) : (
          logs.slice(0, 10).map((log) => (
            <div key={log._id} className="relative pl-8">
              <div className="absolute -left-[10px] top-1 h-5 w-5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 shadow-lg shadow-cyan-500/40"></div>

              <h4 className="font-bold">{log.action}</h4>
              <p className="text-sm text-slate-400 mt-1">{log.remarks}</p>
              <p className="text-xs text-cyan-300 mt-2">
                {new Date(log.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Timeline;