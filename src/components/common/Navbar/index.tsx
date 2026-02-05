"use client";

import { X, Globe } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
      } ${isNavTransparent && !isMobileMenuOpen ? "bg-transparent" : ""} ${
        isMobileMenuOpen ? "bg-background" : !isNavTransparent ? "bg-background" : ""
      } ${className}`}
    >
      <Container>
        <div className="flex justify-between items-center py-4">
          <div>
            <Logo onClick={() => setIsMobileMenuOpen(false)} />
          </div>

          <div className="hidden xl:block">
            <NavItems isNavTransparent={isNavTransparent} />
          </div>

          {/* Mobile/Tablet menu button */}
          <div className="xl:hidden">
            <div className="flex flex-row items-center gap-3">
              {/* Help Center — shown when menu is open */}
              {isMobileMenuOpen && (
                <Button
                  variant="outline"
                  className="border-white/30! text-white! bg-transparent! hover:bg-white/10! rounded-lg! px-4! py-2! gap-2! text-sm! font-medium! cursor-pointer!"
                >
                  <Globe className="w-4 h-4" />
                  Help Center
                </Button>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center p-2 rounded-md text-white focus:outline-none transition-all duration-200"
              >
                <span className="sr-only">Open main menu</span>
                <div className="relative w-9 h-6">
                  {isMobileMenuOpen ? (
                    <X className="block h-6 w-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-in fade-in zoom-in duration-200" />
                  ) : (
                    <div className="rounded-md bg-white/5 shadow-[0_1px_2px_0_rgba(16,24,40,0.08)]">
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
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile/Tablet menu */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-[calc(100vh-80px)] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="bg-background overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 80px)" }}
        >
          <Container>
            <div
              className={`pb-6 pt-2 transform transition-all duration-300 ease-out ${
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-4 opacity-0"
              }`}
              style={{
                transitionDelay: isMobileMenuOpen ? "100ms" : "0ms",
              }}
            >
              <MobileNavItems
                onLinkClick={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </Container>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
