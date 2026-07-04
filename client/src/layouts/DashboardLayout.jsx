import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function DashboardLayout({ refresh, logout, children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  useEffect(() => {
    const syncUser = () => {
      setCurrentUser(JSON.parse(localStorage.getItem("user") || "{}"));
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
      <Sidebar role={currentUser?.role} logout={logout} />

      <main className="flex-1 p-8 bg-[radial-gradient(circle_at_top_right,#7c3aed33,transparent_35%),radial-gradient(circle_at_bottom_left,#06b6d433,transparent_35%)] overflow-y-auto">
        <Topbar refresh={refresh} />
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;