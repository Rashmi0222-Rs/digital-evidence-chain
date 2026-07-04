function Loading() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-10 text-center">
      <div className="h-12 w-12 mx-auto rounded-full border-4 border-cyan-400 border-t-transparent animate-spin"></div>
      <p className="text-slate-400 mt-4">Loading data...</p>
    </div>
  );
}

export default Loading;