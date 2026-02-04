"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { AUTH_ROUTES } from "@/lib/constants";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import React, { useState, useEffect, useLayoutEffect } from "react";
import ScrollRestoration from "@/components/common/ScrollRestoration";

const SCROLL_STOP_DELAY = 1000;

const MainAppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const scrollTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const isHomePage = pathname === "/";
  const navTransparentRoutes = ["/", "/signup/start"];
  const isNavTransparent = navTransparentRoutes.includes(pathname);
  const shouldBeTransparent = isNavTransparent && !isScrolled;

  const noLayoutRoutes = [
    "/landing-transitions1",
  ];

  useLayoutEffect(() => {
    setIsScrolled(window.scrollY > 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      setIsNavbarVisible(false);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsNavbarVisible(true);
        scrollTimeoutRef.current = null;
      }, SCROLL_STOP_DELAY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const normalizedPathname = pathname.replace(/\/$/, "") || "/";
  
  const shouldSkipLayout = 
    AUTH_ROUTES.includes(normalizedPathname) || 
    noLayoutRoutes.includes(normalizedPathname) ||
    noLayoutRoutes.some(route => normalizedPathname.startsWith(`${route}/`));

  if (shouldSkipLayout) {
    return <>{children}</>;
  }

  return (
    <div>
      <ScrollRestoration />
      <div
        className={cn("top-0 z-50 w-full", {
          "absolute left-0 right-0": shouldBeTransparent,
          sticky: !shouldBeTransparent,
          "pt-5": isHomePage && !isScrolled,
        })}
      >
        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            isNavbarVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full pointer-events-none"
          )}
        >
          <Navbar isNavTransparent={shouldBeTransparent} />
        </div>
      </div>

      <div className="relative z-10 overflow-x-hidden!">{children}</div>

      <Footer />
    </div>
  );
};

export default MainAppLayout;
