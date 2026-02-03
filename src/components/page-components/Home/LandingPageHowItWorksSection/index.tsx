import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import { Heading2, Paragraph } from "@/components/common/Typography";
import { landingPageHowItWorksSectionData } from "@/components/page-components/Home/LandingPageHowItWorksSection/data";
import LandingPageHowItWorksListSection from "@/components/page-components/Home/LandingPageHowItWorksSection/LandingPageHowItWorksListSection";

const LandingPageHowItWorksSection = () => {
  return (
    <Container className="h-auto py-30 flex flex-col gap-13.5">
      <Heading2 className="text-center! leading-13.75! -tracking-[0.92px]! text-white!">
        How Satori Works
      </Heading2>

      <div>
        <LandingPageHowItWorksListSection
          data={landingPageHowItWorksSectionData}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-3">
        <Paragraph className="text-center! leading-5! text-xs! text-white!">
          No credit card required.
          <br />
          Get immediate protection.
        </Paragraph>
        <Button className="px-5! py-3.5!">Start Free 14-Day Trial</Button>
      </div>
    </Container>
  );
};

export default LandingPageHowItWorksSection;
