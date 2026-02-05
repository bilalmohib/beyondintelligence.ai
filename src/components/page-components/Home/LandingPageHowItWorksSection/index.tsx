import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import { Heading2, Paragraph } from "@/components/common/Typography";
import { landingPageHowItWorksSectionData } from "@/components/page-components/Home/LandingPageHowItWorksSection/data";
import LandingPageHowItWorksListSection from "@/components/page-components/Home/LandingPageHowItWorksSection/LandingPageHowItWorksListSection";

const LandingPageHowItWorksSection = () => {
  return (
    <Container className="h-auto py-12 md:py-18 lg:py-30 flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-13.5">
      <Heading2 className="text-center! lg:leading-13.75! -tracking-[0.92px]! text-white! text-2xl! sm:text-3xl! lg:text-[46px]!">
        How Satori Works
      </Heading2>

      <div>
        <LandingPageHowItWorksListSection
          data={landingPageHowItWorksSectionData}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-3 mt-2 md:mt-0">
        <Paragraph className="text-center! leading-5! text-xs! text-white!">
          No credit card required.
          <br />
          Get immediate protection.
        </Paragraph>
        <Button className="px-5! py-3.5! w-full! ssmd:w-fit!">Start Free 14-Day Trial</Button>
      </div>
    </Container>
  );
};

export default LandingPageHowItWorksSection;
