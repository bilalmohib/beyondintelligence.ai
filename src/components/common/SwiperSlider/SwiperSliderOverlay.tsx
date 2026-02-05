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
      className="absolute inset-0 flex flex-col rounded-[20px] p-6 pt-14 md:p-10 md:pt-14 lg:p-[50px] lg:pt-[50px]"
      style={{ backgroundColor }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white text-white cursor-pointer"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="flex flex-col justify-center items-center min-h-full py-4">
          <div className="flex flex-col gap-8 w-full">
            <Heading3 className="text-white text-xl! md:text-2xl! lg:text-3xl! leading-tight!">
              {overlay.title}
            </Heading3>
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
    </div>
  );
};

export default SwiperSliderOverlay;
