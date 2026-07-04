import { Activity } from "lucide-react";

function ActivityLogs({ logs }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Activity /> Recent Activity Logs
      </h3>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {logs.length === 0 ? (
          <p className="text-center text-slate-400 py-10">
            No activity found.
          </p>
        ) : (
          logs.map((log) => (
            <div
              key={log._id}
              className="rounded-2xl bg-slate-950/70 border border-white/10 p-4"
            >
              <div className="flex justify-between">
                <h4 className="font-bold text-cyan-300">
                  {log.action}
                </h4>

                <span className="text-xs text-slate-500">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-sm text-slate-300 mt-2">
                {log.remarks}
              </p>

              <div className="text-xs text-slate-500 mt-3">
                <p>
                  <strong>User:</strong> {log.userId?.name || "N/A"}
                </p>

                <p>
                  <strong>Case:</strong>{" "}
                  {log.caseId?.caseTitle || "N/A"}
                </p>

                <p>
                  <strong>Evidence:</strong>{" "}
                  {log.evidenceId?.originalName || "N/A"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ActivityLogs;