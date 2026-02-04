import Container from "@/components/common/Container";
import { Heading2 } from "@/components/common/Typography";
import SwiperSlider from "@/components/common/SwiperSlider";
import { landingPageScientificallyGroundedSectionData } from "@/components/page-components/Home/LandingPageScientificallyGroundedSection/data";

const LandingPageScientificallyGroundedSection = () => {
  return (
    <div className="py-30 flex flex-col gap-13.5 bg-background">
      <Container className="w-full">
        <Heading2 className="text-white leading-[120%]! tracking-[-2%]!">
          Scientifically Grounded. <br />
          Medically Validated.
        </Heading2>
      </Container>
      <SwiperSlider
        slides={landingPageScientificallyGroundedSectionData}
        fullWidth
        imageHeight={700}
        titleClassName="text-[32px]!"
        showGradient={false}
        showBottomButton={true}
      />
    </div>
  );
};
export default LandingPageScientificallyGroundedSection;
