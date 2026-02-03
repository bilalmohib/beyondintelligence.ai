import LandingPageHeroSection from "@/components/page-components/Home/LandingPageHeroSection";
import LandingPageMeetSatoriSection from "@/components/page-components/Home/LandingPageMeetSatoriSection";
import AirCarriesHiddenRiskSection from "@/components/page-components/Home/LandingPageAirCarriesHiddenRiskSection";
import LandingPageAirChangesConstantlySection from "@/components/page-components/Home/LandingPageAirChangesConstantlySection";
import LandingPageChildsLifeBiggerTransitionScroll from "@/components/page-components/Home/LandingPageChildsLifeBiggerTransitionScroll";
import LandingPageSliderAsthmaFeelsUnpredictableSection from "@/components/page-components/Home/LandingPageSliderAsthmaFeelsUnpredictableSection";
import LandingPageProtectiveIntelligenceThatUnderstandsSection from "@/components/page-components/Home/LandingPageProtectiveIntelligenceThatUnderstandsSection";

function Home() {

  return (
    <div className="block">
      <LandingPageHeroSection />

      <LandingPageSliderAsthmaFeelsUnpredictableSection />

      <LandingPageChildsLifeBiggerTransitionScroll />

      <AirCarriesHiddenRiskSection />

      <LandingPageAirChangesConstantlySection />

      <LandingPageMeetSatoriSection />

      <LandingPageProtectiveIntelligenceThatUnderstandsSection />
    </div>
  );
}
export default Home;
