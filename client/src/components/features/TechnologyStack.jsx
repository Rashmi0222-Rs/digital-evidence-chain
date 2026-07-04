function TechnologyStack() {
  const tech = ["React", "Node.js", "Express", "MongoDB", "JWT", "SHA-256", "Tailwind", "Recharts"];

  return (
    <section className="relative z-10 px-10 py-12">
      <h2 className="text-4xl font-extrabold mb-8">Technology Stack</h2>

      <div className="grid md:grid-cols-4 gap-5">
        {tech.map((t) => (
          <div key={t} className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-6 text-center font-bold text-cyan-300">
            {t}
          </div>
        ))}
      </div>
    </section>
  );
}

export default TechnologyStack;