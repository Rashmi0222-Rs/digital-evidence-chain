function Pagination({ page, setPage, total, limit }) {
  const pages = Math.ceil(total / limit);

  if (pages <= 1) return null;

  return (
    <div className="flex justify-center gap-3 mt-6">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 rounded-xl bg-white/10 disabled:opacity-40"
      >
        Previous
      </button>

      <span className="px-4 py-2 text-cyan-300">
        Page {page} of {pages}
      </span>

      <button
        disabled={page === pages}
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 rounded-xl bg-white/10 disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;