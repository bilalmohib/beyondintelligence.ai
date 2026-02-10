"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapIcon, PhoneIcon, MailIcon } from "@/components/icons";
import { IFooterSection } from "@/components/common/Footer/types";
import { Heading5, Paragraph } from "@/components/common/Typography";
import { footerColumns, contactInfo } from "@/components/common/Footer/data";
import ComingSoonModal from "@/components/common/Navbar/ComingSoonModal";

const FooterSection = ({
  section,
  onComingSoonClick,
}: {
  section: IFooterSection;
  onComingSoonClick: (title: string) => void;
}): React.JSX.Element => (
  <div className="flex flex-col gap-4">
    <Heading5 className="text-white! text-base! font-bold! leading-5!">
      {section.title}
    </Heading5>
    <div className="flex flex-col gap-2">
      {section.items.map((item) => (
        <div key={item.title} className="flex flex-col">
          {item.link ? (
            item.isExternal ? (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80 transition-opacity w-fit cursor-pointer"
              >
                <Paragraph className="text-white! text-sm! font-normal! leading-5!">
                  {item.title}
                </Paragraph>
              </a>
            ) : (
              <Link
                href={item.link}
                className="hover:opacity-80 transition-opacity w-fit cursor-pointer"
              >
                <Paragraph className="text-white! text-sm! font-normal! leading-5!">
                  {item.title}
                </Paragraph>
              </Link>
            )
          ) : (
            <button
              type="button"
              onClick={() => onComingSoonClick(item.title)}
              className="text-left hover:opacity-80 transition-opacity w-fit cursor-pointer"
            >
              <Paragraph className="text-white! text-sm! font-normal! leading-5!">
                {item.title}
              </Paragraph>
            </button>
          )}
          {item.description && (
            <Paragraph className="text-white! text-xs! italic! leading-5!">
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
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonProductTitle, setComingSoonProductTitle] = useState<
    string | undefined
  >(undefined);

  const handleComingSoonClick = (title: string) => {
    setComingSoonProductTitle(title);
    setComingSoonOpen(true);
  };

  return (
    <>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 xl:gap-8 ${
          className || ""
        }`}
      >
        {/* Columns 1-3 from data */}
        {footerColumns.map((column, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-8">
            {column.map((section, secIdx) => (
              <FooterSection
                key={secIdx}
                section={section}
                onComingSoonClick={handleComingSoonClick}
              />
            ))}
          </div>
        ))}

        {/* Column 4: Get In Touch + Map */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Heading5 className="text-white! text-base! font-bold! leading-5!">
              Get In Touch
            </Heading5>

            <div className="flex flex-col gap-2">
              {/* Address */}
              <div className="flex items-start gap-2">
                <MapIcon className="w-auto h-auto text-white shrink-0 mt-0.5" />
                <Paragraph className="text-white! text-sm! font-normal! leading-5!">
                  {contactInfo.address.line1}
                  <br />
                  {contactInfo.address.line2}
                </Paragraph>
              </div>

              {/* Phone */}
              <a
                href={contactInfo.phoneLink}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <PhoneIcon className="w-auto h-auto text-white shrink-0" />
                </div>
                <Paragraph className="text-white! text-sm! font-normal! leading-5!">
                  {contactInfo.phone}
                </Paragraph>
              </a>

              {/* Email */}
              <a
                href={contactInfo.emailLink}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <MailIcon className="w-auto h-auto text-white shrink-0" />
                </div>
                <Paragraph className="text-white! text-sm! font-normal! leading-5!">
                  {contactInfo.email}
                </Paragraph>
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="w-full h-40 lg:h-57 rounded-lg overflow-hidden">
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
      <ComingSoonModal
        open={comingSoonOpen}
        onOpenChange={setComingSoonOpen}
        productTitle={comingSoonProductTitle}
      />
    </>
  );
};

export default FooterItems;
