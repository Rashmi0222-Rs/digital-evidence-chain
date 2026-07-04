import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import CreateCase from "../components/CreateCase";
import UploadEvidence from "../components/UploadEvidence";
import EvidenceTable from "../components/EvidenceTable";
import ActivityLogs from "../components/ActivityLogs";
import Timeline from "../components/Timeline";
import UserManagement from "../components/UserManagement";
import Analytics from "../components/Analytics";
import Reports from "../components/Reports";
import Profile from "../components/Profile";
import API from "../services/api";
import AdminCommandCenter from "../components/dashboard/AdminCommandCenter";
import NotificationCenter from "../components/NotificationCenter";
import useAutoRefresh from "../hooks/useAutoRefresh";
import DashboardSkeleton from "../components/common/DashboardSkeleton";

function AdminDashboard({ view = "dashboard" }) {
  const [cases, setCases] = useState([]);
  const [evidence, setEvidence] = useState([]);
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

 const loadData = async (showLoader = false) => {
  try {
    if (showLoader) {
      setLoading(true);
    }

    const [caseRes, evidenceRes, logsRes, usersRes] = await Promise.all([
      API.get("/cases"),
      API.get("/evidence"),
      API.get("/activity"),
      API.get("/users")
    ]);

    setCases(caseRes.data);
    setEvidence(evidenceRes.data);
    setLogs(logsRes.data);
    setUsers(usersRes.data);

  } catch (err) {
    console.error(err);
  } finally {
    if (showLoader) {
      setLoading(false);
    }
  }
};
  useEffect(() => {
  loadData(true);
}, []);

  useAutoRefresh(() => loadData(false), 30000);

  return (
    <DashboardLayout user={user} refresh={loadData} logout={logout}>
      {loading && <DashboardSkeleton />}

      {!loading && view === "dashboard" && (
        <AdminCommandCenter
          user={user}
          cases={cases}
          evidence={evidence}
          logs={logs}
          users={users}
        />
      )}

      {!loading && view === "users" && (
        <UserManagement users={users} refresh={loadData} />
      )}

      {!loading && view === "evidence" && (
        <>
          <CreateCase refresh={loadData} />
          <UploadEvidence cases={cases} refresh={loadData} />
          <EvidenceTable evidence={evidence} refresh={loadData} canVerify={true} />
        </>
      )}

      {!loading && view === "verification" && (
        <EvidenceTable evidence={evidence} refresh={loadData} canVerify={true} />
      )}

      {!loading && view === "analytics" && (
        <Analytics cases={cases} evidence={evidence} users={users} logs={logs} />
      )}

      {!loading && view === "reports" && (
        <Reports cases={cases} evidence={evidence} logs={logs} />
      )}

      {!loading && view === "notifications" && <NotificationCenter />}

      {!loading && view === "profile" && (
        <Profile user={user} logout={logout} />
      )}

      {!loading && view === "activity" && (
        <div className="grid lg:grid-cols-2 gap-8">
          <ActivityLogs logs={logs} />
          <Timeline logs={logs} />
        </div>
      )}
    </DashboardLayout>
  );
}

export default AdminDashboard;