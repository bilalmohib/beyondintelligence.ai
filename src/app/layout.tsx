import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import MainAppLayout from "@/layouts/MainAppLayout";

import "@/app/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beyond Intelligence",
  description: "Beyond Intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
      <Providers>
          <MainAppLayout>{children}</MainAppLayout>
        </Providers>
      </body>
    </html>
  );
}
