import Container from "@/components/common/Container";
import { Heading2 } from "@/components/common/Typography";
import SwiperSlider from "@/components/common/SwiperSlider";
import { landingPageAirChangesConstantlySectionData } from "@/components/page-components/Home/LandingPageAirChangesConstantlySection/data";

const LandingPageAirChangesConstantlySection = () => {
    return (
        <div className="pt-30 flex flex-col gap-13.5 bg-background">
            <Container className="w-full">
                <Heading2 className="text-white leading-[120%]! tracking-[-2%]!">
                    The air changes constantly and that’s <br />
                    why asthma feels unpredictable.
                </Heading2>
            </Container>
            <SwiperSlider slides={landingPageAirChangesConstantlySectionData} fullWidth imageHeight="100vh" />
        </div>
    );
};
export default LandingPageAirChangesConstantlySection;