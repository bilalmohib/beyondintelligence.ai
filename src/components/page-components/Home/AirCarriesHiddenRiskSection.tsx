import Container from "@/components/common/Container";
import { Heading1, Heading2 } from "@/components/common/Typography";

const AirCarriesHiddenRiskSection = () => {
    return (
        <section className="w-full min-h-screen">
            <div className="relative min-h-screen w-full bg-image-air-carries-hidden-risk-section bg-cover bg-no-repeat bg-position-[20%_0%] md:bg-position-[25%_5%] lg:bg-position-[30%_21%]">
                {/* Optional subtle dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/5" />

                <Container className="relative min-h-screen py-30">
                    <div className="flex min-h-screen w-full items-start justify-end">
                        <Heading2 className="text-white leading-[120%]! text-right">
                            The Air Carries Hidden <br /> Risks — And They Shape Your{" "}
                            <br /> Child’s Asthma.
                        </Heading2>
                    </div>
                </Container>
            </div>
        </section>
    );
};
export default AirCarriesHiddenRiskSection;