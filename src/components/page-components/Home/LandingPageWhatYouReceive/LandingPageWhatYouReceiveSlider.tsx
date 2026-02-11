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
import { useWindowSize } from "@/utils/detect-dimensions";
import { SlideData } from "@/components/common/SwiperSlider";
import { Heading5, Paragraph } from "@/components/common/Typography";

interface LandingPageWhatYouReceiveSliderProps {
  slides: SlideData[];
  imageHeight?: number | "auto";
  isModalActive?: boolean;
  onSlideSelect?: (slide: SlideData) => void;
  fullWidth?: boolean;
}

const LandingPageWhatYouReceiveSlider = ({
  slides,
  imageHeight,
  isModalActive = false,
  onSlideSelect,
  fullWidth = false,
}: LandingPageWhatYouReceiveSliderProps) => {
  const { width } = useWindowSize();

  const isMobile = width && width < 768;
  const isTablet = width && width < 992;
  const isDesktop = width && width >= 992;
  const isLargeDesktop = width && width >= 1200;
  const isXLargeDesktop = width && width >= 1400;
  const isXXLargeDesktop = width && width >= 1600;
  const isXXXLargeDesktop = width && width >= 1800;

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
    <div className="relative pt-5">
        <Swiper
          initialSlide={0}
          slidesPerView={"auto"}
          spaceBetween={
            isMobile
              ? 20
              : isTablet
              ? 30
              : isDesktop
              ? 40
              : isLargeDesktop
              ? 40
              : 40
          }
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          modules={[Navigation]}
          className="mlg:pb-4"
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => {
            // Ensure we start at slide 0
            swiper.slideTo(0, 0);
            // Auto-play video on first slide if it has one
            setTimeout(() => handleSlideChange(swiper), 100);
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
          }}
        >
          {slides?.map((slide: SlideData, index: number) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col gap-6">
                {/* Image Card */}
                <div
                  className="relative w-full rounded-[20px] overflow-hidden bg-white-smoke flex items-center justify-center pt-3"
                  style={{
                    height:
                      typeof imageHeight === "number"
                        ? `${imageHeight}px`
                        : undefined,
                  }}
                >
                  {slide.video ? (
                    <video
                      ref={(el) => setVideoRef(el, index)}
                      src={slide.video}
                      muted
                      loop
                      playsInline
                      className="w-auto h-auto max-w-[90%] object-contain"
                    />
                  ) : slide.image ? (
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={348}
                      height={100}
                      style={{ width: 348, height: "auto" }}
                      className="object-contain"
                    />
                  ) : null}
                  {isModalActive && slide.modalContent && (
                    <Button
                      type="button"
                      variant="outline"
                      className="absolute bottom-4 right-4 text-white! hover:text-white! rounded-full! w-12 h-12 bg-primary! border-primary!"
                      onClick={() => onSlideSelect?.(slide)}
                      aria-label="Open details"
                    >
                      <PlusIcon className="size-5" />
                    </Button>
                  )}
                </div>

                {/* Text Content Below Card */}
                <div className="flex flex-col gap-3 mlg:pr-4">
                  <Heading5 className="text-white text-xl! md:text-2xl! leading-tight">
                    {slide.title}
                  </Heading5>
                  {slide.description && (
                    <Paragraph className="text-white! leading-normal! md:leading-7!">
                      {slide.description}
                    </Paragraph>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex gap-4 justify-between ssmd:justify-end mt-0 md:mt-4 mlg:pr-4">
          <button className="cursor-pointer swiper-button-prev-custom lg:w-12 lg:h-12 w-10 h-10 rounded-full border-2 border-white/30 hover:border-white/50 flex items-center justify-center transition-colors">
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
          <button className="cursor-pointer swiper-button-next-custom lg:w-12 lg:h-12 w-10 h-10 rounded-full border-2 border-white/30 hover:border-white/50 flex items-center justify-center transition-colors">
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
    </div>
  );
};

export default LandingPageWhatYouReceiveSlider;
