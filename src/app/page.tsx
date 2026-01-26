import LandingPageHeroSection from "@/components/page-components/Home/LandingPageHeroSection";
import AirCarriesHiddenRiskSection from "@/components/page-components/Home/AirCarriesHiddenRiskSection";
import LandingPageChildsLifeBiggerTransitionScroll from "@/components/page-components/Home/LandingPageChildsLifeBiggerTransitionScroll";
import LandingPageSliderAsthmaFeelsUnpredictableSection from "@/components/page-components/Home/LandingPageSliderAsthmaFeelsUnpredictableSection";

function Home() {

  return (
    <div className="block">
      <LandingPageHeroSection />

      <LandingPageSliderAsthmaFeelsUnpredictableSection />

      <LandingPageChildsLifeBiggerTransitionScroll />

      <AirCarriesHiddenRiskSection />
    </div>
  );
}
export default Home;
