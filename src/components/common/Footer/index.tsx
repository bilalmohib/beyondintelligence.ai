import Logo from "@/components/common/Navbar/Logo";
import Container from "@/components/common/Container";
import { Paragraph } from "@/components/common/Typography";
import FooterItems from "@/components/common/Footer/FooterItems";
import DarkModeToggle from "@/components/common/DarkModeToggle";

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
        <div className="pt-6 sm:pt-7 lg:pt-8 pb-6 sm:pb-7 lg:pb-9 flex flex-row justify-between">
          <Paragraph className="text-white text-base! font-normal! leading-6!">
            Beyond Intelligence © 2025
          </Paragraph>
          <DarkModeToggle />
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
