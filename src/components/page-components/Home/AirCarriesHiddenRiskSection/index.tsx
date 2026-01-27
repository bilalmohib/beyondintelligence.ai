import Container from "@/components/common/Container";
import { Heading2 } from "@/components/common/Typography";
import TheFiveEnvironmentalForcesSliderSection from "@/components/page-components/Home/AirCarriesHiddenRiskSection/TheFiveEnvironmentalForcesSliderSection";

const AirCarriesHiddenRiskSection = () => {
    return (
        <section className="w-full min-h-screen">
            <div className="relative min-h-screen w-full bg-image-air-carries-hidden-risk-section bg-cover bg-no-repeat bg-position-[20%_0%] md:bg-position-[25%_5%] lg:bg-position-[30%_21%]">
                <div className="absolute inset-0 bg-black/5" />
                {/* Blur shadow: gradient stays low – only lower portion, never touches faces */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(180deg, transparent 0%, transparent 82%, rgba(26,28,78,0.2) 88%, rgba(26,28,78,0.75) 94%, #1A1C4E 99%)",
                    }}
                />

                <Container className="relative min-h-screen py-30">
                    <div className="flex min-h-screen w-full items-start justify-end">
                        <Heading2 className="text-white leading-[120%]! text-right">
                            The Air Carries Hidden <br /> Risks — And They Shape Your{" "}
                            <br /> Child’s Asthma.
                        </Heading2>
                    </div>
                </Container>
            </div>

            <TheFiveEnvironmentalForcesSliderSection />
        </section>
    );
};
export default AirCarriesHiddenRiskSection;