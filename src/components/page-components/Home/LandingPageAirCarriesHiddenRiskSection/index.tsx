import Container from "@/components/common/Container";
import { Heading2 } from "@/components/common/Typography";
import TheFiveEnvironmentalForcesSliderSection from "@/components/page-components/Home/LandingPageAirCarriesHiddenRiskSection/TheFiveEnvironmentalForcesSliderSection";

const LandingPageAirCarriesHiddenRiskSection = () => {
  return (
    <section className="w-full">
      <div className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[80vh] lg:min-h-screen w-full bg-image-air-carries-hidden-risk-section bg-cover bg-no-repeat bg-position-[0%_0%] sm:bg-position-[15%_0%] md:bg-position-[25%_5%] lg:bg-position-[30%_21%]">
        <div className="absolute inset-0 bg-black/5" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, transparent 86%, rgba(26,28,78,0.2) 90%, rgba(26,28,78,0.75) 95%, #1A1C4E 99.5%)",
          }}
        />

        <Container className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[80vh] lg:min-h-screen py-8 sm:py-12 md:py-20 lg:py-30">
          <div className="flex min-h-[50vh] sm:min-h-[60vh] md:min-h-[80vh] pt-4 sm:pt-6 md:pt-0 lg:min-h-screen w-full items-start justify-center sm:justify-end">
            <Heading2 className="text-white leading-[120%]! text-center sm:text-right max-w-full sm:max-w-[85%] md:max-w-[75%] lg:max-w-none px-4 sm:px-0">
              The Air Carries Hidden <br className="hidden md:block" /> Risks —
              And They Shape Your <br className="hidden md:block" /> Child’s
              Asthma.
            </Heading2>
          </div>
        </Container>
      </div>

      <TheFiveEnvironmentalForcesSliderSection />
    </section>
  );
};
export default LandingPageAirCarriesHiddenRiskSection;
