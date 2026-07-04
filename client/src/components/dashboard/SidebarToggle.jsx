import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

function SidebarToggle({ collapsed, setCollapsed }) {
  return (
    <button
      onClick={() => setCollapsed(!collapsed)}
      className="absolute -right-4 top-8 h-9 w-9 rounded-full bg-slate-950 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-lg"
    >
      {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
    </button>
  );
}

export default SidebarToggle;