"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { AUTH_ROUTES } from "@/lib/constants";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import React from "react";
import ScrollRestoration from "@/components/common/ScrollRestoration";
import { NavbarProvider } from "@/contexts/NavbarContext";

const MainAppLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const navTransparentRoutes = ["/", "/signup/start"];
  const isNavTransparent = navTransparentRoutes.includes(pathname);

  const noLayoutRoutes = [
    "/landing-transitions1",
  ];

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
      <div className={cn("w-full z-50", {
        "absolute left-0 right-0": isNavTransparent,
        "pt-5": isHomePage,
      })}>
        <Navbar isNavTransparent={isNavTransparent} />
      </div>

      <div className="relative z-10" style={{ overflowX: "clip" }}>{children}</div>

      <Footer />
    </div>
  );
};

const MainAppLayout = ({ children }: { children: React.ReactNode }) => (
  <NavbarProvider>
    <MainAppLayoutContent>{children}</MainAppLayoutContent>
  </NavbarProvider>
);

export default MainAppLayout;
