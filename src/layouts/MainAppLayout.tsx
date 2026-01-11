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
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== "undefined") {
      return window.scrollY > 0;
    }
    return false;
  });

  const navTransparentRoutes = ["/signup/start"];
  const isNavTransparent = navTransparentRoutes.includes(pathname);
  const shouldBeTransparent = isNavTransparent && !isScrolled;

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

  if (AUTH_ROUTES.includes(pathname)) {
    return <div className="relative z-10">{children}</div>;
  }

  return (
    <div>
      <ScrollRestoration />
      <div
        className={cn("top-0 z-50 w-full", {
          "absolute left-0 right-0": shouldBeTransparent,
          sticky: !shouldBeTransparent,
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
