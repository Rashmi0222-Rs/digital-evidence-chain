function EmptyState({ message = "No data found" }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-10 text-center">
      <p className="text-5xl mb-4">📂</p>
      <h3 className="text-2xl font-bold">Nothing here</h3>
      <p className="text-slate-400 mt-2">{message}</p>
    </div>
  );
}

export default EmptyState;