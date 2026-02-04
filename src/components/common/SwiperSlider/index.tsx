"use client";

import { useState, useEffect } from "react";
import type {
  SlideData,
  SwiperSliderProps,
} from "@/components/common/SwiperSlider/types";
import { getDominantColor } from "@/components/common/SwiperSlider/utils";
import SwiperSliderBody from "@/components/common/SwiperSlider/SwiperSliderBody";
import SwiperSliderControls from "@/components/common/SwiperSlider/SwiperSliderControls";

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
}: SwiperSliderProps<T>) => {
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

  return (
    <div className="relative">
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
      />
      <SwiperSliderControls />
    </div>
  );
};

export default SwiperSlider;
