import Container from "@/components/common/Container";
import { Heading2 } from "@/components/common/Typography";
import { landingPageScientificallyGroundedSectionData } from "@/components/page-components/Home/LandingPageScientificallyGroundedSection/data";
import LandingPageScientificallyGroundedSectionSlider from "@/components/page-components/Home/LandingPageScientificallyGroundedSection/LandingPageScientificallyGroundedSectionSlider";

const LandingPageScientificallyGroundedSection = () => {
  return (
    <div className="pt-12 md:pt-18 lg:pt-30 flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-13.5 bg-background">
      <Container className="w-full">
        <Heading2 className="text-white text-2xl! md:text-3xl! lg:text-4xl! leading-[120%]! tracking-[-2%]!">
          Scientifically Grounded. <br className="hidden sssmd:block" />
          Medically Validated.
        </Heading2>
      </Container>
      <LandingPageScientificallyGroundedSectionSlider
        slides={landingPageScientificallyGroundedSectionData}
        imageHeight="80vh"
        titleClassName="text-xl! md:text-2xl! lg:text-3xl! leading-tight!"
        showGradient={false}
        showBottomButton={true}
      />
    </div>
  );
};
export default LandingPageScientificallyGroundedSection;
