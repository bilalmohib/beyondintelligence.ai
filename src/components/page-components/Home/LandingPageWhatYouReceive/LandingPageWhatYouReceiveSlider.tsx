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
          breakpoints={{
            320: {
              slidesPerView: 1.05,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
          }}
        >
          {slides?.map((slide: SlideData, index: number) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col gap-6">
                {/* Image Card */}
                <div
                  className="relative w-full rounded-[20px] overflow-hidden bg-white-smoke flex items-center justify-center"
                  style={{
                    height:
                      typeof imageHeight === "number"
                        ? `${imageHeight}px`
                        : undefined,
                    aspectRatio:
                      imageHeight === undefined
                        ? "3/4"
                        : imageHeight === "auto"
                        ? "auto"
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
                      className="w-auto h-[95%] max-w-[90%] object-contain"
                    />
                  ) : slide.image ? (
                    <div className="relative w-[348px] h-[95%] pt-5">
                      <Image
                        src={slide.image}
                        alt={slide.text}
                        width={348}
                        height={800}
                        className="w-[348px] h-full object-contain"
                      />
                    </div>
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
                <div className="flex flex-col gap-3 pr-4">
                  <Heading5 className="text-white text-2xl leading-tight">
                    {slide.text}
                  </Heading5>
                  {slide.description && (
                    <Paragraph className="text-white! leading-7!">
                      {slide.description}
                    </Paragraph>
                  )}
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

export default LandingPageWhatYouReceiveSlider;
