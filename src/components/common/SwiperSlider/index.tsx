"use client";

import { useState, useEffect, useId } from "react";
import type {
  SlideData,
  SwiperSliderProps,
} from "@/components/common/SwiperSlider/types";
import { getDominantColor } from "@/components/common/SwiperSlider/utils";
import SwiperSliderBody from "@/components/common/SwiperSlider/SwiperSliderBody";
import SwiperSliderControls from "@/components/common/SwiperSlider/SwiperSliderControls";
import SwiperTextSliderBody from "@/components/common/SwiperSlider/SwiperTextSliderBody";

export type {
  SlideData,
  SwiperSliderProps,
} from "@/components/common/SwiperSlider/types";

const SwiperSlider = <T extends SlideData = SlideData>({
  slides,
  imageHeight,
  isModalActive,
  onSlideSelect,
  fullWidth = false,
  showGradient = true,
  titleClassName = "",
  descriptionClassName = "",
  showBottomButton = false,
  textSlider = false,
}: SwiperSliderProps<T>) => {
  // Use useId() for SSR-safe unique IDs, then sanitize to valid CSS class name
  const reactId = useId();
  // Convert React ID (e.g., ":r1:") to valid CSS class name (e.g., "r1")
  const sanitizedId = reactId.replace(/:/g, "").replace(/^r/, "id-");
  const prevButtonId = `swiper-button-prev-${sanitizedId}`;
  const nextButtonId = `swiper-button-next-${sanitizedId}`;
  
  const [activeOverlayIndex, setActiveOverlayIndex] = useState<number | null>(
    null
  );
  const [dominantColors, setDominantColors] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    if (!slides) return;
    slides.forEach((slide) => {
      if (slide.image && slide.overlay) {
        getDominantColor(slide.image).then((color) => {
          setDominantColors((prev) => ({ ...prev, [slide.image!]: color }));
        });
      }
    });
  }, [slides]);

  if (textSlider) {
    return (
      <SwiperTextSliderBody
        slides={slides}
        titleClassName={titleClassName}
        descriptionClassName={descriptionClassName}
        prevButtonSelector={`.${prevButtonId}`}
        nextButtonSelector={`.${nextButtonId}`}
      />
    );
  }

  return (
    <div className="relative w-full">
      <SwiperSliderBody
        slides={slides}
        imageHeight={imageHeight}
        isModalActive={isModalActive}
        onSlideSelect={onSlideSelect}
        fullWidth={fullWidth}
        showGradient={showGradient}
        titleClassName={titleClassName}
        descriptionClassName={descriptionClassName}
        showBottomButton={showBottomButton}
        activeOverlayIndex={activeOverlayIndex}
        onOverlayOpen={setActiveOverlayIndex}
        onOverlayClose={() => setActiveOverlayIndex(null)}
        dominantColors={dominantColors}
        prevButtonSelector={`.${prevButtonId}`}
        nextButtonSelector={`.${nextButtonId}`}
      />
      <SwiperSliderControls 
        className="mt-5 md:mt-8"
        prevButtonId={prevButtonId}
        nextButtonId={nextButtonId}
      />
    </div>
  );
};

export default SwiperSlider;
