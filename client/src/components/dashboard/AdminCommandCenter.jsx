import { useNavigate } from "react-router-dom";
import {
  FolderPlus,
  Upload,
  BadgeCheck,
  Users,
  FileText,
  BarChart3,
  Server,
  Database,
  ShieldCheck
} from "lucide-react";

import DashboardCards from "../DashboardCards";
import RecentEvidence from "./RecentEvidence";
import RecentActivity from "./RecentActivity";
import SecurityScore from "./SecurityScore";
import LiveClock from "./LiveClock";
import SecurityOperationsCenter from "./SecurityOperationsCenter";

function AdminCommandCenter({
  user,
  cases = [],
  evidence = [],
  logs = [],
  users = []
}) {
  const navigate = useNavigate();

  const actions = [
    ["Create Case", "/evidence", FolderPlus],
    ["Upload Evidence", "/evidence", Upload],
    ["Verify Evidence", "/verification", BadgeCheck],
    ["Manage Users", "/users", Users],
    ["Reports", "/reports", FileText],
    ["Analytics", "/analytics", BarChart3]
  ];

  return (
    <>
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 p-8 mb-8">
        <p className="text-cyan-300 font-bold">
          DIGITAL FORENSICS COMMAND CENTER
        </p>

        <h1 className="text-4xl font-extrabold mt-2">
          Welcome back, {user?.name} 👋
        </h1>

        <p className="text-slate-300 mt-3">
          Monitor users, cases, evidence integrity, reports and system activity.
        </p>
      </div>

      <DashboardCards cases={cases} evidence={evidence} logs={logs} />

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
          <h3 className="text-2xl font-bold mb-5">Quick Actions</h3>

          <div className="grid md:grid-cols-2 gap-4">
            {actions.map(([name, path, Icon]) => (
              <button
                key={name}
                onClick={() => navigate(path)}
                className="text-left rounded-2xl bg-slate-950/70 border border-white/10 p-5 hover:bg-purple-500/20 transition hover:scale-105"
              >
                <Icon className="text-cyan-300 mb-3" />
                <p className="font-bold">{name}</p>
              </button>
            ))}
          </div>
        </div>

        <LiveClock />

        <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
          <h3 className="text-2xl font-bold mb-5">System Health</h3>

          {[
            ["Server", "Running", Server],
            ["Database", "Connected", Database],
            ["Security", "Protected", ShieldCheck],
            ["Storage", "Active", FileText]
          ].map(([title, status, Icon]) => (
            <div
              key={title}
              className="flex justify-between items-center rounded-2xl bg-slate-950/70 border border-white/10 p-4 mb-3 hover:border-cyan-400 transition"
            >
              <div className="flex items-center gap-3">
                <Icon className="text-cyan-300" />
                <span>{title}</span>
              </div>

              <span className="text-green-300 font-bold">● {status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <RecentEvidence evidence={evidence} />
        <RecentActivity logs={logs} />
        <SecurityScore evidence={evidence} />
      </div>

      <SecurityOperationsCenter
        cases={cases}
        evidence={evidence}
        logs={logs}
        users={users}
      />
    </>
  );
}

export default AdminCommandCenter;