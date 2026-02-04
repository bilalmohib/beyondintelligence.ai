"use client";

import { X } from "lucide-react";
import { Heading3, Paragraph } from "@/components/common/Typography";
import type { SlideButtonOverlay } from "@/components/common/SwiperSlider/types";

interface SwiperSliderOverlayProps {
  overlay: SlideButtonOverlay;
  image?: string;
  dominantColors: Record<string, string>;
  onClose: () => void;
}

const SwiperSliderOverlay = ({
  overlay,
  image,
  dominantColors,
  onClose,
}: SwiperSliderOverlayProps) => {
  const backgroundColor = image
    ? dominantColors[image] || "rgb(0, 0, 0)"
    : "rgb(0, 0, 0)";

  return (
    <div
      className="absolute inset-0 rounded-[20px] p-[50px]"
      style={{ backgroundColor }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white text-white cursor-pointer"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex flex-col gap-8 h-fit">
          <Heading3 className="text-white">{overlay.title}</Heading3>
          <div className="flex flex-col gap-4">
            {overlay.paragraphs.map((p, i) => (
              <Paragraph key={i} className="text-white">
                {p}
              </Paragraph>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperSliderOverlay;
