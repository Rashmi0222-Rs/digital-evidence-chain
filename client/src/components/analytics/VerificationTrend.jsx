import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

function VerificationTrend({ evidence }) {
  const verified = evidence.filter(
    (e) => e.status === "verified"
  ).length;

  const pending = evidence.filter(
    (e) => e.status === "pending"
  ).length;

  const tampered = evidence.filter(
    (e) => e.status === "tampered"
  ).length;

  const data = [
    {
      status: "Verified",
      value: verified,
      color: "#22c55e",
    },
    {
      status: "Pending",
      value: pending,
      color: "#facc15",
    },
    {
      status: "Tampered",
      value: tampered,
      color: "#ef4444",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-xl">

      <h3 className="text-2xl font-bold mb-6">
        Verification Trend
      </h3>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          layout="vertical"
          data={data}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            type="number"
            stroke="#cbd5e1"
          />

          <YAxis
            dataKey="status"
            type="category"
            stroke="#cbd5e1"
          />

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "15px",
            }}
          />

          <Bar
            dataKey="value"
            radius={[0, 10, 10, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={entry.color}
              />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default VerificationTrend;