import {
  FolderKanban,
  FileSearch,
  CheckCircle,
  AlertTriangle,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

function Card({ title, value, icon, subtitle, delay, trend = "+12%" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.04 }}
      className="group rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl hover:bg-white/15 transition"
    >
      <div className="flex justify-between items-start">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500/30 to-cyan-400/30 flex items-center justify-center text-cyan-300">
          {icon}
        </div>

        <span className="text-xs text-green-300 bg-green-500/10 px-2 py-1 rounded-full">
          {trend}
        </span>
      </div>

      <p className="text-slate-400 mt-5">{title}</p>

    <h3 className="text-5xl font-extrabold mt-2">
  {value}
</h3>

      <p className="text-xs text-slate-500 mt-2">{subtitle}</p>
    </motion.div>
  );
}

function DashboardCards({ cases = [], evidence = [], logs = [] }) {
  const verified = evidence.filter((e) => e.status === "verified").length;
  const tampered = evidence.filter((e) => e.status === "tampered").length;

  return (
    <div className="grid md:grid-cols-5 gap-5 mb-8">
      <Card delay={0.05} title="Cases" value={cases.length} icon={<FolderKanban />} subtitle="Total case records" />
      <Card delay={0.1} title="Evidence" value={evidence.length} icon={<FileSearch />} subtitle="Uploaded files" />
      <Card delay={0.15} title="Verified" value={verified} icon={<CheckCircle />} subtitle="Hash matched" trend="+Secure" />
      <Card delay={0.2} title="Tampered" value={tampered} icon={<AlertTriangle />} subtitle="Hash mismatch" trend="Alert" />
      <Card delay={0.25} title="Logs" value={logs.length} icon={<Activity />} subtitle="Audit activities" />
    </div>
  );
}

export default DashboardCards;