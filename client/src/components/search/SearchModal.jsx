import { useEffect, useState } from "react";
import { Search, Users, FolderOpen, FileText, Activity, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

import SearchOverlay from "./SearchOverlay";
import SearchLoading from "./SearchLoading";
import SearchEmpty from "./SearchEmpty";
import SearchSection from "./SearchSection";
import SearchResultCard from "./SearchResultCard";

function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const allResults = results
    ? [
        ...(results.users || []).map((x) => ({ ...x, route: "/users" })),
        ...(results.cases || []).map((x) => ({ ...x, route: "/evidence" })),
        ...(results.evidence || []).map((x) => ({ ...x, route: "/evidence" })),
        ...(results.activities || []).map((x) => ({ ...x, route: "/activity-logs" }))
      ]
    : [];

  const go = (path) => {
    navigate(path);
    setQuery("");
    setResults(null);
    setSelectedIndex(0);
    onClose();
  };

  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          Math.min(prev + 1, Math.max(allResults.length - 1, 0))
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }

      if (e.key === "Enter" && allResults[selectedIndex]) {
        go(allResults[selectedIndex].route);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, allResults, selectedIndex]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      setSelectedIndex(0);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await API.get(`/search?q=${query}`);
        setResults(res.data);
        setSelectedIndex(0);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  if (!open) return null;

  const hasResults =
    results &&
    ((results.users?.length || 0) +
      (results.cases?.length || 0) +
      (results.evidence?.length || 0) +
      (results.activities?.length || 0) >
      0);

  return (
    <>
      <SearchOverlay onClose={onClose} />

      <div className="fixed inset-x-0 top-20 z-[9999] mx-auto w-[90%] max-w-4xl rounded-3xl border border-cyan-500/20 bg-slate-950/95 backdrop-blur-2xl shadow-[0_0_80px_rgba(6,182,212,0.25)]">
        <div className="flex items-center gap-4 border-b border-white/10 p-5">
          <Search className="text-cyan-300" />

          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users, cases, evidence, activity logs..."
            className="w-full bg-transparent outline-none text-lg"
          />

          <button onClick={onClose} className="text-slate-400 hover:text-red-300">
            <X />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-4">
          {loading && <SearchLoading />}

          {!loading && query && !hasResults && <SearchEmpty />}

          {!loading && results?.users?.length > 0 && (
            <SearchSection title="Users" icon={<Users className="text-cyan-300" />}>
              {results.users.map((u) => (
                <SearchResultCard
                  key={u._id}
                  icon={<Users size={20} />}
                  title={u.name}
                  subtitle={u.email}
                  status={u.role}
                  color="cyan"
                  selected={allResults[selectedIndex]?._id === u._id}
                  onClick={() => go("/users")}
                />
              ))}
            </SearchSection>
          )}

          {!loading && results?.cases?.length > 0 && (
            <SearchSection title="Cases" icon={<FolderOpen className="text-purple-300" />}>
              {results.cases.map((c) => (
                <SearchResultCard
                  key={c._id}
                  icon={<FolderOpen size={20} />}
                  title={c.caseTitle}
                  subtitle={c.category}
                  status={c.status}
                  color="purple"
                  selected={allResults[selectedIndex]?._id === c._id}
                  onClick={() => go("/evidence")}
                />
              ))}
            </SearchSection>
          )}

          {!loading && results?.evidence?.length > 0 && (
            <SearchSection title="Evidence" icon={<FileText className="text-green-300" />}>
              {results.evidence.map((ev) => (
                <SearchResultCard
                  key={ev._id}
                  icon={<FileText size={20} />}
                  title={ev.originalName}
                  subtitle={ev.caseId?.caseTitle || ev.fileType}
                  status={ev.status}
                  color="green"
                  selected={allResults[selectedIndex]?._id === ev._id}
                  onClick={() => go("/evidence")}
                />
              ))}
            </SearchSection>
          )}

          {!loading && results?.activities?.length > 0 && (
            <SearchSection title="Activity Logs" icon={<Activity className="text-yellow-300" />}>
              {results.activities.map((a) => (
                <SearchResultCard
                  key={a._id}
                  icon={<Activity size={20} />}
                  title={a.action}
                  subtitle={a.remarks}
                  color="yellow"
                  selected={allResults[selectedIndex]?._id === a._id}
                  onClick={() => go("/activity-logs")}
                />
              ))}
            </SearchSection>
          )}

          {!query && (
            <div className="py-12 text-center text-slate-400">
              Type to search across users, cases, evidence and logs.
              <p className="mt-2 text-xs">Press Esc to close.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchModal;