function RecentActivity({ logs }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
      <h3 className="text-2xl font-bold mb-5">Recent Activity</h3>

      <div className="space-y-4">
        {logs.slice(0, 5).map((log) => (
          <div key={log._id} className="border-l-2 border-cyan-400 pl-4">
            <p className="font-bold">{log.action}</p>
            <p className="text-sm text-slate-400">{log.remarks}</p>
            <p className="text-xs text-cyan-300 mt-1">
              {new Date(log.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;