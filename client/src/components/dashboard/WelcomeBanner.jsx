function WelcomeBanner({ user }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 p-8 mb-8">
      <p className="text-cyan-300 font-bold">SECURE DASHBOARD</p>
      <h1 className="text-4xl font-extrabold mt-2">
        Welcome back, {user?.name} 👋
      </h1>
      <p className="text-slate-300 mt-3">
        Monitor cases, evidence, verification status and chain of custody.
      </p>
    </div>
  );
}

export default WelcomeBanner;