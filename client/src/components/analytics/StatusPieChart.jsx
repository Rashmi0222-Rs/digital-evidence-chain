import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

function StatusPieChart({ evidence }) {
  const data = [
    {
      name: "Verified",
      value: evidence.filter((e) => e.status === "verified").length,
    },
    {
      name: "Pending",
      value: evidence.filter((e) => e.status === "pending").length,
    },
    {
      name: "Tampered",
      value: evidence.filter((e) => e.status === "tampered").length,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#facc15",
    "#ef4444",
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-xl">
      <h3 className="text-2xl font-bold mb-6">
        Evidence Status Distribution
      </h3>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            innerRadius={55}
            paddingAngle={3}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              borderRadius: "15px",
              border: "1px solid #334155",
            }}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatusPieChart;