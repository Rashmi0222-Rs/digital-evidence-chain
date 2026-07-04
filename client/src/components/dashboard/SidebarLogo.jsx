import { ShieldCheck } from "lucide-react";

function SidebarLogo({ collapsed }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
        <ShieldCheck />
      </div>

      {!collapsed && (
        <div>
          <h1 className="text-2xl font-extrabold">
            Evidence<span className="text-cyan-300">Chain</span>
          </h1>
          <p className="text-xs text-cyan-300">Security Portal</p>
        </div>
      )}
    </div>
  );
}

export default SidebarLogo;