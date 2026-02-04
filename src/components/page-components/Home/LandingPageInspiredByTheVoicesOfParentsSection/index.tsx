import Container from "@/components/common/Container";
import { Heading2 } from "@/components/common/Typography";
import SwiperSlider from "@/components/common/SwiperSlider";
import { landingPageInspiredByTheVoicesOfParentsSectionData } from "@/components/page-components/Home/LandingPageInspiredByTheVoicesOfParentsSection/data";

const LandingPageInspiredByTheVoicesOfParentsSection = () => {
  return (
    <div className="flex flex-col gap-13.5 bg-background py-30">
      <Container className="w-full">
        <Heading2 className="text-white leading-[120%]! tracking-[-2%]!">
          Inspired by the Voices <br />
          of Parents Everywhere.
        </Heading2>
      </Container>
      <SwiperSlider
        slides={landingPageInspiredByTheVoicesOfParentsSectionData}
        fullWidth
        textSlider={true}
      />
    </div>
  );
};
export default LandingPageInspiredByTheVoicesOfParentsSection;
