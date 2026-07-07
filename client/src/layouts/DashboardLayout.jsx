import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout({ refresh, logout, children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const syncUser = () => {
      setCurrentUser(
        JSON.parse(localStorage.getItem("user") || "{}")
      );
    };

    syncUser();

    window.addEventListener("storage", syncUser);
    window.addEventListener("userUpdated", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("userUpdated", syncUser);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">

      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar
          role={currentUser?.role}
          logout={logout}
        />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="fixed left-0 top-0 h-full z-50">
            <Sidebar
              role={currentUser?.role}
              logout={logout}
            />
          </div>
        </>
      )}

      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,#7c3aed33,transparent_35%),radial-gradient(circle_at_bottom_left,#06b6d433,transparent_35%)]">

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-950 sticky top-0 z-30">

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-cyan-500/20"
          >
            {sidebarOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

          <h2 className="font-bold text-lg">
            Digital Evidence
          </h2>

          <div className="w-10" />
        </div>

        <div className="p-4 md:p-8">
          <Topbar refresh={refresh} />
          {children}
        </div>

      </main>
    </div>
  );
}

export default DashboardLayout;