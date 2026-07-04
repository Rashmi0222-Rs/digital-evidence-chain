function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6 animate-pulse">
      <div className="h-5 bg-slate-700 rounded w-1/2 mb-6"></div>

      <div className="h-10 bg-slate-700 rounded mb-4"></div>

      <div className="h-4 bg-slate-700 rounded w-2/3"></div>
    </div>
  );
}

export default SkeletonCard;