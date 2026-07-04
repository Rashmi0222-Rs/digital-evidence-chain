import { Bell, CheckCircle, AlertTriangle, Upload, FolderKanban } from "lucide-react";

function Notifications({ logs }) {
  const recent = logs.slice(0, 5);

  const getIcon = (action) => {
    if (action?.includes("Uploaded")) return <Upload className="text-cyan-300" />;
    if (action?.includes("Verified")) return <CheckCircle className="text-green-300" />;
    if (action?.includes("Tampered")) return <AlertTriangle className="text-red-300" />;
    return <FolderKanban className="text-purple-300" />;
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 mb-8">
      <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">
        <Bell /> Notifications
      </h3>

      <div className="space-y-4">
        {recent.map((log) => (
          <div
            key={log._id}
            className="flex items-center gap-4 rounded-2xl bg-slate-950/70 border border-white/10 p-4"
          >
            {getIcon(log.action)}
            <div>
              <p className="font-semibold">{log.action}</p>
              <p className="text-sm text-slate-400">{log.remarks}</p>
            </div>
          </div>
        ))}

        {recent.length === 0 && (
          <p className="text-slate-400 text-center py-5">No notifications.</p>
        )}
      </div>
    </div>
  );
}

export default Notifications;