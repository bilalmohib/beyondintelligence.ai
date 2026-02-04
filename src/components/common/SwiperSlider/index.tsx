"use client";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { PlusIcon } from "lucide-react";
import { Navigation } from "swiper/modules";
import { useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import Container from "@/components/common/Container";
import { Heading4, Paragraph } from "@/components/common/Typography";

export interface SlideModalContent {
  title: string;
  description: string;
  bottomText: string;
}

// Either image or video is required
export type SlideData = {
  title: string;
  subTitle?: string;
  description?: string;
  modalContent?: object;
  learnMoreRedirectUrl?: string;
} & (
  | { image: string; video?: never }
  | { video: string; image?: never }
  | { image: string; video: string }
);

interface SwiperSliderProps<T extends SlideData = SlideData> {
  slides?: T[];
  imageHeight?: number | "auto";
  isModalActive?: boolean;
  onSlideSelect?: (slide: T) => void;
  fullWidth?: boolean;
  showGradient?: boolean;
}

const SwiperSlider = <T extends SlideData = SlideData>({
  slides,
  imageHeight,
  isModalActive,
  onSlideSelect,
  fullWidth = false,
  showGradient = true,
}: SwiperSliderProps<T>) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    const activeIndex = swiper.activeIndex;

    // Pause all videos and play only the active one
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.currentTime = 0;
          video.play().catch(() => {
            // Autoplay might be blocked by browser
          });
        } else {
          video.pause();
        }
      }
    });
  }, []);

  const setVideoRef = useCallback(
    (el: HTMLVideoElement | null, index: number) => {
      videoRefs.current[index] = el;
    },
    []
  );

  return (
    <div className="relative">
      <Container className="pr-0! mr-0! xxlg:px-0! max-w-[1400px]! xxlg:max-w-[1350px]! xxlg:mx-auto!">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={40}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          modules={[Navigation]}
          className="pb-4!"
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => {
            // Auto-play video on first slide if it has one
            setTimeout(() => handleSlideChange(swiper), 100);
          }}
          breakpoints={
            fullWidth
              ? {
                  320: {
                    slidesPerView: 1.05,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 1.05,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 1.08,
                    spaceBetween: 40,
                  },
                }
              : {
                  320: {
                    slidesPerView: 1.1,
                    spaceBetween: 20,
                  },
                  640: {
                    slidesPerView: 1.3,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 1.5,
                    spaceBetween: 40,
                  },
                }
          }
        >
          {slides?.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className={`relative w-full rounded-[20px] overflow-hidden ${
                  imageHeight === undefined
                    ? "aspect-4/3"
                    : imageHeight === "auto"
                    ? "aspect-auto"
                    : ""
                }`}
                style={
                  typeof imageHeight === "number"
                    ? { height: `${imageHeight}px` }
                    : undefined
                }
              >
                {slide.video ? (
                  <video
                    ref={(el) => setVideoRef(el, index)}
                    src={slide.video}
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : slide.image ? (
                  <Image
                    src={slide.image}
                    alt={slide.title || "Slide image"}
                    fill
                    className="object-cover"
                  />
                ) : null}
                {showGradient && (
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12.5">
                  <div className="flex flex-row justify-between items-center gap-8">
                    <div className="flex flex-col gap-2.5">
                      <Heading4 className="text-white">{slide.title}</Heading4>
                      {slide.description && (
                        <Paragraph className="text-white text-2xl! leading-8 !tracking-[0.48px]!">
                          {slide.description}
                        </Paragraph>
                      )}
                    </div>
                    {isModalActive && slide.modalContent && (
                      <Button
                        type="button"
                        variant="outline"
                        className="text-white! hover:text-white! rounded-full! w-15 h-15 bg-primary! border-primary!"
                        onClick={() => onSlideSelect?.(slide)}
                        aria-label="Open details"
                      >
                        <PlusIcon className="size-6" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      <Container className="flex gap-4 justify-end mt-8">
        <button className="cursor-pointer swiper-button-prev-custom w-12 h-12 rounded-full border-2 border-white/30 hover:border-white/50 flex items-center justify-center transition-colors">
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
        <button className="cursor-pointer swiper-button-next-custom w-12 h-12 rounded-full border-2 border-white/30 hover:border-white/50 flex items-center justify-center transition-colors">
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
    </div>
  );
};

export default SwiperSlider;
