function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-40 rounded-3xl bg-white/10 border border-white/10" />

      <div className="grid md:grid-cols-5 gap-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-40 rounded-3xl bg-white/10 border border-white/10"
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-80 rounded-3xl bg-white/10 border border-white/10"
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardSkeleton;