import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

function UserRoleChart({ users = [] }) {
  const data = [
    { name: "Admin", value: users.filter((u) => u.role === "admin").length },
    { name: "Verifier", value: users.filter((u) => u.role === "verifier").length },
    { name: "User", value: users.filter((u) => u.role === "user").length }
  ];

  const colors = ["#8b5cf6", "#06b6d4", "#22c55e"];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-6">
      <h3 className="text-2xl font-bold mb-5">User Role Distribution</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserRoleChart;