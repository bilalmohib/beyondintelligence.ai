export interface SlideModalContent {
  title: string;
  description: string;
  bottomText: string;
}

export interface SlideButtonOverlay {
  title: string;
  paragraphs: string[];
}

// Either image or video is required
export type SlideData = {
  title: string;
  subTitle?: string;
  description?: string;
  modalContent?: object;
  learnMoreRedirectUrl?: string;
  overlay?: SlideButtonOverlay;
} & (
  | { image: string; video?: never }
  | { video: string; image?: never }
  | { image: string; video: string }
);

export interface SwiperSliderProps<T extends SlideData = SlideData> {
  slides?: T[];
  imageHeight?: number | "auto";
  isModalActive?: boolean;
  onSlideSelect?: (slide: T) => void;
  fullWidth?: boolean;
  showGradient?: boolean;
  titleClassName?: string;
  descriptionClassName?: string;
  showBottomButton?: boolean;
}
