"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import { Heading2, Heading5, Paragraph } from "@/components/common/Typography";

const LandingPageCallToActionSection = () => {
  return (
    <Container>
      <div className="cta-section-gradient-border-wrapper">
        <div className="py-12 sm:py-18 md:py-24 lg:py-30 px-6 sm:px-8 md:px-10 lg:px-2.5 rounded-[20px] flex flex-col justify-center items-center gap-10">
          <div className="flex flex-col gap-3">
            <Heading2 className="text-white! leading-normal mlg:leading-13.75! -tracking-[0.92px]!">
              Your child deserves to breathe safely
            </Heading2>
            <Heading5 className="text-white! leading-normal mlg:leading-8! -tracking-[0.48px]!">
              Satori makes what's invisible in the air visible — before it harms
              your child.
            </Heading5>
          </div>
          <div className="flex flex-col gap-3">
            <Paragraph className="text-white! leading-5! text-xs! text-center!">
              No credit card required.
              <br />
              Get immediate protection.
            </Paragraph>
            <Button
              className="px-5! py-3.5! bg-white! text-primary!"
              onClick={() => {
                window.open("/signup/start", "_blank");
              }}
            >
              Start Free 14-Day Trial
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LandingPageCallToActionSection;
