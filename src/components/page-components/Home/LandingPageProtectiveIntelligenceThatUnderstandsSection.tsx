import Image from "next/image";
import Container from "@/components/common/Container";
import { Heading2, Heading3, Paragraph } from "@/components/common/Typography";

const LandingPageProtectiveIntelligenceThatUnderstandsSection = () => {
  return (
    <div className="bg-primary">
      <Container className="min-h-fit pt-12 md:pt-18 pb-0 lg:pt-24 lg:px-15 flex flex-col gap-8 md:gap-14 lg:gap-16">
        <Heading2 className="text-white! text-center! leading-13.75! -tracking-[0.92px]!">
          A protective intelligence that understands{" "}
          <br className="hidden xl:block" />
          what leads to asthma symptoms – and warns you{" "}
          <br className="hidden xl:block" />
          before they begin.
        </Heading2>

        <div className="grid grid-cols-1 mllg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <div className="flex flex-col justify-center items-center">
            <div className="h-fit flex flex-col gap-4 md:gap-6 lg:gap-8">
              <Heading3 className="text-white! text-left! leading-10! -tracking-[0.64px]!">
                How Satori Appears in Your Life
              </Heading3>
              <div className="flex flex-col gap-3">
                <Paragraph className="text-white! text-left! leading-7!">
                  <b>No app. No logins. Just protection.</b>
                </Paragraph>
                <Paragraph className="text-white! text-left! leading-7!">
                  Satori works by text — reading the air around your child and
                  translating hidden risk into simple guidance, wherever they
                  are.
                </Paragraph>
              </div>
            </div>
          </div>
          <div>
            <Image
              src="/assets/pages/landing/images/LandingPageProtectiveIntelligenceThatUnderstandsSection/howSatoriAppears.svg"
              alt="How Satori Appears in Your Life"
              width={724}
              height={750.58}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LandingPageProtectiveIntelligenceThatUnderstandsSection;
