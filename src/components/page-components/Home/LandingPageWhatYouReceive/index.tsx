"use client";

import Container from "@/components/common/Container";
import { Heading2 } from "@/components/common/Typography";
import LandingPageWhatYouReceiveSlider from "./LandingPageWhatYouReceiveSlider";
import { landingPageWhatYouReceiveSliderSectionData } from "./data";

const LandingPageWhatYouReceive = () => {
  return (
    <div className="bg-primary py-20 md:py-30">
      <Container className="flex flex-col gap-10 md:gap-13.5">
        <Heading2 className="text-white! text-center! leading-tight! md:leading-13.75! !tracking-[0.92px]!">
          What You Receive
        </Heading2>
      </Container>

      <div className="mt-10 md:mt-13.5">
        <LandingPageWhatYouReceiveSlider
          slides={landingPageWhatYouReceiveSliderSectionData}
          imageHeight="auto"
        />
      </div>
    </div>
  );
};

export default LandingPageWhatYouReceive;
