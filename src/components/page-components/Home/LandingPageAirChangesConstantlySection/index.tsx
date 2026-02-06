import Container from "@/components/common/Container";
import { Heading2 } from "@/components/common/Typography";
import SwiperSlider from "@/components/common/SwiperSlider";
import { landingPageAirChangesConstantlySectionData } from "@/components/page-components/Home/LandingPageAirChangesConstantlySection/data";

const LandingPageAirChangesConstantlySection = () => {
  return (
    <div className="pt-12 sm:pt-20 md:pt-24 lg:pt-30 flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-13.5 bg-background">
      <Container className="w-full">
        <Heading2 className="text-white leading-[120%]! tracking-[-2%]!">
          The air changes constantly and that’s{" "}
          <br className="hidden sm:block" />
          why asthma feels unpredictable. <br className="hidden sm:block" />
        </Heading2>
      </Container>
      <SwiperSlider
        slides={landingPageAirChangesConstantlySectionData}
        fullWidth
        imageHeight="80vh"
      />
    </div>
  );
};
export default LandingPageAirChangesConstantlySection;
