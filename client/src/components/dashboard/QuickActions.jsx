import { useNavigate } from "react-router-dom";
import {
  FolderPlus,
  Upload,
  BadgeCheck,
  FileText,
  Users,
  Activity,
  FolderOpen,
  Bell,
  BarChart3
} from "lucide-react";

function QuickActions({ role = "user" }) {
  const navigate = useNavigate();

  let actions = [];

  // ==========================
  // ADMIN ACTIONS
  // ==========================
  if (role === "admin") {
    actions = [
      ["Create Case", FolderPlus, "/evidence"],
      ["Upload Evidence", Upload, "/evidence"],
      ["Verify Evidence", BadgeCheck, "/verification"],
      ["Manage Users", Users, "/users"],
      ["Analytics", BarChart3, "/analytics"],
      ["Generate Report", FileText, "/analytics"]
    ];
  }

  // ==========================
  // VERIFIER ACTIONS
  // ==========================
  else if (role === "verifier") {
    actions = [
      ["Verify Evidence", BadgeCheck, "/verification"],
      ["View Evidence", FolderOpen, "/evidence"],
      ["Activity Logs", Activity, "/activity"],
      ["Generate Report", FileText, "/analytics"]
    ];
  }

  // ==========================
  // USER ACTIONS
  // ==========================
  else {
    actions = [
      ["Create Case", FolderPlus, "/evidence"],
      ["Upload Evidence", Upload, "/evidence"],
      ["My Evidence", FolderOpen, "/evidence"],
      ["Notifications", Bell, "/notifications"]
    ];
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>

      <div className="grid md:grid-cols-2 gap-4">
        {actions.map(([title, Icon, path]) => (
          <button
            key={title}
            onClick={() => navigate(path)}
            className="group rounded-2xl bg-slate-950/70 border border-white/10 p-5 text-left hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300"
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Icon className="text-cyan-300" size={24} />
            </div>

            <h4 className="font-bold text-lg">{title}</h4>
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;