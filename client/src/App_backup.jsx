import { useEffect, useState } from "react";
import axios from "axios";
import {
  ShieldCheck,
  LockKeyhole,
  FileSearch,
  BadgeCheck,
  FolderKanban,
  LogOut,
  Upload,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
  Search,
  Filter,
  Users,
  Trash2,
  RefreshCw
} from "lucide-react";

const API = "http://localhost:5000";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [email, setEmail] = useState("sanjay@gmail.com");
  const [password, setPassword] = useState("123456");
  const [role, setRole] = useState("admin");
  const [message, setMessage] = useState("");

  const [cases, setCases] = useState([]);
  const [evidence, setEvidence] = useState([]);
  const [logs, setLogs] = useState([]);

  const [caseId, setCaseId] = useState("");
  const [file, setFile] = useState(null);
  const [verifyFile, setVerifyFile] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [caseTitle, setCaseTitle] = useState("");
  const [caseDescription, setCaseDescription] = useState("");
  const [caseCategory, setCaseCategory] = useState("insurance");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const filteredEvidence = evidence.filter((ev) => {
    const fileMatch = ev.originalName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const caseMatch = ev.caseId?.caseTitle
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const statusMatch =
      statusFilter === "all" || ev.status === statusFilter;

    return (fileMatch || caseMatch) && statusMatch;
  });

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password
      });

      if (res.data.user.role !== role) {
        setMessage(`This account is not registered as ${role}`);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setLoggedIn(true);
    } catch {
      setMessage("Login failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  const loadData = async () => {
    try {
      const caseRes = await axios.get(`${API}/api/cases`, authHeader);
      const evidenceRes = await axios.get(`${API}/api/evidence`, authHeader);
      const logsRes = await axios.get(`${API}/api/activity`, authHeader);

      setCases(caseRes.data);
      setEvidence(evidenceRes.data);
      setLogs(logsRes.data);

      if (caseRes.data.length > 0) {
        setCaseId(caseRes.data[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createCase = async (e) => {
  e.preventDefault();

  if (!caseTitle || !caseDescription) {
    alert("Enter case title and description");
    return;
  }

  await axios.post(
    `${API}/api/cases`,
    {
      caseTitle,
      description: caseDescription,
      category: caseCategory
    },
    authHeader
  );

  alert("Case created successfully");

  setCaseTitle("");
  setCaseDescription("");
  setCaseCategory("insurance");

  loadData();
};

  useEffect(() => {
    if (loggedIn) loadData();
  }, [loggedIn]);

  const uploadEvidence = async (e) => {
    e.preventDefault();

    if (!caseId || !file) {
      alert("Select case and file");
      return;
    }

    const formData = new FormData();
    formData.append("caseId", caseId);
    formData.append("file", file);

    await axios.post(`${API}/api/evidence/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });

    alert("Evidence uploaded successfully");
    setFile(null);
    loadData();
  };

  const verifyEvidence = async (id) => {
    if (!verifyFile) {
      alert("Select file to verify");
      return;
    }

    const formData = new FormData();
    formData.append("file", verifyFile);

    const res = await axios.post(`${API}/api/evidence/verify/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });

    alert(res.data.message);
    setVerifyFile(null);
    loadData();
  };
  if (user.role === "admin") {
  const usersRes = await axios.get(`${API}/api/users`, authHeader);
  setUsers(usersRes.data);
}
const updateUserRole = async (id, newRole) => {
  await axios.put(
    `${API}/api/users/${id}/role`,
    { role: newRole },
    authHeader
  );

  alert("User role updated successfully");
  loadData();
};

const deleteUser = async (id) => {
  if (!confirm("Are you sure you want to delete this user?")) return;

  await axios.delete(`${API}/api/users/${id}`, authHeader);

  alert("User deleted successfully");
  loadData();
};

const filteredUsers = users.filter((u) => {
  const searchMatch =
    u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email?.toLowerCase().includes(userSearch.toLowerCase());

  const roleMatch = roleFilter === "all" || u.role === roleFilter;

  return searchMatch && roleMatch;
});

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-[#020617] text-white grid lg:grid-cols-2 overflow-hidden">
        <div className="hidden lg:flex flex-col justify-center p-16 bg-[radial-gradient(circle_at_center,#7c3aed55,transparent_40%)]">
          <ShieldCheck size={70} className="text-purple-300 mb-8" />

          <h1 className="text-6xl font-extrabold leading-tight">
            DIGITAL EVIDENCE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300">
              CHAIN SYSTEM
            </span>
          </h1>

          <p className="text-slate-300 mt-6 text-lg max-w-xl">
            Securely upload, verify and track digital evidence using SHA-256
            hashing, tamper detection and chain of custody.
          </p>
          

          <div className="grid grid-cols-2 gap-4 mt-10 max-w-xl">
            {["SHA-256 Hashing", "Tamper Detection", "Role Security", "Activity Logs"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-5"
                >
                  <p className="font-semibold text-cyan-300">{item}</p>
                </div>
              )
            )}
          </div>
        </div>

        <div className="flex items-center justify-center p-6 bg-[radial-gradient(circle_at_bottom_right,#06b6d433,transparent_35%)]">
          <form
            onSubmit={loginHandler}
            className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/10 backdrop-blur-xl p-8 shadow-2xl"
          >
            <div className="text-center mb-8">
              <div className="mx-auto h-16 w-16 rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                <LockKeyhole size={32} />
              </div>
              <h2 className="text-3xl font-bold mt-4">Welcome Back</h2>
              <p className="text-slate-400 mt-2">Secure workspace login</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              {["admin", "verifier", "user"].map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`rounded-xl p-3 border capitalize ${
                    role === r
                      ? "bg-purple-500/30 border-cyan-300 text-cyan-300"
                      : "border-white/10 text-slate-300"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <input
              className="w-full mb-4 rounded-xl bg-slate-950 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <input
              className="w-full mb-4 rounded-xl bg-slate-950 border border-white/10 px-4 py-3 outline-none focus:border-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />

            {message && <p className="text-red-300 mb-3">{message}</p>}

            <button className="w-full rounded-xl py-3 bg-gradient-to-r from-purple-500 to-cyan-400 font-bold">
              Sign In Securely
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex">
      <aside className="w-72 hidden md:flex flex-col bg-white/5 border-r border-white/10 p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
            <ShieldCheck />
          </div>
          <div>
            <h1 className="text-xl font-bold">EvidenceChain</h1>
            <p className="text-xs text-slate-400">Cyber Evidence Platform</p>
          </div>
        </div>

        {[
          ["Dashboard", FolderKanban],
          ["Evidence", FileSearch],
          ["Verification", BadgeCheck],
          ["Activity Logs", Activity]
        ].map(([name, Icon]) => (
          <button
            key={name}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-500/20 text-slate-300 hover:text-white transition"
          >
            <Icon size={20} /> {name}
          </button>
        ))}

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-3 text-red-300 p-3 hover:bg-red-500/10 rounded-xl"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      <main className="flex-1 p-8 bg-[radial-gradient(circle_at_top_right,#7c3aed33,transparent_35%),radial-gradient(circle_at_bottom_left,#06b6d433,transparent_35%)] overflow-y-auto">
        <div className="mb-8 flex justify-between items-start gap-4">
          <div>
            <h2 className="text-4xl font-extrabold">Evidence Dashboard</h2>
            <p className="text-slate-400 mt-2">
              Welcome {user.name} • Role:{" "}
              <span className="text-cyan-300">{user.role}</span>
            </p>
          </div>

          <button
            onClick={loadData}
            className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-cyan-300"
          >
            Refresh
          </button>
        </div>

        <div className="grid md:grid-cols-5 gap-5 mb-8">
          <Card title="Cases" value={cases.length} icon={<FolderKanban />} />
          <Card title="Evidence" value={evidence.length} icon={<FileSearch />} />
          <Card
            title="Verified"
            value={evidence.filter((e) => e.status === "verified").length}
            icon={<CheckCircle />}
          />
          <Card
            title="Tampered"
            value={evidence.filter((e) => e.status === "tampered").length}
            icon={<AlertTriangle />}
          />
          <Card title="Logs" value={logs.length} icon={<Activity />} />
        </div>

        <form
  onSubmit={createCase}
  className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 mb-8 shadow-2xl"
>
  <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">
    <FolderKanban /> Create New Case
  </h3>

  <div className="grid md:grid-cols-4 gap-4">
    <input
      type="text"
      placeholder="Case title"
      value={caseTitle}
      onChange={(e) => setCaseTitle(e.target.value)}
      className="rounded-xl bg-slate-950 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
    />

    <input
      type="text"
      placeholder="Case description"
      value={caseDescription}
      onChange={(e) => setCaseDescription(e.target.value)}
      className="rounded-xl bg-slate-950 border border-white/10 px-4 py-3 outline-none focus:border-purple-400"
    />

    <select
      value={caseCategory}
      onChange={(e) => setCaseCategory(e.target.value)}
      className="rounded-xl bg-slate-950 border border-white/10 px-4 py-3"
    >
      <option value="legal">Legal</option>
      <option value="insurance">Insurance</option>
      <option value="cybercrime">Cybercrime</option>
      <option value="academic">Academic</option>
      <option value="complaint">Complaint</option>
      <option value="other">Other</option>
    </select>

    <button className="rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 font-bold">
      Create Case
    </button>
  </div>
</form>

        <form
          onSubmit={uploadEvidence}
          className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 mb-8 shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <Upload /> Upload Evidence
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              className="rounded-xl bg-slate-950 border border-white/10 px-4 py-3"
            >
              {cases.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.caseTitle}
                </option>
              ))}
            </select>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="rounded-xl bg-slate-950 border border-white/10 px-4 py-3"
            />

            <button className="rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 font-bold">
              Upload Evidence
            </button>
          </div>
        </form>

        <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 mb-8">
          <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <Search /> Search & Filter Evidence
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search by file name or case title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-xl bg-slate-950 border border-white/10 px-4 py-3 outline-none focus:border-cyan-400"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl bg-slate-950 border border-white/10 px-4 py-3 outline-none focus:border-purple-400"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="tampered">Tampered</option>
            </select>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 mb-8">
          <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <Filter /> Evidence List
          </h3>

          <div className="space-y-4">
            {filteredEvidence.map((ev) => (
              <div
                key={ev._id}
                className="rounded-2xl bg-slate-950/70 border border-white/10 p-5 grid lg:grid-cols-5 gap-4 items-center"
              >
                <div>
                  <p className="font-bold">{ev.originalName}</p>
                  <p className="text-sm text-slate-400">{ev.fileType}</p>
                </div>

                <div className="text-sm text-slate-300">
                  Case: {ev.caseId?.caseTitle}
                </div>

                <div className="text-xs break-all text-slate-400">
                  Hash: {ev.hash?.slice(0, 28)}...
                </div>

                <span
                  className={`text-center rounded-full px-3 py-2 text-sm font-bold ${
                    ev.status === "verified"
                      ? "bg-green-500/20 text-green-300"
                      : ev.status === "tampered"
                      ? "bg-red-500/20 text-red-300"
                      : "bg-yellow-500/20 text-yellow-300"
                  }`}
                >
                  {ev.status}
                </span>

                <div className="space-y-2">
                  <input
                    type="file"
                    onChange={(e) => setVerifyFile(e.target.files[0])}
                    className="text-sm w-full"
                  />

                  <button
                    onClick={() => verifyEvidence(ev._id)}
                    className="w-full rounded-xl py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/30"
                  >
                    Verify
                  </button>
                </div>
              </div>
            ))}

            {filteredEvidence.length === 0 && (
              <p className="text-slate-400 text-center py-8">
                No evidence found.
              </p>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Activity /> Recent Activity Logs
            </h3>

            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
              {logs.map((log) => (
                <div
                  key={log._id}
                  className="rounded-2xl bg-slate-950/70 border border-white/10 p-4"
                >
                  <div className="flex justify-between gap-3">
                    <h4 className="font-bold text-cyan-300">{log.action}</h4>
                    <span className="text-xs text-slate-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 mt-2">{log.remarks}</p>

                  <div className="text-xs text-slate-500 mt-3">
                    User: {log.userId?.name} • Case:{" "}
                    {log.caseId?.caseTitle || "N/A"} • Evidence:{" "}
                    {log.evidenceId?.originalName || "N/A"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Clock /> Chain of Custody Timeline
            </h3>

            <div className="relative border-l border-cyan-400/40 ml-4 space-y-7">
              {logs.slice(0, 8).map((log) => (
                <div key={log._id} className="relative pl-8">
                  <div className="absolute -left-[10px] top-1 h-5 w-5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 shadow-lg shadow-cyan-500/40"></div>

                  <h4 className="font-bold">{log.action}</h4>
                  <p className="text-sm text-slate-400 mt-1">{log.remarks}</p>
                  <p className="text-xs text-cyan-300 mt-2">
                    {new Date(log.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl">
      <div className="text-cyan-300 mb-3">{icon}</div>
      <p className="text-slate-400">{title}</p>
      <h3 className="text-4xl font-bold">{value}</h3>
    </div>
  );
}

export default App;