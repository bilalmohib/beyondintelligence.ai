import Container from "@/components/common/Container";
import { Heading2 } from "@/components/common/Typography";
import SwiperSlider from "@/components/common/SwiperSlider";
import { landingPageInspiredByTheVoicesOfParentsSectionData } from "@/components/page-components/Home/LandingPageInspiredByTheVoicesOfParentsSection/data";

const LandingPageInspiredByTheVoicesOfParentsSection = () => {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-13.5 bg-background pt-12 md:pt-18 lg:pt-30">
      <Container className="w-full">
        <Heading2 className="text-white text-2xl! md:text-3xl! lg:text-4xl! leading-[120%]! tracking-[-2%]!">
          Inspired by the Voices <br className="hidden ssm:block" />
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
