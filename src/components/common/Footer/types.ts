export interface IFooterItems {
    title: string;
    items: {
      title: string;
      link?: string;
      value?: string | React.ElementType;
      isIconOnly?: boolean;
      isExternal?: boolean;
    }[]
  }