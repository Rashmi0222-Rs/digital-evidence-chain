import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Cell
} from "recharts";

function CategoryBarChart({ cases }) {

  const categories = [
    "legal",
    "insurance",
    "cybercrime",
    "academic",
    "complaint",
    "other"
  ];

  const data = categories.map((cat) => ({
    category: cat.charAt(0).toUpperCase() + cat.slice(1),
    count: cases.filter((c) => c.category === cat).length
  }));

  const colors = [
    "#3b82f6",
    "#8b5cf6",
    "#06b6d4",
    "#22c55e",
    "#f59e0b",
    "#ef4444"
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-xl">

      <h3 className="text-2xl font-bold mb-6">
        Cases by Category
      </h3>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            dataKey="category"
            stroke="#cbd5e1"
          />

          <YAxis stroke="#cbd5e1" />

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "15px"
            }}
          />

          <Bar
            dataKey="count"
            radius={[8,8,0,0]}
          >
            {data.map((entry,index)=>(
              <Cell
                key={index}
                fill={colors[index]}
              />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default CategoryBarChart;