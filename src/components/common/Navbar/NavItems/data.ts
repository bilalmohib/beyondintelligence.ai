import { BiSearch } from "react-icons/bi";
import { AiOutlineRobot } from "react-icons/ai";

export const menuItems = [
  {
    title: "Insight",
    href: "/insights",
    hasDropdown: false,
  },
  {
    title: "Products",
    href: "/products",
    hasDropdown: true,
    items: [
      {
        title: "Intelligent Agent",
        href: "/products/intelligent-agent",
        description: "Automate your workflows with intelligence.",
        icon: AiOutlineRobot,
      },
      {
        title: "Cognitive Search",
        href: "/products/cognitive-search",
        description: "Search with intelligence.",
        icon: BiSearch,
      },
    ],
  },
  {
    title: "Press",
    href: "/press",
    hasDropdown: false,
  },
  {
    title: "Keynote",
    href: "/keynote",
    hasDropdown: false,
  },
  {
    title: "About",
    href: "/about",
    hasDropdown: false,
  },
  {
    title: "Contact",
    href: "/contact",
    hasDropdown: false,
  },
];
