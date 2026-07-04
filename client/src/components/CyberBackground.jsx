function CyberBackground() {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee12_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee12_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />

        {[...Array(28)].map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan-300 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}

        {[...Array(18)].map((_, i) => (
          <span
            key={`b-${i}`}
            className="absolute text-cyan-400/25 text-xs animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {Math.random() > 0.5 ? "1010" : "0101"}
          </span>
        ))}
      </div>
    </>
  );
}

export default CyberBackground;