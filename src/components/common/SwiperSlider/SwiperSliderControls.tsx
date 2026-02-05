"use client";

import { cn } from "@/lib/utils";
import Container from "@/components/common/Container";

interface SwiperSliderControlsProps {
  className?: string;
}

const SwiperSliderControls = ({ className }: SwiperSliderControlsProps) => {
  return (
    <Container className={cn("flex gap-4 justify-between ssmd:justify-end", className)}>
      <button
        type="button"
        className="cursor-pointer swiper-button-prev-custom w-10 md:w-12 h-10 md:h-12 rounded-full border-2 border-white/30 hover:border-white/50 flex items-center justify-center transition-colors"
        aria-label="Previous slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        type="button"
        className="cursor-pointer swiper-button-next-custom w-10 md:w-12 h-10 md:h-12 rounded-full border-2 border-white/30 hover:border-white/50 flex items-center justify-center transition-colors"
        aria-label="Next slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </Container>
  );
};

export default SwiperSliderControls;
