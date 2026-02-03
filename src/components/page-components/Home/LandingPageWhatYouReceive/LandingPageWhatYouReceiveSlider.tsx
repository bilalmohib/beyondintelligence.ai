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
import { Paragraph } from "@/components/common/Typography";
import { SlideData } from "@/components/common/SwiperSlider";

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
    <div className="relative">
      <Container className="pr-0! mr-0! xxlg:px-0! max-w-[1400px]! xxlg:max-w-[1350px]! xxlg:mx-auto!">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={24}
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
                  className={`relative w-full rounded-[20px] overflow-hidden bg-[#C8BFFF]/30 ${
                    imageHeight === undefined
                      ? "aspect-[3/4]"
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
                      className="absolute inset-0 w-full h-full object-contain p-4"
                    />
                  ) : slide.image ? (
                    <Image
                      src={slide.image}
                      alt={slide.text}
                      fill
                      className="object-contain p-4"
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
                <div className="flex flex-col gap-3 pr-4">
                  <h3 className="text-white font-bold text-xl md:text-2xl leading-tight">
                    {slide.text}
                  </h3>
                  {slide.description && (
                    <Paragraph className="text-white/90 text-base! md:text-lg! leading-relaxed!">
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
