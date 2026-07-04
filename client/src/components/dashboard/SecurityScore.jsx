function SecurityScore({ evidence }) {
  const total = evidence.length || 1;
  const verified = evidence.filter((e) => e.status === "verified").length;
  const score = Math.round((verified / total) * 100);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
      <h3 className="text-2xl font-bold mb-5">Integrity Score</h3>

      <h2 className="text-6xl font-extrabold text-cyan-300">{score}%</h2>
      <p className="text-slate-400 mt-2">Verified evidence ratio</p>

      <div className="w-full h-3 bg-slate-800 rounded-full mt-5">
        <div
          className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
}

export default SecurityScore;