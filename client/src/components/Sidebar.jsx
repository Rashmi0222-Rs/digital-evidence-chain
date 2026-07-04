import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileSearch,
  BadgeCheck,
  Activity,
  BarChart3,
  Bell,
  User,
  FileText,
  LogOut
} from "lucide-react";

import SidebarLogo from "./dashboard/SidebarLogo";
import SidebarProfile from "./dashboard/SidebarProfile";
import SidebarToggle from "./dashboard/SidebarToggle";

function Sidebar({ role, logout }) {
  const [collapsed, setCollapsed] = useState(false);

  const menu = [
    ["Dashboard", "/dashboard", LayoutDashboard],
    role === "admin" && ["Users", "/users", Users],
    ["Evidence", "/evidence", FileSearch],
    role !== "user" && ["Verification", "/verification", BadgeCheck],
    ["Activity Logs", "/activity-logs", Activity],
    role !== "user" && ["Analytics", "/analytics", BarChart3],
    ["Reports", "/reports", FileText],
    ["Notifications", "/notifications", Bell],
    ["Profile", "/profile", User]
  ].filter(Boolean);

  return (
    <aside
      className={`relative hidden md:flex flex-col bg-slate-950/90 border-r border-cyan-400/10 backdrop-blur-xl transition-all duration-300 shadow-2xl ${
        collapsed ? "w-24" : "w-72"
      }`}
    >
      <div className="p-6">
        <SidebarToggle collapsed={collapsed} setCollapsed={setCollapsed} />

        <SidebarLogo collapsed={collapsed} />

        <div className="space-y-2 mt-8">
          {menu.map(([name, path, Icon]) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `flex items-center ${
                  collapsed ? "justify-center" : "gap-4"
                } rounded-2xl px-4 py-4 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/20 text-white shadow-lg"
                    : "text-slate-300 hover:bg-white/10 hover:text-cyan-300"
                }`
              }
            >
              <Icon size={22} />
              {!collapsed && <span className="font-medium">{name}</span>}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="mt-auto p-6">
        <SidebarProfile collapsed={collapsed} />

        <button
          onClick={logout}
          className={`w-full flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-300 p-4 transition`}
        >
          <LogOut size={20} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;