"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { Heading5, Paragraph } from "@/components/common/Typography";
import {
  footerColumns,
  contactInfo,
} from "@/components/common/Footer/data";
import { IFooterSection } from "@/components/common/Footer/types";

const FooterSection = ({ section }: { section: IFooterSection }) => (
  <div className="flex flex-col gap-2.5">
    <Heading5 className="text-white! text-base! font-bold! leading-5!">
      {section.title}
    </Heading5>
    <div className="flex flex-col gap-1.5">
      {section.items.map((item) => (
        <div key={item.title} className="flex flex-col">
          <Paragraph className="text-white! text-sm! font-normal! leading-5!">
            {item.title}
          </Paragraph>
          {item.description && (
            <Paragraph className="text-white/50! text-xs! italic! leading-4!">
              {item.description}
            </Paragraph>
          )}
        </div>
      ))}
    </div>
  </div>
);

interface FooterItemsProps {
  className?: string;
}

const FooterItems = ({ className }: FooterItemsProps) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-8 ${className || ""}`}
    >
      {/* Columns 1-3 from data */}
      {footerColumns.map((column, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-6">
          {column.map((section, secIdx) => (
            <FooterSection key={secIdx} section={section} />
          ))}
        </div>
      ))}

      {/* Column 4: Get In Touch + Map */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3.5">
          <Heading5 className="text-white! text-base! font-bold! leading-5!">
            Get In Touch
          </Heading5>

          <div className="flex flex-col gap-3">
            {/* Address */}
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
              <Paragraph className="text-white! text-sm! font-normal! leading-5!">
                {contactInfo.address.line1}
                <br />
                {contactInfo.address.line2}
              </Paragraph>
            </div>

            {/* Phone */}
            <a
              href={contactInfo.phoneLink}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Phone className="w-4 h-4 text-white shrink-0" />
              <Paragraph className="text-white! text-sm! font-normal! leading-5!">
                {contactInfo.phone}
              </Paragraph>
            </a>

            {/* Email */}
            <a
              href={contactInfo.emailLink}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Mail className="w-4 h-4 text-white shrink-0" />
              <Paragraph className="text-white! text-sm! font-normal! leading-5!">
                {contactInfo.email}
              </Paragraph>
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-[140px] lg:h-[130px] rounded-lg overflow-hidden">
          <iframe
            src={contactInfo.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          />
        </div>
      </div>
    </div>
  );
};

export default FooterItems;
