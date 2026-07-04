import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function ActivityTimelineChart({ logs = [] }) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const data = months.map((m, index) => ({
    month: m,
    activities: logs.filter((l) => new Date(l.createdAt).getMonth() === index).length
  }));

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
      <h3 className="text-2xl font-bold mb-5">Activity Timeline</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#cbd5e1" />
          <YAxis stroke="#cbd5e1" />
          <Tooltip />
          <Line type="monotone" dataKey="activities" stroke="#06b6d4" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ActivityTimelineChart;