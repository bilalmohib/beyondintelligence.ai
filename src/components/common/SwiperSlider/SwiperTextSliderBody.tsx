"use client";

import "swiper/css";
import "swiper/css/navigation";
import { cn } from "@/lib/utils";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlideData } from "@/components/common/SwiperSlider/types";
import { Heading1, Paragraph } from "@/components/common/Typography";

interface SwiperTextSliderBodyProps {
  slides?: SlideData[];
  titleClassName: string;
  descriptionClassName: string;
}

const SwiperTextSliderBody = ({
  slides = [],
  titleClassName,
  descriptionClassName,
}: SwiperTextSliderBodyProps) => {
  return (
    <div className="relative w-full flex items-center">
      <button
        type="button"
        className="cursor-pointer swiper-button-prev-custom shrink-0 w-12 h-12 rounded-full border-2 border-white/30 hover:border-white/50 flex items-center justify-center transition-colors ml-6 sm:ml-8 lg:ml-10 xl:ml-12"
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

      <div className="flex-1 min-w-0 px-4 md:px-6 h-screen overflow-hidden">
        <Swiper
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={0}
          allowTouchMove={true}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          modules={[Navigation]}
          className="overflow-hidden!"
        >
          {slides?.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center text-center gap-3 py-8 md:py-12 h-screen px-61">
                <Heading1
                  className={cn(
                    "font-normal! text-white! text-[40px]! leading-12! -tracking-[0.8px]! text-center!",
                    titleClassName
                  )}
                >
                  {slide.title}
                </Heading1>
                {slide.description && (
                  <Paragraph
                    className={cn(
                      "text-white leading-7! tracking-[0.36px]! text-center!",
                      descriptionClassName
                    )}
                  >
                    {slide.description}
                  </Paragraph>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button
        type="button"
        className="cursor-pointer swiper-button-next-custom shrink-0 w-12 h-12 rounded-full border-2 border-white/30 hover:border-white/50 flex items-center justify-center transition-colors mr-6 sm:mr-8 lg:mr-10 xl:mr-12"
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
    </div>
  );
};

export default SwiperTextSliderBody;
