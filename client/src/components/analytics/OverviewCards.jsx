import {
  FolderKanban,
  FileSearch,
  CheckCircle,
  AlertTriangle,
  ShieldCheck
} from "lucide-react";

function Card({ title, value, color, icon }) {
  return (
    <div className="rounded-3xl bg-white/10 border border-white/10 backdrop-blur-xl p-6 shadow-xl hover:scale-[1.02] transition">
      <div className="flex justify-between items-center mb-5">
        <div className={`h-14 w-14 rounded-2xl ${color} flex items-center justify-center`}>
          {icon}
        </div>
      </div>

      <p className="text-slate-400">{title}</p>

      <h2 className="text-4xl font-extrabold mt-2">
        {value}
      </h2>
    </div>
  );
}

function OverviewCards({ cases, evidence }) {

  const verified = evidence.filter(e=>e.status==="verified").length;
  const pending = evidence.filter(e=>e.status==="pending").length;

  const score = evidence.length
    ? Math.round((verified/evidence.length)*100)
    : 100;

  return(

    <div className="grid md:grid-cols-5 gap-5 mb-8">

      <Card
      title="Cases"
      value={cases.length}
      color="bg-blue-500/20"
      icon={<FolderKanban className="text-blue-300"/>}
      />

      <Card
      title="Evidence"
      value={evidence.length}
      color="bg-purple-500/20"
      icon={<FileSearch className="text-purple-300"/>}
      />

      <Card
      title="Verified"
      value={verified}
      color="bg-green-500/20"
      icon={<CheckCircle className="text-green-300"/>}
      />

      <Card
      title="Pending"
      value={pending}
      color="bg-yellow-500/20"
      icon={<AlertTriangle className="text-yellow-300"/>}
      />

      <Card
      title="Integrity"
      value={`${score}%`}
      color="bg-cyan-500/20"
      icon={<ShieldCheck className="text-cyan-300"/>}
      />

    </div>

  );
}

export default OverviewCards;