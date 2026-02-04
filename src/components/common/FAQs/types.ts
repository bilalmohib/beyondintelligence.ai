export interface IFAQsItem {
  id: number;
  question: string;
  answer: string;
}

export interface IFAQs {
  faqsList: IFAQsItem[];
}
