import { Activity, User, FolderKanban, FileText } from "lucide-react";
import EmptyState from "./common/EmptyState";

function ActivityLogs({ logs = [] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-4 md:p-6">

      <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
        <Activity />
        Recent Activity Logs
      </h3>

      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">

        {logs.length === 0 ? (

          <EmptyState message="No activity found." />

        ) : (

          logs.map((log) => (

            <div
              key={log._id}
              className="rounded-2xl bg-slate-950/70 border border-white/10 p-4 md:p-5 hover:border-cyan-400/20 transition"
            >

              <div className="flex flex-col md:flex-row md:justify-between gap-2">

                <h4 className="font-bold text-cyan-300 break-words">
                  {log.action}
                </h4>

                <span className="text-xs text-slate-500 whitespace-nowrap">
                  {new Date(log.createdAt).toLocaleString()}
                </span>

              </div>

              <p className="text-sm text-slate-300 mt-3 break-words">
                {log.remarks}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 text-sm">

                <div className="flex items-center gap-2 text-slate-400">
                  <User size={16} className="text-cyan-400" />
                  <span className="truncate">
                    {log.userId?.name || "N/A"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  <FolderKanban size={16} className="text-purple-400" />
                  <span className="truncate">
                    {log.caseId?.caseTitle || "N/A"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                  <FileText size={16} className="text-green-400" />
                  <span className="truncate">
                    {log.evidenceId?.originalName || "N/A"}
                  </span>
                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default ActivityLogs;