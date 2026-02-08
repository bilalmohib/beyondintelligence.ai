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
    <div className="relative">
      {/* Very faint rainbow tint — only a hint of colour at the text edges */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          inset: "8% 4% -4% 4%",
          background:
            "linear-gradient(90deg, rgba(210,185,70,0.1) 0%, rgba(80,210,160,0.08) 25%, rgba(50,200,220,0.08) 45%, rgba(70,140,240,0.06) 65%, rgba(100,60,200,0.05) 90%)",
          filter: "blur(6px)",
        }}
      />
      {/* Blurred SVG copy — glow follows the exact letter shapes */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ filter: "blur(4px)", opacity: 0.45 }}
      >
        <SatoriTextIcon width={iconWidth} height={iconHeight} />
      </div>
      {/* Crisp white text on top */}
      <div className="relative">
        <SatoriTextIcon width={iconWidth} height={iconHeight} />
      </div>
    </div>
  );
};

export default SatoriTextIconSection;
