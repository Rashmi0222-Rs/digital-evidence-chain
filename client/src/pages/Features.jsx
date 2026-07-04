import CyberBackground from "../components/CyberBackground";
import CyberEffects from "../components/CyberEffects";
import FeatureHero from "../components/features/FeatureHero";
import FeatureCards from "../components/features/FeatureCards";
import Workflow from "../components/features/Workflow";
import TechnologyStack from "../components/features/TechnologyStack";
import WhyChooseUs from "../components/features/WhyChooseUs";
import CallToAction from "../components/features/CallToAction";

function Features() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-white overflow-hidden">
      <CyberBackground />
      <CyberEffects />

      <FeatureHero />
      <FeatureCards />
      <Workflow />
      <TechnologyStack />
      <WhyChooseUs />
      <CallToAction />
    </div>
  );
}

export default Features;