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

function VerificationTrend({ evidence = [] }) {
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
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-4 md:p-6 shadow-xl">

      <h3 className="text-xl md:text-2xl font-bold mb-6">
        Verification Trend
      </h3>

      <div className="w-full h-[260px] md:h-[340px]">

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              type="number"
              stroke="#cbd5e1"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              type="category"
              dataKey="status"
              stroke="#cbd5e1"
              tick={{ fontSize: 12 }}
              width={80}
            />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
              }}
            />

            <Bar
              dataKey="value"
              radius={[0, 10, 10, 0]}
            >
              {data.map((item, index) => (
                <Cell
                  key={index}
                  fill={item.color}
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default VerificationTrend;