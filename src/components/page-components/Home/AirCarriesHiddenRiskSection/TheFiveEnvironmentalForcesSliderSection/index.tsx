import Container from "@/components/common/Container";
import CustomModal from "@/components/common/CustomModal";
import { Heading2 } from "@/components/common/Typography";
import SwiperSlider from "@/components/common/SwiperSlider";
import { theFiveEnvironmentalForcesSliderSectionData } from "@/components/page-components/Home/AirCarriesHiddenRiskSection/TheFiveEnvironmentalForcesSliderSection/data";

const TheFiveEnvironmentalForcesSliderSection = () => {
    return (
        <div className="bg-[#1A1C4E]">
            {/* Top container: solid dark blue with heading (Figma) */}
            <Container className="pt-0.5 pb-0">
                <Heading2 className="text-white! leading-[120%]! text-left">
                    The five environmental forces <br /> behind most asthma attacks.
                </Heading2>                
            </Container>
            {/* 50px vertical gap between container and slider (Figma spec) */}
            <div className="h-[50px]" aria-hidden />
            <Container className="pb-30">
                <SwiperSlider slides={theFiveEnvironmentalForcesSliderSectionData} isModalActive />
            </Container>
            <CustomModal />
        </div>
    );
};
export default TheFiveEnvironmentalForcesSliderSection;






