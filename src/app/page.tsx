import { faqsListSatoriLandingPage } from "@/components/page-components/Home/data";

import FAQs from "@/components/common/FAQs";
import LandingPageHeroSection from "@/components/page-components/Home/LandingPageHeroSection";
import LandingPageWhatYouReceive from "@/components/page-components/Home/LandingPageWhatYouReceive";
import LandingPageHowItWorksSection from "@/components/page-components/Home/LandingPageHowItWorksSection";
import LandingPageMeetSatoriSection from "@/components/page-components/Home/LandingPageMeetSatoriSection";
import LandingPageHowSatoriCompares from "@/components/page-components/Home/LandingPageHowSatoriCompares";
import LandingPageSatoriBlogsSection from "@/components/page-components/Home/LandingPageSatoriBlogsSection";
import LandingPageCallToActionSection from "@/components/page-components/Home/LandingPageCallToActionSection";
import AirCarriesHiddenRiskSection from "@/components/page-components/Home/LandingPageAirCarriesHiddenRiskSection";
import LandingPageAirChangesConstantlySection from "@/components/page-components/Home/LandingPageAirChangesConstantlySection";
import LandingPageScientificallyGroundedSection from "@/components/page-components/Home/LandingPageScientificallyGroundedSection";
import LandingPageChildsLifeBiggerTransitionScroll from "@/components/page-components/Home/LandingPageChildsLifeBiggerTransitionScroll";
import LandingPageInspiredByTheVoicesOfParentsSection from "@/components/page-components/Home/LandingPageInspiredByTheVoicesOfParentsSection";
import LandingPageSliderAsthmaFeelsUnpredictableSection from "@/components/page-components/Home/LandingPageSliderAsthmaFeelsUnpredictableSection";
import LandingPageProtectiveIntelligenceThatUnderstandsSection from "@/components/page-components/Home/LandingPageProtectiveIntelligenceThatUnderstandsSection";

function Home() {
  return (
    <div className="block">
      <LandingPageHeroSection />

      <LandingPageSliderAsthmaFeelsUnpredictableSection />

      <LandingPageChildsLifeBiggerTransitionScroll />

      <AirCarriesHiddenRiskSection />

      {/* <LandingPageAirChangesConstantlySection /> */}

      {/* <LandingPageMeetSatoriSection />

      <LandingPageProtectiveIntelligenceThatUnderstandsSection />

      <LandingPageHowItWorksSection />

      <LandingPageWhatYouReceive />

      <LandingPageSatoriBlogsSection />

      <LandingPageScientificallyGroundedSection />

      <LandingPageInspiredByTheVoicesOfParentsSection />

      <LandingPageHowSatoriCompares />

      <FAQs faqsList={faqsListSatoriLandingPage} />

      <LandingPageCallToActionSection /> */}
    </div>
  );
}
export default Home;
