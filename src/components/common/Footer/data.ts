import { IFooterItems } from "@/components/common/Footer/types";
import { BsLinkedin } from "react-icons/bs";

export const socialMediaIcons = [
  {
    title: "LinkedIn",
    image: "/Images/Sections/Home/Footer/linkedin.png",
    link: " https://www.linkedin.com/company/smartlyq/",
  },
];

export const footerItems: IFooterItems[] = [
  {
    title: "Quick Links",
    items: [
      {
        title: "Home",
        link: "/",
      },
      {
        title: "About Us",
        link: "/about",
      },
      {
        title: "Blog",
        link: "/blog",
      },
      {
        title: "Contact",
        link: "/contact",
      },
      {
        title: "Press",
        link: "/press",
      },
      {
        title: "Keynote",
        link: "/keynote",
      },
      {
        title: "FAQs",
        link: "/faqs",
      },
    ],
  },
  {
    title: "Contact Us",
    items: [
      {
        title: "Phone",
        value: "+1 (234) 567-890",
        link: "tel:+1234567890",
      },
      {
        title: "Email",
        value: "support@beyondhealth.ai",
        link: "mailto:support@beyondhealth.ai",
      },
      {
        title: "Social",
        value: BsLinkedin,
        isIconOnly: true,
        link: "https://www.linkedin.com/company/beyondhealth.ai/",
      },
    ],
  },
  {
    title: "Information",
    items: [
      {
        title: "Privacy Statement",
        link: "/privacy",
      },
      {
        title: "Policy",
        link: "/policy",
      },
    ],
  },
];
