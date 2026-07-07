import { useState } from "react";
import { Users, Trash2, ShieldCheck, BadgeCheck } from "lucide-react";
import API from "../services/api";
import Pagination from "./common/Pagination";
import EmptyState from "./common/EmptyState";
import toast from "react-hot-toast";

function UserManagement({ users = [], refresh }) {
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

  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  const updateUserRole = async (id, role) => {
    try {
      await API.put(`/users/${id}/role`, { role });
      toast.success("User role updated");
      refresh();
    } catch {
      toast.error("Unable to update role");
    }
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    try {
      await API.delete(`/users/${id}`);
      toast.success("User deleted");
      refresh();
    } catch {
      toast.error("Unable to delete user");
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-4 md:p-6 mb-8">
      <h3 className="text-xl md:text-2xl font-bold mb-5 flex items-center gap-2">
        <Users /> Admin User Management
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        <Mini title="Total Users" value={users.length} icon={<Users />} />
        <Mini
          title="Admins"
          value={users.filter((u) => u.role === "admin").length}
          icon={<ShieldCheck />}
        />
        <Mini
          title="Verifiers"
          value={users.filter((u) => u.role === "verifier").length}
          icon={<BadgeCheck />}
        />
        <Mini
          title="Users"
          value={users.filter((u) => u.role === "user").length}
          icon={<Users />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          value={userSearch}
          onChange={(e) => {
            setUserSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search users..."
          className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
        />

        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="w-full rounded-xl bg-slate-950 border border-white/10 px-4 py-3 outline-none"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="verifier">Verifier</option>
          <option value="user">Users</option>
        </select>
      </div>

      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left min-w-[900px]">
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
                  <RoleBadge role={u.role} />
                </td>
                <td className="text-slate-400">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td>
                  <RoleSelect user={u} updateUserRole={updateUserRole} />
                </td>
                <td>
                  <DeleteButton id={u._id} deleteUser={deleteUser} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-4">
        {paginatedUsers.map((u) => (
          <div
            key={u._id}
            className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
          >
            <div className="flex justify-between gap-3">
              <div className="min-w-0">
                <h4 className="font-bold truncate">{u.name}</h4>
                <p className="text-sm text-slate-400 break-all">{u.email}</p>
                <p className="text-xs text-slate-500 mt-1">
                  Joined: {new Date(u.createdAt).toLocaleDateString()}
                </p>
              </div>

              <RoleBadge role={u.role} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 mt-4">
              <RoleSelect user={u} updateUserRole={updateUserRole} />
              <DeleteButton id={u._id} deleteUser={deleteUser} />
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && <EmptyState message="No users found." />}

      <Pagination
        page={page}
        setPage={setPage}
        total={filteredUsers.length}
        limit={limit}
      />
    </div>
  );
}

function RoleBadge({ role }) {
  return (
    <span className="w-fit rounded-full bg-cyan-500/20 text-cyan-300 px-3 py-1 text-sm capitalize whitespace-nowrap">
      {role}
    </span>
  );
}

function RoleSelect({ user, updateUserRole }) {
  return (
    <select
      value={user.role}
      onChange={(e) => updateUserRole(user._id, e.target.value)}
      className="w-full rounded-lg bg-slate-950 border border-white/10 px-3 py-2 outline-none"
    >
      <option value="admin">Admin</option>
      <option value="verifier">Verifier</option>
      <option value="user">User</option>
    </select>
  );
}

function DeleteButton({ id, deleteUser }) {
  return (
    <button
      onClick={() => deleteUser(id)}
      className="w-full sm:w-auto rounded-lg bg-red-500/20 text-red-300 px-4 py-2 hover:bg-red-500/30 flex justify-center"
    >
      <Trash2 size={16} />
    </button>
  );
}

function Mini({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
      <div className="text-cyan-300 mb-2">{icon}</div>
      <p className="text-slate-400 text-sm">{title}</p>
      <h4 className="text-2xl md:text-3xl font-bold">{value}</h4>
    </div>
  );
}

export default UserManagement;