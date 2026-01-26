import Container from "@/components/common/Container";
import { Heading2 } from "@/components/common/Typography";
import SwiperSlider from "@/components/common/SwiperSlider";

const LandingPageSliderAsthmaFeelsUnpredictableSection = () => {
    return (
        <div className="py-30 flex flex-col gap-13.5">
            <Container className="w-full">
                <Heading2 className="text-white leading-[120%]! tracking-[-2%]!">
                    Asthma feels unpredictable <br />
                    even when you do everything right.
                </Heading2>
            </Container>
            <SwiperSlider />
        </div>
    );
};

export default LandingPageSliderAsthmaFeelsUnpredictableSection;