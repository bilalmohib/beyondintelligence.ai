"use client";

import { X } from "lucide-react";
import { useState } from "react";
import Logo from "@/components/common/Navbar/Logo";
import Container from "@/components/common/Container";
import NavItems from "@/components/common/Navbar/NavItems";
import MobileNavItems from "@/components/common/Navbar/NavItems/MobileNavItems";

interface NavbarProps {
  className?: string;
  isNavTransparent?: boolean;
}

function Navbar({ className, isNavTransparent }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className={`w-full transition-all duration-200 ${
        !isNavTransparent ? "shadow-md" : ""
      } ${isNavTransparent ? "bg-transparent" : "bg-background"} ${className}`}
    >
      <Container>
        <div className="flex justify-between items-center py-4">
          <div>
            <Logo onClick={() => setIsMobileMenuOpen(false)} />
          </div>

          <div className="hidden xl:block">
            <NavItems isNavTransparent={isNavTransparent} />
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden">
            <div className="flex flex-row gap-6">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center p-2 rounded-md text-white hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-200"
              >
                <span className="sr-only">Open main menu</span>
                <div className="relative w-9 h-6">
                  {isMobileMenuOpen ? (
                    <X className="block scale-140 h-7.5 w-7.5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-in fade-in zoom-in duration-200" />
                  ) : (
                    <svg
                      width="37"
                      height="25"
                      viewBox="0 0 37 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-in fade-in zoom-in duration-200"
                    >
                      <path
                        d="M0.125 24.75H36.875V20.6667H0.125V24.75ZM0.125 14.5417H36.875V10.4583H0.125V14.5417ZM0.125 0.25V4.33333H36.875V0.25H0.125Z"
                        fill="white"
                      />
                    </svg>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile menu with smooth animation */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Container>
          <div className="bg-transparent border-b border-t border-x-0 border-b-gray-800 border-t-gray-800 border-solid">
            <div
              className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 transform transition-all duration-300 ease-out ${
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? "100ms" : "0ms",
              }}
            >
              <div className="flex flex-col py-4">
                <MobileNavItems
                  onLinkClick={() => setIsMobileMenuOpen(false)}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </nav>
  );
}

export default Navbar;
