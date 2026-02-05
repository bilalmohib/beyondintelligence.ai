"use client";

import { useWindowSize } from "@/utils/detect-dimensions";
import SwiperSlider from "@/components/common/SwiperSlider";
import { SlideData } from "@/components/common/SwiperSlider";

interface LandingPageScientificallyGroundedSectionSliderProps {
  slides: SlideData[];
  imageHeight?: number | "auto";
  titleClassName?: string;
  showGradient?: boolean;
  showBottomButton?: boolean;
}

const LandingPageScientificallyGroundedSectionSlider = ({
  slides,
  imageHeight,
  titleClassName,
  showGradient,
  showBottomButton,
}: LandingPageScientificallyGroundedSectionSliderProps) => {
  const { width } = useWindowSize();

  const isMobile = width && width < 768;
  const isTablet = width && width < 992;
  const isDesktop = width && width >= 992;
  const isLargeDesktop = width && width >= 1200;
  const isXLargeDesktop = width && width >= 1400;
  const isXXLargeDesktop = width && width >= 1600;
  const isXXXLargeDesktop = width && width >= 1800;

  return (
    <div>
      <SwiperSlider
        slides={slides}
        fullWidth
        imageHeight={
          isMobile
            ? 520
            : isTablet
            ? 700
            : isDesktop
            ? 700
            : isLargeDesktop
            ? 700
            : isXLargeDesktop
            ? 700
            : isXXLargeDesktop
            ? 700
            : isXXXLargeDesktop
            ? 700
            : 700
        }
        titleClassName={titleClassName}
        showGradient={showGradient}
        showBottomButton={showBottomButton}
      />
    </div>
  );
};

export default LandingPageScientificallyGroundedSectionSlider;
