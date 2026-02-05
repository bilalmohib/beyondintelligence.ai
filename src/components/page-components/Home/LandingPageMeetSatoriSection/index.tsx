import { MeetSatoriIcon } from "@/components/icons";
import Container from "@/components/common/Container";
import { Heading5, Paragraph } from "@/components/common/Typography";
import SatoriTextIconSection from "@/components/page-components/Home/LandingPageMeetSatoriSection/SatoriTextIconSection";

const LandingPageMeetSatoriSection = () => {
  return (
    <Container className="h-auto py-30 md:py-36 mllg:py-44 mlg:py-52 lg:py-0 lg:h-screen flex items-center bg-background">
      <div className="w-fit h-fit mx-auto flex flex-col gap-8">
        <div className="flex flex-col">
          <div className="flex flex-col gap-6 items-center justify-center">
            <div className="relative">
              <MeetSatoriIcon />
              <Heading5 className="text-[#101131]! text-center! leading-8! absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                Meet
              </Heading5>
            </div>
            <SatoriTextIconSection />
          </div>
        </div>
        <Paragraph className="text-white! text-center! leading-7!">
          From the Japanese satori — sudden understanding of underlying truth.
        </Paragraph>
      </div>
    </Container>
  );
};

export default LandingPageMeetSatoriSection;
