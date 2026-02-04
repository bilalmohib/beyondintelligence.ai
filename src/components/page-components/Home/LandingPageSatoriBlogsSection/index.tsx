import Image from "next/image";
import Container from "@/components/common/Container";
import { Heading5 } from "@/components/common/Typography";
import { landingPageSatoriBlogsSliderSectionData } from "@/components/page-components/Home/LandingPageSatoriBlogsSection/data";
import LandingPageSatoriBlogsSlider from "@/components/page-components/Home/LandingPageSatoriBlogsSection/LandingPageSatoriBlogsSlider";

const LandingPageSatoriBlogsSection = () => {
  return (
    <div className="bg-background">
      <Container>
        <div className="flex flex-col gap-5 justify-center items-center py-55">
          <Heading5 className="text-white! text-center! leading-8! tracking-[0.48px]!">
            Inside
          </Heading5>
          <Image
            src="/assets/pages/landing/images/LandingPageSatoriBlogsSection/beyondIntelligence.svg"
            alt="Inside"
            width={841}
            height={100.05}
            className="select-none"
          />
        </div>
        <div>
          <LandingPageSatoriBlogsSlider
            slides={landingPageSatoriBlogsSliderSectionData}
            imageHeight="auto"
          />
        </div>
      </Container>
    </div>
  );
};

export default LandingPageSatoriBlogsSection;
