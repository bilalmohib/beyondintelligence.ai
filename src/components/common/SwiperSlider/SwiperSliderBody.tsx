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
import { Heading4, Paragraph } from "@/components/common/Typography";
import type { SlideData } from "@/components/common/SwiperSlider/types";
import SwiperSliderOverlay from "@/components/common/SwiperSlider/SwiperSliderOverlay";

interface SwiperSliderBodyProps<T extends SlideData = SlideData> {
  slides?: T[];
  imageHeight?: number | "auto";
  isModalActive?: boolean;
  onSlideSelect?: (slide: T) => void;
  fullWidth?: boolean;
  showGradient?: boolean;
  titleClassName?: string;
  descriptionClassName?: string;
  showBottomButton?: boolean;
  activeOverlayIndex: number | null;
  onOverlayOpen: (index: number) => void;
  onOverlayClose: () => void;
  dominantColors: Record<string, string>;
}

const SwiperSliderBody = <T extends SlideData = SlideData>({
  slides,
  imageHeight,
  isModalActive,
  onSlideSelect,
  fullWidth = false,
  showGradient = true,
  titleClassName = "",
  descriptionClassName = "",
  showBottomButton = false,
  activeOverlayIndex,
  onOverlayOpen,
  onOverlayClose,
  dominantColors,
}: SwiperSliderBodyProps<T>) => {
  const { width } = useWindowSize();

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    const activeIndex = swiper.activeIndex;

    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.currentTime = 0;
          video.play().catch(() => {});
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
    <Container className="md:pr-0! md:mr-0! xxlg:px-0! max-w-[1400px]! xxlg:max-w-[1350px]! xxlg:mx-auto!">
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
              }
              
              `}
              style={
                typeof imageHeight === "number"
                  ? {
                      height: `${
                        width && width < 768 ? imageHeight * 0.65 : imageHeight
                      }px`,
                    }
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
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2.5">
                      <Heading4 className={`text-white ${titleClassName}`}>
                        {slide.title}
                      </Heading4>
                      {slide.description && (
                        <Paragraph
                          className={`text-white text-2xl! leading-8 !tracking-[0.48px]! ${descriptionClassName}`}
                        >
                          {slide.description}
                        </Paragraph>
                      )}
                    </div>
                    {showBottomButton && slide.overlay && (
                      <Button
                        type="button"
                        variant="outline"
                        className="text-white! bg-transparent! w-fit px-5! py-3.5!"
                        onClick={() => onOverlayOpen(index)}
                      >
                        Learn More
                      </Button>
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
              {activeOverlayIndex === index && slide.overlay && (
                <SwiperSliderOverlay
                  overlay={slide.overlay}
                  image={slide.image}
                  dominantColors={dominantColors}
                  onClose={onOverlayClose}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default SwiperSliderBody;
