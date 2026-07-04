import { useState } from "react";
import { Users, Trash2, ShieldCheck, BadgeCheck } from "lucide-react";
import API from "../services/api";
import Pagination from "./common/Pagination";
import EmptyState from "./common/EmptyState";

function UserManagement({ users, refresh }) {
  const [userSearch, setUserSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 5;

  const filteredUsers = users.filter((u) => {
    const searchMatch =
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase());

    const roleMatch = roleFilter === "all" || u.role === roleFilter;

    return searchMatch && roleMatch;
  });

  const updateUserRole = async (id, role) => {
    await API.put(`/users/${id}/role`, { role });
    alert("User role updated");
    refresh();
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    await API.delete(`/users/${id}`);
    alert("User deleted");
    refresh();
  };

  const paginatedUsers = filteredUsers.slice(
  (page - 1) * limit,
  page * limit
);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 mb-8">
      <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">
        <Users /> Admin User Management
      </h3>

      <div className="grid md:grid-cols-4 gap-5 mb-6">
        <Mini title="Total Users" value={users.length} icon={<Users />} />
        <Mini title="Admins" value={users.filter(u => u.role === "admin").length} icon={<ShieldCheck />} />
        <Mini title="Verifiers" value={users.filter(u => u.role === "verifier").length} icon={<BadgeCheck />} />
        <Mini title="Users" value={users.filter(u => u.role === "user").length} icon={<Users />} />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          placeholder="Search users..."
          className="rounded-xl bg-slate-950 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-xl bg-slate-950 border border-white/10 px-4 py-3"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="verifier">Verifier</option>
          <option value="all">Users</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 border-b border-white/10">
              <th className="py-3">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Change Role</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((u) => (
              <tr key={u._id} className="border-b border-white/10">
                <td className="py-4 font-semibold">{u.name}</td>
                <td className="text-slate-300">{u.email}</td>
                <td>
                  <span className="rounded-full bg-cyan-500/20 text-cyan-300 px-3 py-1 text-sm">
                    {u.role}
                  </span>
                </td>
                <td className="text-slate-400">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <select
                    value={u.role}
                    onChange={(e) => updateUserRole(u._id, e.target.value)}
                    className="rounded-lg bg-slate-950 border border-white/10 px-3 py-2"
                  >
                    <option value="admin">Admin</option>
                    <option value="verifier">Verifier</option>
                    <option value="user">User</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => deleteUser(u._id)}
                    className="rounded-lg bg-red-500/20 text-red-300 px-3 py-2 hover:bg-red-500/30"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <p className="text-center text-slate-400 py-8">No users found.</p>
        )}
      </div>
      <Pagination
  page={page}
  setPage={setPage}
  total={filteredUsers.length}
  limit={limit}
/>
    </div>
  );
}

function Mini({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
      <div className="text-cyan-300 mb-2">{icon}</div>
      <p className="text-slate-400 text-sm">{title}</p>
      <h4 className="text-3xl font-bold">{value}</h4>
    </div>
  );
}

export default UserManagement;
