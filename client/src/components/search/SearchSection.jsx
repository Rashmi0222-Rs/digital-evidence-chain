function SearchSection({
  title,
  icon,
  children
}) {
  return (
    <div className="border-b border-white/10 py-4">

      <div className="flex items-center gap-3 mb-3 px-4">

        {icon}

        <h3 className="font-bold text-cyan-300">
          {title}
        </h3>
      </div>

      {children}

    </div>
  );
}

export default SearchSection;