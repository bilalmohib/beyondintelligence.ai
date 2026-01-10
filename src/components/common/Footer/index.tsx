import Link from "next/link";
import Image from "next/image";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Navbar/Logo";
import FooterItems from "@/components/common/Footer/FooterItems";
import { socialMediaIcons } from "@/components/common/Footer/data";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer
      className={`w-full bg-lightGray2 transition-all duration-200 ${className}`}
    >
      <Container>
        <div className="border-b border-[#C7C7C7] border-solid">
          <div className="w-full flex flex-col items-center pt-12 sm:pt-14 lg:pt-16">
            <div className="w-full flex justify-start">
              <Logo />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between py-8 sm:py-10 lg:py-16 gap-8 lg:gap-0">
            <div className="w-full">
              <FooterItems />
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className="pt-6 sm:pt-7 lg:pt-8 pb-6 sm:pb-7 lg:pb-9">
          <p className="w-full text-center text-white text-sm sm:text-base leading-4.75 font-inter font-normal">
            Copyright 2025 © .com Created by{" "}
            <Link
              href="https://web-net.com/"
              className="text-primary hover:underline"
            >
              Beyond Intelligence
            </Link>{" "}
            all rights reserved
          </p>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
