import AnalyticsDashboard from "./analytics/AnalyticsDashboard";

function Analytics({
  cases = [],
  evidence = [],
  users = [],
  logs = []
}) {
  return (
    <AnalyticsDashboard
      cases={cases}
      evidence={evidence}
      users={users}
      logs={logs}
    />
  );
}

export default Analytics;