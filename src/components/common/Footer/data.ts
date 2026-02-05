import { IFooterSection } from "@/components/common/Footer/types";

export const footerColumns: IFooterSection[][] = [
  // Column 1
  [
    {
      title: "Products — Organizations",
      items: [
        {
          title: "ATLAS — Capital Governance Layer",
          description: "(ILS / Sovereign Wealth Funds / Pensions)",
        },
        {
          title: "ATLAS — Parametric Engine",
          description: "(Parametric Insurance)",
        },
        {
          title: "ATLAS — Catastrophe Governance Layer",
          description: "(E&S / Catastrophe Risk)",
        },
        {
          title: "ATLAS — Environmental Burden Score",
          description: "(Health Insurance)",
        },
        {
          title: "Satori — Pediatric Environmental Risk Intelligence",
          description: "(Healthcare Systems / Pediatric Care)",
        },
      ],
    },
    {
      title: "Products — Individuals",
      items: [
        { title: "Satori — For Childhood Asthma & Allergies" },
      ],
    },
  ],
  // Column 2
  [
    {
      title: "Organizational Engagement",
      items: [
        { title: "Request a Validation" },
        { title: "Speak with an Expert" },
      ],
    },
    {
      title: "Trust & Governance",
      items: [{ title: "Trust Center" }],
    },
  ],
  // Column 3
  [
    {
      title: "Thought Leadership",
      items: [
        { title: "Insights" },
        { title: "Press" },
        { title: "Speaking" },
      ],
    },
    {
      title: "Company",
      items: [
        { title: "About" },
        { title: "Careers" },
      ],
    },
  ],
];

export const contactInfo = {
  address: {
    line1: "1111 Brickell Avenue, 10th Floor",
    line2: "Miami, Florida 33131, United States",
  },
  phone: "+1 (786) 305-3491",
  phoneLink: "tel:+17863053491",
  email: "contact@beyondintelligence.ai",
  emailLink: "mailto:contact@beyondintelligence.ai",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=1111+Brickell+Avenue,+Miami,+FL+33131&t=&z=15&ie=UTF8&iwloc=&output=embed",
};

export const bottomLinks = [
  { title: "Privacy Policy", link: "/privacy-policy" },
  { title: "Terms of Use", link: "/terms-of-use" },
  { title: "Cookie Policy", link: "/cookie-policy" },
  { title: "Accessibility", link: "/accessibility" },
];

export const socialLinks = {
  linkedin: "https://www.linkedin.com/company/beyond-intelligence/",
};
