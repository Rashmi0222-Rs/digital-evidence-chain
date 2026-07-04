function SearchLoading() {
  return (
    <div className="py-10 text-center">
      <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>

      <p className="mt-4 text-slate-400">
        Searching...
      </p>
    </div>
  );
}

export default SearchLoading;