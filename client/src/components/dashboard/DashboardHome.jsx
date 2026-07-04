import DashboardCards from "../DashboardCards";
import WelcomeBanner from "./WelcomeBanner";
import QuickActions from "./QuickActions";
import SystemHealth from "./SystemHealth";
import RecentEvidence from "./RecentEvidence";
import RecentActivity from "./RecentActivity";
import SecurityScore from "./SecurityScore";
import SkeletonCard from "../common/SkeletonCard";


function DashboardHome({ user, cases = [], evidence = [], logs = [] }) {
  const loading =
    cases.length === 0 &&
    evidence.length === 0 &&
    logs.length === 0;

  if (loading) {
    return (
      <div className="grid md:grid-cols-4 gap-5">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

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