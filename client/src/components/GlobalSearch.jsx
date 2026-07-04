import { useEffect, useState } from "react";
import { Search, Users, FolderOpen, FileText, Activity } from "lucide-react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await API.get(`/search?q=${query}`);

        setResults(res.data);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);

  }, [query]);

  return (
    <div className="relative w-full max-w-lg z-[9999]">
      <div className="flex items-center rounded-2xl bg-slate-950 border border-white/10 px-4 py-3">
        <Search className="text-cyan-300 mr-2" size={18} />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users, cases, evidence..."
          className="bg-transparent outline-none w-full"
        />
      </div>

      {results && (
       <div
  className="
    absolute
    left-0
    top-16
    w-[700px]
    max-h-[70vh]
    overflow-y-auto
    rounded-3xl
    border
    border-cyan-500/20
    bg-slate-900/95
    backdrop-blur-2xl
    shadow-[0_0_50px_rgba(0,255,255,0.15)]
    z-[9999]
  "
>

          {loading && (
            <p className="p-4 text-center text-slate-400">
              Searching...
            </p>
          )}

          {!loading && (
            <>
              {/* Users */}
              {results.users.length > 0 && (
                <>
                  <div className="px-4 pt-4 pb-2 font-bold text-cyan-300 flex items-center gap-2">
                    <Users size={16} />
                    Users
                  </div>

                  {results.users.map((u) => (
                    <button
                      key={u._id}
                      onClick={() => {
                        navigate("/users");
                        setQuery("");
                        setResults(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-cyan-500/10"
                    >
                      {u.name}
                      <div className="text-xs text-slate-400">
                        {u.email}
                      </div>
                    </button>
                  ))}
                </>
              )}

              {/* Cases */}
              {results.cases.length > 0 && (
                <>
                  <div className="px-4 pt-4 pb-2 font-bold text-purple-300 flex items-center gap-2">
                    <FolderOpen size={16} />
                    Cases
                  </div>

                  {results.cases.map((c) => (
                    <button
                      key={c._id}
                      onClick={() => {
                        navigate("/evidence");
                        setQuery("");
                        setResults(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-purple-500/10"
                    >
                      {c.caseTitle}
                    </button>
                  ))}
                </>
              )}

              {/* Evidence */}
              {results.evidence.length > 0 && (
                <>
                  <div className="px-4 pt-4 pb-2 font-bold text-green-300 flex items-center gap-2">
                    <FileText size={16} />
                    Evidence
                  </div>

                  {results.evidence.map((e) => (
                    <button
                      key={e._id}
                      onClick={() => {
                        navigate("/evidence");
                        setQuery("");
                        setResults(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-green-500/10"
                    >
                      {e.originalName}
                    </button>
                  ))}
                </>
              )}

              {/* Activity */}
              {results.activities.length > 0 && (
                <>
                  <div className="px-4 pt-4 pb-2 font-bold text-yellow-300 flex items-center gap-2">
                    <Activity size={16} />
                    Activity
                  </div>

                  {results.activities.map((a) => (
                    <button
                      key={a._id}
                      onClick={() => {
                        navigate("/activity");
                        setQuery("");
                        setResults(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-yellow-500/10"
                    >
                      {a.action}
                    </button>
                  ))}
                </>
              )}

              {results.users.length === 0 &&
                results.cases.length === 0 &&
                results.evidence.length === 0 &&
                results.activities.length === 0 && (
                  <p className="p-4 text-center text-slate-400">
                    No results found
                  </p>
                )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default GlobalSearch;