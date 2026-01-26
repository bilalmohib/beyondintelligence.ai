"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { AUTH_ROUTES } from "@/lib/constants";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useState, useEffect, useLayoutEffect } from "react";
import ScrollRestoration from "@/components/common/ScrollRestoration";

const MainAppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = pathname === "/";
  const navTransparentRoutes = ["/", "/signup/start"];
  const isNavTransparent = navTransparentRoutes.includes(pathname);
  const shouldBeTransparent = isNavTransparent && !isScrolled;

  const noLayoutRoutes = [
    "/landing-transitions1",
    "/landing-transitions2",
    "/landing-transition1",
    "/landing-transition2",
  ];

  useLayoutEffect(() => {
    setIsScrolled(window.scrollY > 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        className={cn("top-0 z-50 w-full transition-[padding] duration-300", {
          "absolute left-0 right-0": shouldBeTransparent,
          sticky: !shouldBeTransparent,
          "pt-5": isHomePage && !isScrolled,
        })}
      >
        <Navbar isNavTransparent={shouldBeTransparent} />
      </div>

      <div className="relative z-10 overflow-x-hidden!">{children}</div>

      <Footer />
    </div>
  );
};

export default MainAppLayout;
