'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { PlusIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Navigation } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from '@/components/common/Container';
import { Heading4 } from '@/components/common/Typography';
import { openModal } from '@/redux/slices/modalSlice';
import type { AppDispatch } from '@/redux/store';

export interface SlideModalContent {
    title: string;
    description: string;
    bottomText: string;
}

interface BaseSlideData {
    image: string;
    text: string;
    modalContent?: object;
}

interface SwiperSliderProps<T extends BaseSlideData = BaseSlideData> {
    slides?: T[];
    isModalActive?: boolean;
    onSlideSelect?: (slide: T) => void;
}

const defaultSlides: BaseSlideData[] = [
    {
        image: '/assets/pages/landing/images/LandingPageSliderAsthmaFeelsUnpredictableSection/photo_001.jpg',
        text: 'Their breathing changed so suddenly.',
    },
    {
        image: '/assets/pages/landing/images/LandingPageSliderAsthmaFeelsUnpredictableSection/photo_002.jpg',
        text: 'He was fine this morning.',
    },
    {
        image: '/assets/pages/landing/images/LandingPageSliderAsthmaFeelsUnpredictableSection/photo_003.jpg',
        text: 'It just came out of nowhere.',
    }
];

const SwiperSlider = <T extends BaseSlideData = BaseSlideData>({ slides = defaultSlides as T[], isModalActive = false, onSlideSelect }: SwiperSliderProps<T>) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleOpenModal = (slide: T) => {
        if (slide.modalContent) {
            if (onSlideSelect) {
                onSlideSelect(slide);
            } else {
                const modalContent = slide.modalContent as unknown as Record<string, unknown>;
                dispatch(
                    openModal({
                        ...modalContent,
                        image: modalContent.image ?? slide.image,
                    } as Parameters<typeof openModal>[0])
                );
            }
        }
    };

    return (
        <div className="relative">
            <Container className="pr-0! mr-0! xxlg:px-0! max-w-[1400px]! xxlg:max-w-[1350px]! xxlg:mx-auto!">
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={40}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    modules={[Navigation]}
                    className="pb-4!"
                    breakpoints={{
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
                    }}
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative w-full aspect-4/3 rounded-[20px] overflow-hidden">
                                <Image
                                    src={slide.image}
                                    alt={slide.text}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12.5">
                                    <div className='flex flex-row justify-between items-center'>
                                        <Heading4 className="text-white">
                                            {slide.text}
                                        </Heading4>
                                        {isModalActive && slide.modalContent && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="text-white! hover:text-white! rounded-full! w-15 h-15 bg-primary! border-primary!"
                                                onClick={() => handleOpenModal(slide)}
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