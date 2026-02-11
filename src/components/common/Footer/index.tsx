"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { BsLinkedin } from "react-icons/bs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Container from "@/components/common/Container";
import { Paragraph } from "@/components/common/Typography";
import FooterItems from "@/components/common/Footer/FooterItems";
import { bottomLinks, socialLinks } from "@/components/common/Footer/data";
import ComingSoonModal from "@/components/common/Navbar/ComingSoonModal";

interface FooterProps {
  className?: string;
}

const FooterLogo = () => {
  const router = useRouter();
  return (
    <p
      className="cursor-pointer font-inter text-[21px] text-white font-bold leading-[100%] tracking-[0.09em]"
      onClick={() => router.push("/")}
    >
      <span className="sm:hidden">Beyond Intelligence</span>
      <span className="hidden sm:inline">
        Beyond <br /> Intelligence
      </span>
    </p>
  );
};

const Footer = ({ className }: FooterProps) => {
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
      <footer
        className={`w-full bg-lightGray2 transition-all duration-200 ${
          className || ""
        }`}
      >
      <Container>
        {/* Header: Logo + Help Center */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start pt-10 md:pt-12 mlg:pt-18 lg:pt-24 xl:pt-30 pb-6 sm:pb-8 mlg:pb-12 lg:pb-15">
          <FooterLogo />
          {/* Help Center — desktop/tablet only */}
          <Button
            variant="outline"
            onClick={() => handleComingSoonClick("Help Center")}
            className="hidden sm:inline-flex border-white/30! text-white! bg-transparent! hover:bg-white/10! rounded-lg! px-5! py-2.5! gap-2! text-sm! font-medium! cursor-pointer!"
          >
            <Globe className="w-4 h-4" />
            Help Center
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="pb-8 lg:pb-14">
          <FooterItems />
        </div>

        {/* Help Center — mobile only */}
        <div className="flex sm:hidden justify-center pb-8">
          <Button
            variant="outline"
            onClick={() => handleComingSoonClick("Help Center")}
            className="border-white/30! text-white! bg-transparent! hover:bg-white/10! rounded-lg! px-8! py-4! gap-2! w-full! text-base! font-medium! cursor-pointer!"
          >
            <Globe className="w-5 h-5" />
            Help Center
          </Button>
        </div>
      </Container>

      {/* Bottom Bar */}
      <Container>
        <div className="border-t border-[#7C81E8] py-6 lg:py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <Paragraph className="text-white! text-sm! font-normal! leading-5! text-center! md:text-left!">
            Copyright 2026. Beyond Intelligence.{" "}
            <span className="sm:inline">All rights reserved.</span>
          </Paragraph>

          {/* Policy Links + Social */}
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-2 text-sm">
            {bottomLinks.map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="text-white hover:text-primary transition-colors text-sm"
              >
                {link.title}
              </Link>
            ))}
            <span className="text-white">|</span>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors"
            >
              <BsLinkedin size={16} />
            </a>
          </div>
        </div>
      </Container>
    </footer>

    <ComingSoonModal
      open={comingSoonOpen}
      onOpenChange={setComingSoonOpen}
      productTitle={comingSoonProductTitle}
    />
    </>
  );
};

export default Footer;
