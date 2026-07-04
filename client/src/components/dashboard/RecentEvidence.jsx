function RecentEvidence({ evidence }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
      <h3 className="text-2xl font-bold mb-5">Recent Evidence</h3>

      <div className="space-y-3">
        {evidence.slice(0, 5).map((ev) => (
          <div key={ev._id} className="rounded-2xl bg-slate-950/70 border border-white/10 p-4">
            <p className="font-bold">{ev.originalName}</p>
            <p className="text-sm text-slate-400">{ev.caseId?.caseTitle}</p>
            <p className="text-xs text-cyan-300 mt-1">{ev.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentEvidence;