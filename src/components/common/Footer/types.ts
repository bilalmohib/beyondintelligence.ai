export interface IFooterItem {
  title: string;
  description?: string;
  link?: string;
  isExternal?: boolean;
}

export interface IFooterSection {
  title: string;
  items: IFooterItem[];
}
