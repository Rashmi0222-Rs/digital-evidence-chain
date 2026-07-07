import { useNavigate } from "react-router-dom";
import { ShieldCheck, Search } from "lucide-react";
import { useState, useEffect } from "react";
import SearchModal from "./search/SearchModal";
import toast from "react-hot-toast";
import NotificationBell from "./NotificationBell";
import { IMAGE_URL } from "../config/config";

function Topbar({ refresh }) {
  const navigate = useNavigate();

  const [openSearch, setOpenSearch] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  useEffect(() => {
    const syncUser = () => {
      setUser(JSON.parse(localStorage.getItem("user") || "{}"));
    };

    syncUser();

    window.addEventListener("userUpdated", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("userUpdated", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const avatarUrl = user?.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `${IMAGE_URL}/${user.avatar.replace(/\\/g, "/")}`
    : "";

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpenSearch(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleRefresh = async () => {
    await refresh();
    toast.success("Dashboard refreshed");
  };

  return (
    <div className="relative overflow-visible mb-6 md:mb-8 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-4 md:p-6 shadow-2xl">
      <div className="flex flex-col xl:flex-row justify-between gap-5">
        <div className="min-w-0">
          <p className="text-cyan-300 font-bold mb-1 text-xs md:text-base">
            SECURE WORKSPACE
          </p>

          <h2 className="text-2xl md:text-4xl font-extrabold break-words">
            Welcome, {user?.name || "User"}
          </h2>

          <p className="text-slate-400 mt-2 text-sm md:text-base">
            Logged in as{" "}
            <span className="text-purple-300 capitalize font-bold">
              {user?.role}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <button
            onClick={() => setOpenSearch(true)}
            className="hidden lg:flex w-[360px] xl:w-[420px] items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 px-5 py-3 text-slate-400 hover:border-cyan-400 transition"
          >
            <div className="flex items-center gap-3">
              🔍
              <span>Search users, cases, evidence...</span>
            </div>

            <kbd className="rounded bg-slate-800 px-2 py-1 text-xs">
              Ctrl K
            </kbd>
          </button>

          <button
            onClick={() => setOpenSearch(true)}
            className="lg:hidden rounded-2xl bg-slate-950/70 border border-white/10 p-3 text-cyan-300"
            title="Search"
          >
            <Search size={20} />
          </button>

          <NotificationBell />

          <button
            onClick={handleRefresh}
            className="rounded-2xl bg-cyan-500/20 border border-cyan-400/30 px-4 md:px-5 py-3 text-cyan-300 font-bold flex items-center gap-2 hover:bg-cyan-500/30 transition text-sm md:text-base"
          >
            <ShieldCheck size={18} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <div
            onClick={() => navigate("/profile")}
            className="cursor-pointer"
            title="Profile"
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover border-2 border-cyan-400 shadow-lg"
              />
            ) : (
              <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center text-lg md:text-xl font-bold text-white">
                {(user?.name || "U").charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>

      <SearchModal open={openSearch} onClose={() => setOpenSearch(false)} />
    </div>
  );
}

export default Topbar;