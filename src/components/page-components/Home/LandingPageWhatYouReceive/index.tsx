"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import { useWindowSize } from "@/utils/detect-dimensions";
import { Heading2, Paragraph } from "@/components/common/Typography";
import { landingPageWhatYouReceiveSliderSectionData } from "@/components/page-components/Home/LandingPageWhatYouReceive/data";
import LandingPageWhatYouReceiveSlider from "@/components/page-components/Home/LandingPageWhatYouReceive/LandingPageWhatYouReceiveSlider";

const LandingPageWhatYouReceive = () => {
  const { width } = useWindowSize();

  const isMobile = width && width < 768;
  const isTablet = width && width < 992;
  const isDesktop = width && width >= 992;
  const isLargeDesktop = width && width >= 1200;
  const isXLargeDesktop = width && width >= 1400;

  return (
    <div className="px-2.5">
      <div className="bg-primary py-12 md:py-18 lg:py-30 rounded-[20px]">
        <Container className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-13.5">
          <Heading2 className="text-white! text-center! leading-tight! md:leading-13.75! !tracking-[0.92px]!">
            What You Receive
          </Heading2>
          <LandingPageWhatYouReceiveSlider
            slides={landingPageWhatYouReceiveSliderSectionData}
            imageHeight={
              isMobile
                ? 380
                : isTablet
                ? 400
                : isDesktop
                ? 420
                : isLargeDesktop
                ? 420
                : isXLargeDesktop
                ? 420
                : 420
            }
          />
          <div className="flex flex-col justify-center items-center gap-3">
            <Paragraph className="text-center! leading-5! text-xs! text-white!">
              No credit card required. <br /> Get immediate protection.
            </Paragraph>
            <Button className="px-5! py-3.5! bg-white! text-primary!">
              Start Free 14-Day Trial
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default LandingPageWhatYouReceive;
