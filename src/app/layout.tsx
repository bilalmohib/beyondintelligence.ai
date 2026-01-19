import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import MainAppLayout from "@/layouts/MainAppLayout";
import { ThemeProvider } from "@/components/theme-provider";
import "@/app/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beyond Intelligence",
  description: "Beyond Intelligence",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <MainAppLayout>{children}</MainAppLayout>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
export default RootLayout;
