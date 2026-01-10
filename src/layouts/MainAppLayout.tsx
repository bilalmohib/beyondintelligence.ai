"use client";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AUTH_ROUTES } from "@/lib/constants";
import Navbar from "@/components/common/Navbar";
import ScrollRestoration from "@/components/common/ScrollRestoration";

const Footer = dynamic(() => import("@/components/common/Footer"), {
  ssr: false,
  loading: () => null,
});

const MainAppLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  if (AUTH_ROUTES.includes(pathname)) {
    return <div className="relative z-10">{children}</div>;
  }

  return (
    <div>
      <ScrollRestoration />
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="relative z-10 !overflow-x-hidden">{children}</div>

      <Footer />
    </div>
  );
};
export default MainAppLayout;
