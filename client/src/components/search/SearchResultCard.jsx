const colors = {
  cyan: "bg-cyan-500/20 text-cyan-300",
  purple: "bg-purple-500/20 text-purple-300",
  green: "bg-green-500/20 text-green-300",
  yellow: "bg-yellow-500/20 text-yellow-300"
};

function SearchResultCard({
    icon,
    title,
    subtitle,
    status,
    color="cyan",
    selected=false,
    onClick
}) {
  return (
    <button
      onClick={onClick}
      className={`
w-full
flex
justify-between
items-center
rounded-xl
p-4
transition

${
selected
? "bg-cyan-500/20 border border-cyan-400"
: "hover:bg-slate-800"
}
`}
    >
      <div className="flex gap-4 items-center">
        <div
          className={`h-12 w-12 rounded-xl flex items-center justify-center ${
            colors[color] || colors.cyan
          }`}
        >
          {icon}
        </div>

        <div className="text-left">
          <h4 className="font-semibold">{title}</h4>

          {subtitle && (
            <p className="text-sm text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {status && (
        <span className="text-xs rounded-full px-3 py-1 bg-purple-500/20 text-purple-300">
          {status}
        </span>
      )}
    </button>
  );
}

export default SearchResultCard;