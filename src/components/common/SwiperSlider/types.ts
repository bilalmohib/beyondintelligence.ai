export interface SlideModalContent {
  title: string;
  description: string;
  bottomText: string;
}

export interface SlideButtonOverlay {
  title: string;
  paragraphs: string[];
}

// Image and video are optional (e.g. for quote-only slides)
export type SlideData = {
  title: string;
  subTitle?: string;
  description?: string;
  modalContent?: object;
  learnMoreRedirectUrl?: string;
  overlay?: SlideButtonOverlay;
  image?: string;
  video?: string;
};

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
  textSlider?: boolean;
}
