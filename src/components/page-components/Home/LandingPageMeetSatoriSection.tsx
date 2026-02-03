import Container from "@/components/common/Container";
import { MeetSatoriIcon, SatoriTextIcon } from "@/components/icons";
import { Heading5, Paragraph } from "@/components/common/Typography";

const LandingPageMeetSatoriSection = () => {
    return (
        <Container className="h-screen flex items-center bg-background">
            <div className="w-fit h-fit mx-auto flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center justify-center">
                        <div className="relative">
                            <MeetSatoriIcon />
                            <Heading5 className="text-[#101131]! text-center! leading-8! absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2">
                                Meet
                            </Heading5>
                        </div>
                        <SatoriTextIcon />
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