import { SearchX } from "lucide-react";

function SearchEmpty() {
  return (
    <div className="py-14 text-center text-slate-400">
      <SearchX size={55} className="mx-auto mb-5 opacity-60" />

      <h3 className="text-xl font-bold">
        No Results Found
      </h3>

      <p className="mt-2">
        Try another keyword.
      </p>
    </div>
  );
}

export default SearchEmpty;