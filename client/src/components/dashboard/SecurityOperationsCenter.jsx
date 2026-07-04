import {
  ShieldCheck,
  Radar,
  Server,
  Database,
  Lock,
  AlertTriangle,
  Activity,
  Globe2
} from "lucide-react";
import CyberGlobe from "./CyberGlobe";

function SecurityOperationsCenter({ cases = [], evidence = [], logs = [], users = [] }) {
  const verified = evidence.filter((e) => e.status === "verified").length;
  const tampered = evidence.filter((e) => e.status === "tampered").length;
  const pending = evidence.filter((e) => e.status === "pending").length;

  const score = evidence.length
    ? Math.round((verified / evidence.length) * 100)
    : 100;

  return (
    <div className="grid xl:grid-cols-3 gap-8 mt-8">
      <div className="xl:col-span-2">
  <CyberGlobe />
</div>
      <div className="rounded-3xl border border-white/10 bg-white/10 p-8">
        <h3 className="text-3xl font-extrabold mb-6 flex items-center gap-3">
          <ShieldCheck className="text-green-300" />
          Security Score
        </h3>

        <div className="h-48 w-48 mx-auto rounded-full border-[14px] border-cyan-400/40 flex items-center justify-center shadow-[0_0_60px_rgba(34,211,238,0.25)]">
          <div>
            <h2 className="text-5xl font-extrabold text-center">{score}%</h2>
            <p className="text-green-300 text-center">Protected</p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <p className="flex justify-between">
            <span>Verified</span>
            <span className="text-green-300">{verified}</span>
          </p>

          <p className="flex justify-between">
            <span>Pending</span>
            <span className="text-yellow-300">{pending}</span>
          </p>

          <p className="flex justify-between">
            <span>Tampered</span>
            <span className="text-red-300">{tampered}</span>
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
        <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">
          <Server className="text-cyan-300" />
          Infrastructure
        </h3>

        {[
          ["API Server", "Online", Server],
          ["MongoDB", "Connected", Database],
          ["JWT Security", "Active", Lock],
          ["Audit Engine", "Running", Activity]
        ].map(([name, status, Icon]) => (
          <div key={name} className="flex justify-between rounded-2xl bg-slate-950/70 p-4 mb-3">
            <div className="flex gap-3">
              <Icon className="text-cyan-300" />
              <span>{name}</span>
            </div>
            <span className="text-green-300">● {status}</span>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
        <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">
          <AlertTriangle className="text-yellow-300" />
          Threat Monitor
        </h3>

        <p className="text-green-300">● No critical threat detected</p>
        <p className="text-yellow-300 mt-3">● Pending verification: {pending}</p>
        <p className="text-red-300 mt-3">● Tampered evidence: {tampered}</p>
        <p className="text-cyan-300 mt-3">● Total activity logs: {logs.length}</p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
        <h3 className="text-2xl font-bold mb-5">Live User Activity</h3>

        <p>Total Users: {users.length}</p>
        <p className="text-purple-300 mt-2">
          Admins: {users.filter((u) => u.role === "admin").length}
        </p>
        <p className="text-cyan-300 mt-2">
          Verifiers: {users.filter((u) => u.role === "verifier").length}
        </p>
        <p className="text-green-300 mt-2">
          Users: {users.filter((u) => u.role === "user").length}
        </p>
      </div>
    </div>
  );
}

export default SecurityOperationsCenter;