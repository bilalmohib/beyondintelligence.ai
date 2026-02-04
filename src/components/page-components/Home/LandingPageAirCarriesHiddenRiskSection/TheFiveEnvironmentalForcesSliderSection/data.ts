import type { SlideData } from "@/components/common/SwiperSlider";
import { IFiveEnvironmentalForcesModalContentProps } from "@/components/page-components/Home/LandingPageAirCarriesHiddenRiskSection/FiveEnvironmentalForcesModalContent";

export type ITheFiveEnvironmentalForcesSliderSectionData = SlideData & {
    isModalActive?: boolean;
    modalContent?: IFiveEnvironmentalForcesModalContentProps
};

export const theFiveEnvironmentalForcesSliderSectionData: ITheFiveEnvironmentalForcesSliderSectionData[] = [
    {
        image: '/assets/pages/landing/images/AirCarriesHiddenSection/TheFiveEnvironmentalForcesSliderSection/photo_004.jpg',
        title: 'When pollution rises before you can see it.',
        isModalActive: true,
        modalContent: {
            title: "Dirty Air Events: Invisible Particles, Immediate Impact",
            description: "Fine particles from pollution and wildfire smoke slip into the air long before the sky looks hazy. These microscopic irritants reach deep into a child’s small airways, triggering inflammation, tightening (bronchospasm), and a sudden dry cough or wheeze. Pediatricians often diagnose these episodes as acute asthma flares or smoke-induced irritation — all caused before parents can see anything wrong.",
            bottomText: "Your child feels these particles long before you do.",
            image: {
                src: '/assets/pages/landing/images/AirCarriesHiddenSection/TheFiveEnvironmentalForcesSliderSection/photo_004.jpg',
                alt: 'Dirty Air Events: Invisible Particles, Immediate Impact'
            }
        }
    },
    {
        image: '/assets/pages/landing/images/AirCarriesHiddenSection/TheFiveEnvironmentalForcesSliderSection/photo_005.png',
        title: 'When the afternoon turns harsh on young lungs.',
        isModalActive: true,
        modalContent: {
            title: "Toxic Afternoon Atmosphere: The 3–7 PM Air Shift",
            description: "Warm afternoon sunlight transforms pollutants into ozone — a gas that inflames young airways within minutes. This is why so many children cough after recess, feel tightness during outdoor play, or wheeze after sports. Clinicians often label these events as ozone-induced bronchospasm or exercise-triggered flares tied to this daily chemical shift.",
            bottomText: "This is one of asthma’s most predictable danger windows.",
            image: {
                src: '/assets/pages/landing/images/AirCarriesHiddenSection/TheFiveEnvironmentalForcesSliderSection/photo_005.png',
                alt: 'Toxic Afternoon Atmosphere: The 3–7 PM Air Shift'
            }
        }
    },
    {
        image: '/assets/pages/landing/images/AirCarriesHiddenSection/TheFiveEnvironmentalForcesSliderSection/photo_006.png',
        title: 'When invisible exhaust builds as the day begins.',
        isModalActive: true,
        modalContent: {
            title: "Traffic & Urban Exposure: Morning Air That Works Against Children",
            description: "During school drop-off hours, idling vehicles create concentrated pockets of NO₂ and exhaust at street level. Children walking near roads or waiting at bus stops inhale these irritants when their morning airways are most sensitive. These exposures often show up as persistent morning cough, chest tightness, or NO₂-triggered asthma flares — reactions driven by neighborhood-specific air patterns.",
            bottomText: "Your neighborhood’s air matters more than parents realize.",
            image: {
                src: '/assets/pages/landing/images/AirCarriesHiddenSection/TheFiveEnvironmentalForcesSliderSection/photo_006.png',
                alt: 'Traffic & Urban Exposure: Morning Air That Works Against Children'
            }
        }
    },
    {
        image: '/assets/pages/landing/images/AirCarriesHiddenSection/TheFiveEnvironmentalForcesSliderSection/photo_007.png',
        title: "When the night traps what the day leaves behind.",
        isModalActive: true,
        modalContent: {
            title: "Nighttime Danger Windows: Why Attacks Happen While Children Sleep",
            description: "Nighttime Danger Windows: Why Attacks Happen While Children Sleep",
            bottomText: "Night reveals what the air is quietly doing.",
            image: {
                src: '/assets/pages/landing/images/AirCarriesHiddenSection/TheFiveEnvironmentalForcesSliderSection/photo_007.png',
                alt: 'Nighttime Danger Windows: Why Attacks Happen While Children Sleep'
            }
        }
    },
    {
        image: '/assets/pages/landing/images/AirCarriesHiddenSection/TheFiveEnvironmentalForcesSliderSection/photo_008.jpg',
        title: "When the weather shifts faster than young lungs can adapt.",
        isModalActive: true,
        modalContent: {
            title: "Weather & Climate Instability: The Breath Behind the Breeze",
            description: "Children’s airways react instantly to rapid changes in temperature, humidity, and pressure. A sudden cold gust, an approaching storm, or a quick weather swing can tighten airways even when pollution is low. Clinicians often diagnose these reactions as weather-triggered asthma, cold-air bronchospasm, or barometric-pressure flare-ups.",
            bottomText: "Asthma reacts not just to what’s in the air — but how the air is changing.",
            image: {
                src: '/assets/pages/landing/images/AirCarriesHiddenSection/TheFiveEnvironmentalForcesSliderSection/photo_008.jpg',
                alt: 'Weather & Climate Instability: The Breath Behind the Breeze'
            }
        }
    }
];