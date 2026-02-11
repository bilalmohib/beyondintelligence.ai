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
  prevButtonSelector: string;
  nextButtonSelector: string;
}

const SwiperTextSliderBody = ({
  slides = [],
  titleClassName,
  descriptionClassName,
  prevButtonSelector,
  nextButtonSelector,
}: SwiperTextSliderBodyProps) => {
  // Extract class name from selector (remove leading dot)
  const prevButtonClass = prevButtonSelector.replace(/^\./, "");
  const nextButtonClass = nextButtonSelector.replace(/^\./, "");
  
  return (
    <div className="relative w-full flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-0 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 box-border max-w-[100vw]">
      <button
        type="button"
        className={cn("cursor-pointer", prevButtonClass, "shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white/30 hover:border-white/50 active:scale-95 flex items-center justify-center transition-all touch-manipulation")}
        aria-label="Previous slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white w-6 h-6"
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

      <div className="flex-1 min-w-0 px-2 sm:px-3 md:px-4 lg:px-6 py-12 sm:py-16 md:py-20 lg:py-0 h-auto min-h-[55vh] sm:min-h-[65vh] md:min-h-[75vh] lg:min-h-0 lg:h-screen overflow-hidden">
        <Swiper
          initialSlide={0}
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={0}
          allowTouchMove={true}
          navigation={{
            nextEl: nextButtonSelector,
            prevEl: prevButtonSelector,
          }}
          modules={[Navigation]}
          className="overflow-hidden!"
          touchEventsTarget="container"
          onSwiper={(swiper) => {
            // Ensure we start at slide 0
            swiper.slideTo(0, 0);
          }}
        >
          {slides?.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center text-center gap-2 sm:gap-3 md:gap-4 py-6 sm:py-8 md:py-10 lg:py-12 min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-0 lg:h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                <Heading1
                  className={cn(
                    "font-normal! text-white! text-2xl! sm:text-3xl! md:text-4xl! lg:text-[40px]! leading-tight! sm:leading-snug! md:leading-normal! lg:leading-12! -tracking-[0.8px]! text-center! wrap-break-word",
                    titleClassName
                  )}
                >
                  {slide.title}
                </Heading1>
                {slide.description && (
                  <Paragraph
                    className={cn(
                      "text-white text-sm! sm:text-base! leading-6! sm:leading-7! tracking-[0.36px]! text-center! max-w-full wrap-break-word",
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
        className={cn("cursor-pointer", nextButtonClass, "shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white/30 hover:border-white/50 active:scale-95 flex items-center justify-center transition-all touch-manipulation")}
        aria-label="Next slide"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white w-6 h-6"
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
