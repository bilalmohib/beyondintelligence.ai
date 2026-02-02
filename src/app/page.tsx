import LandingPageHeroSection from "@/components/page-components/Home/LandingPageHeroSection";
import AirCarriesHiddenRiskSection from "@/components/page-components/Home/LandingPageAirCarriesHiddenRiskSection";
import LandingPageAirChangesConstantlySection from "@/components/page-components/Home/LandingPageAirChangesConstantlySection";
import LandingPageChildsLifeBiggerTransitionScroll from "@/components/page-components/Home/LandingPageChildsLifeBiggerTransitionScroll";
import LandingPageSliderAsthmaFeelsUnpredictableSection from "@/components/page-components/Home/LandingPageSliderAsthmaFeelsUnpredictableSection";

function Home() {

  return (
    <div className="block">
      <LandingPageHeroSection />

      <LandingPageSliderAsthmaFeelsUnpredictableSection />

      <LandingPageChildsLifeBiggerTransitionScroll />

      <AirCarriesHiddenRiskSection />

      <LandingPageAirChangesConstantlySection />
    </div>
  );
}
export default Home;
