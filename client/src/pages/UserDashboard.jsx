import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../components/dashboard/DashboardHome";
import CreateCase from "../components/CreateCase";
import UploadEvidence from "../components/UploadEvidence";
import EvidenceTable from "../components/EvidenceTable";
import ActivityLogs from "../components/ActivityLogs";
import Timeline from "../components/Timeline";
import Reports from "../components/Reports";
import Profile from "../components/Profile";
import RoleBanner from "../components/RoleBanner";
import NotificationCenter from "../components/NotificationCenter";

import API from "../services/api";
import useAutoRefresh from "../hooks/useAutoRefresh";
import DashboardSkeleton from "../components/common/DashboardSkeleton";

function UserDashboard({ view = "dashboard" }) {
  const [cases, setCases] = useState([]);
  const [evidence, setEvidence] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const loadData = async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);

      const [caseRes, evidenceRes, logsRes] = await Promise.allSettled([
        API.get("/cases/my-cases"),
        API.get("/evidence"),
        API.get("/activity")
      ]);

      setCases(caseRes.status === "fulfilled" ? caseRes.value.data : []);
      setEvidence(evidenceRes.status === "fulfilled" ? evidenceRes.value.data : []);
      setLogs(logsRes.status === "fulfilled" ? logsRes.value.data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(true);
  }, []);

  useAutoRefresh(() => loadData(false), 30000);

  return (
    <DashboardLayout
      user={user}
      refresh={() => loadData(false)}
      logout={logout}
    >
      {loading && <DashboardSkeleton />}

      {!loading && view === "dashboard" && (
        <DashboardHome user={user} cases={cases} evidence={evidence} logs={logs} />
      )}

      {!loading && view === "evidence" && (
        <>
          <RoleBanner
            badge="USER WORKSPACE"
            title="My Evidence Portal"
            subtitle="Create cases, upload evidence, and track verification status."
          />

          <CreateCase refresh={() => loadData(false)} />

          <UploadEvidence cases={cases} refresh={() => loadData(false)} />

          <EvidenceTable
            evidence={evidence}
            refresh={() => loadData(false)}
            canVerify={false}
          />
        </>
      )}

      {!loading && view === "reports" && (
        <Reports cases={cases} evidence={evidence} logs={logs} />
      )}

      {!loading && view === "activity" && (
        <div className="grid lg:grid-cols-2 gap-8">
          <ActivityLogs logs={logs} />
          <Timeline logs={logs} />
        </div>
      )}

      {!loading && view === "notifications" && <NotificationCenter />}

      {!loading && view === "profile" && (
        <Profile user={user} logout={logout} />
      )}
    </DashboardLayout>
  );
}

export default UserDashboard;