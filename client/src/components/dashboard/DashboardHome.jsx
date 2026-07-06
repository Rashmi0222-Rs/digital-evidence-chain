import DashboardCards from "../DashboardCards";
import WelcomeBanner from "./WelcomeBanner";
import QuickActions from "./QuickActions";
import SystemHealth from "./SystemHealth";
import RecentEvidence from "./RecentEvidence";
import RecentActivity from "./RecentActivity";
import SecurityScore from "./SecurityScore";

function DashboardHome({ user, cases = [], evidence = [], logs = [] }) {
  return (
    <>
      <WelcomeBanner user={user} />

      <DashboardCards cases={cases} evidence={evidence} logs={logs} />

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <QuickActions role={user?.role} />
        <SystemHealth />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <RecentEvidence evidence={evidence} />
        <RecentActivity logs={logs} />
        <SecurityScore evidence={evidence} />
      </div>
    </>
  );
}

export default DashboardHome;