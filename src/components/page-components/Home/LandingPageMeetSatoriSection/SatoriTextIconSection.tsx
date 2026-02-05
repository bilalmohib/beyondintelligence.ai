"use client";

import { SatoriTextIcon } from "@/components/icons";
import { useWindowSize } from "@/utils/detect-dimensions";

const DESKTOP_WIDTH = 554;
const DESKTOP_HEIGHT = 156;
const ASPECT_RATIO = DESKTOP_HEIGHT / DESKTOP_WIDTH;

const SatoriTextIconSection = () => {
  const { width } = useWindowSize();

  const getDimensions = () => {
    if (!width) return { width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT };
    if (width >= 992) return { width: DESKTOP_WIDTH, height: DESKTOP_HEIGHT };
    if (width >= 768) {
      const w = Math.min(400, width - 48);
      return { width: w, height: Math.round(w * ASPECT_RATIO) };
    }
    const w = Math.min(280, width - 32);
    return { width: w, height: Math.round(w * ASPECT_RATIO) };
  };

  const { width: iconWidth, height: iconHeight } = getDimensions();

  return (
    <div>
      <SatoriTextIcon width={iconWidth} height={iconHeight} />
    </div>
  );
};

export default SatoriTextIconSection;
