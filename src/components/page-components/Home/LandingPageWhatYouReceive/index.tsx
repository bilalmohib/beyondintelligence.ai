"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import { Heading2, Paragraph } from "@/components/common/Typography";
import { landingPageWhatYouReceiveSliderSectionData } from "@/components/page-components/Home/LandingPageWhatYouReceive/data";
import LandingPageWhatYouReceiveSlider from "@/components/page-components/Home/LandingPageWhatYouReceive/LandingPageWhatYouReceiveSlider";

const LandingPageWhatYouReceive = () => {
  return (
    <div className="bg-primary py-30">
      <Container className="flex flex-col gap-13.5">
        <Heading2 className="text-white! text-center! leading-tight! md:leading-13.75! !tracking-[0.92px]!">
          What You Receive
        </Heading2>
        <LandingPageWhatYouReceiveSlider
          slides={landingPageWhatYouReceiveSliderSectionData}
          imageHeight="auto"
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
  );
};

export default LandingPageWhatYouReceive;
