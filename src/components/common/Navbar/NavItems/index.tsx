"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Globe,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  menuItems,
  productCategories,
} from "@/components/common/Navbar/NavItems/data";

interface NavItemsProps {
  isNavTransparent?: boolean;
}

const NavItems = ({ isNavTransparent }: NavItemsProps) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [menuTop, setMenuTop] = useState(0);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuTop(rect.bottom + 6);
    }
    setIsProductsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false);
    }, 150);
  }, []);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="gap-2 xl:gap-6 xl:flex-row flex-col">
          {menuItems.map((item) => (
            <NavigationMenuItem key={item.title}>
              {item.hasDropdown ? (
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    ref={triggerRef}
                    className={cn(
                      "group inline-flex h-9 items-center justify-center gap-1 rounded-md px-4 py-2 text-base font-normal leading-none tracking-[0.09em] text-white font-inter cursor-pointer",
                      isNavTransparent
                        ? "bg-transparent hover:bg-transparent"
                        : "bg-background hover:bg-background"
                    )}
                  >
                    {item.title}
                    <ChevronDown
                      className={cn(
                        "relative top-px ml-1 size-3 transition duration-300",
                        isProductsOpen && "rotate-180"
                      )}
                    />
                  </button>
                </div>
              ) : (
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isNavTransparent
                      ? "bg-transparent! hover:bg-transparent! hover:text-white!"
                      : "bg-background hover:bg-transparent hover:text-primary"
                  )}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "font-inter! text-base! font-normal leading-none tracking-[0.09em] text-white! transition-colors! duration-200",
                      isNavTransparent
                        ? "hover:text-white!"
                        : "hover:text-primary!"
                    )}
                  >
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Full-width Mega Menu — fixed to viewport, container-constrained */}
      <div
        className={cn(
          "fixed left-1/2 -translate-x-1/2 z-50 w-full max-w-[1350px] px-6 sm:px-8 lg:px-10 xxlg:px-6 xlg:px-0 xl:px-12 transition-all duration-200",
          isProductsOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
        style={{ top: menuTop }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="bg-[#0d0d23] border border-white/10 rounded-[20px] overflow-hidden shadow-2xl p-8">
          <div className="flex min-h-[300px]">
            {/* Left: Category tabs */}
            <div className="shrink-0 pr-5 flex flex-col gap-3">
              {productCategories.map((category, idx) => (
                <button
                  key={category.title}
                  onMouseEnter={() => setActiveCategory(idx)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-5 py-5 text-left transition-all font-semibold cursor-pointer whitespace-nowrap",
                    activeCategory === idx
                      ? "bg-white text-gray-900"
                      : "bg-transparent text-white hover:bg-white/5"
                  )}
                >
                  <span className="text-base leading-5">
                    {category.title}
                  </span>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 shrink-0 ml-4",
                      activeCategory === idx
                        ? "text-gray-500"
                        : "text-white/50"
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Middle: Product items */}
            <div className="flex-1 px-5 flex flex-col gap-2.5">
              {productCategories[activeCategory].items.map((product) => (
                <Link
                  key={product.title}
                  href={product.href}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/3 px-5 py-4 text-white text-sm leading-5 hover:bg-white/8 transition-colors group"
                >
                  <span>{product.title}</span>
                  <ChevronRight className="w-4 h-4 text-white/30 shrink-0 ml-4 group-hover:text-white/60 transition-colors" />
                </Link>
              ))}
            </div>

            {/* Right: Get In Touch + Help Center */}
            <div className="w-[240px] shrink-0 pl-5 flex flex-col justify-between">
              <div>
                <p className="text-white font-bold text-base mb-4">
                  Get In Touch
                </p>

                <div className="flex flex-col gap-3.5">
                {/* Address */}
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <p className="text-white text-sm leading-5">
                    1111 Brickell Avenue, 10th Floor
                    <br />
                    Miami, Florida 33131, United States
                  </p>
                </div>

                {/* Phone */}
                <a
                  href="tel:+17863053491"
                  className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                >
                  <Phone className="w-4 h-4 text-white shrink-0" />
                  <p className="text-white text-sm leading-5">
                    +1 (786) 305-3491
                  </p>
                </a>

                {/* Email */}
                <a
                  href="mailto:contact@beyondintelligence.ai"
                  className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                >
                  <Mail className="w-4 h-4 text-white shrink-0" />
                  <p className="text-white text-sm leading-5">
                    contact@beyondintelligence.ai
                  </p>
                </a>
                </div>
              </div>

              {/* Help Center Button */}
              <Button
                variant="outline"
                className="border-white/30! text-white! bg-transparent! hover:bg-white/10! rounded-lg! px-4! py-2.5! gap-2! text-sm! font-medium! cursor-pointer! w-full!"
              >
                <Globe className="w-4 h-4" />
                Help Center
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavItems;
