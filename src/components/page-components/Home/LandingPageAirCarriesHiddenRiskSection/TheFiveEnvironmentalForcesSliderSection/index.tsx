"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { openModal } from "@/redux/slices/modalSlice";
import Container from "@/components/common/Container";
import CustomModal from "@/components/common/CustomModal";
import { Heading2 } from "@/components/common/Typography";
import SwiperSlider from "@/components/common/SwiperSlider";
import FiveEnvironmentalForcesModalContent from "@/components/page-components/Home/LandingPageAirCarriesHiddenRiskSection/FiveEnvironmentalForcesModalContent";
import {
  ITheFiveEnvironmentalForcesSliderSectionData,
  theFiveEnvironmentalForcesSliderSectionData,
} from "@/components/page-components/Home/LandingPageAirCarriesHiddenRiskSection/TheFiveEnvironmentalForcesSliderSection/data";

const TheFiveEnvironmentalForcesSliderSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedSlide, setSelectedSlide] =
    useState<ITheFiveEnvironmentalForcesSliderSectionData | null>(null);

  const handleSlideSelect = (
    slide: ITheFiveEnvironmentalForcesSliderSectionData
  ) => {
    setSelectedSlide(slide);
    if (slide.modalContent) {
      dispatch(
        openModal({
          ...slide.modalContent,
          image: slide.modalContent.image ?? {
            src: slide.image,
            alt: slide.title,
          },
        })
      );
    }
  };

  return (
    <div className="bg-[#1A1C4E] pb-8 sm:pb-12 md:pb-20 lg:pb-30">
      <Container className="pt-4 sm:pt-6 md:pt-0.5 pb-0">
        <Heading2 className="text-white! leading-[120%]! text-left">
          The five environmental forces <br className="hidden sm:block" />{" "}
          behind most asthma attacks.
        </Heading2>
      </Container>

      <div
        className="h-[24px] sm:h-[32px] md:h-[40px] lg:h-[50px]"
        aria-hidden
      />
      <SwiperSlider
        slides={theFiveEnvironmentalForcesSliderSectionData}
        isModalActive
        onSlideSelect={handleSlideSelect}
        imageHeight={559}
      />
      <CustomModal>
        {selectedSlide?.modalContent && (
          <FiveEnvironmentalForcesModalContent
            title={selectedSlide.modalContent.title}
            description={selectedSlide.modalContent.description}
            bottomText={selectedSlide.modalContent.bottomText}
            image={selectedSlide.modalContent.image}
          />
        )}
      </CustomModal>
    </div>
  );
};
export default TheFiveEnvironmentalForcesSliderSection;
