function SystemHealth() {
  const items = ["API Online", "MongoDB Connected", "JWT Active", "Storage Ready"];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
      <h3 className="text-2xl font-bold mb-5">System Health</h3>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item} className="flex justify-between rounded-2xl bg-slate-950/70 border border-white/10 p-4">
            <span>{item}</span>
            <span className="text-green-300 font-bold">● Healthy</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SystemHealth;