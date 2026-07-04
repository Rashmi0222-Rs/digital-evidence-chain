
function RoleBanner({ title, subtitle, badge }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-xl p-6 mb-8">
      <p className="text-cyan-300 font-bold mb-2">{badge}</p>
      <h3 className="text-3xl font-extrabold">{title}</h3>
      <p className="text-slate-300 mt-2">{subtitle}</p>
    </div>
  );
}

export default RoleBanner;