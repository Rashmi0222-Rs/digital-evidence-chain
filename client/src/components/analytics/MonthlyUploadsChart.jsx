import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MonthlyUploadsChart({ evidence }) {
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const data = months.map((month, index) => ({
    month,
    uploads: evidence.filter((e) => {
      if (!e.createdAt) return false;
      return new Date(e.createdAt).getMonth() === index;
    }).length,
  }));

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6">
        Monthly Evidence Uploads
      </h3>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

          <XAxis
            dataKey="month"
            stroke="#cbd5e1"
          />

          <YAxis
            stroke="#cbd5e1"
          />

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              borderRadius: "15px",
              border: "1px solid #334155",
            }}
          />

          <Line
            type="monotone"
            dataKey="uploads"
            stroke="#22d3ee"
            strokeWidth={4}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyUploadsChart;