import OverviewCards from "./OverviewCards";
import MonthlyUploadsChart from "./MonthlyUploadsChart";
import StatusPieChart from "./StatusPieChart";
import CategoryBarChart from "./CategoryBarChart";
import VerificationTrend from "./VerificationTrend";

import UserRoleChart from "./UserRoleChart";
import ActivityTimelineChart from "./ActivityTimelineChart";

function AnalyticsDashboard({
  cases = [],
  evidence = [],
  users = [],
  logs = []
}) {
  return (
    <div className="space-y-8">

      {/* Overview */}
      <OverviewCards
        cases={cases}
        evidence={evidence}
      />

      {/* First Row */}
      <div className="grid xl:grid-cols-2 gap-8">
        <MonthlyUploadsChart evidence={evidence} />
        <StatusPieChart evidence={evidence} />
      </div>

      {/* Second Row */}
      <div className="grid xl:grid-cols-2 gap-8">
        <CategoryBarChart cases={cases} />
        <VerificationTrend evidence={evidence} />
      </div>

      {/* Third Row */}
      <div className="grid xl:grid-cols-2 gap-8">
        <UserRoleChart users={users} />
        <ActivityTimelineChart logs={logs} />
      </div>

    </div>
  );
}

export default AnalyticsDashboard;