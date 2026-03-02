import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IoT Query — Telematics Intelligence Platform",
  description:
    "IoT Query gives you direct access to unified telematics and business data in a secure, single-tenant environment — so you can deliver advanced analytics.",
  keywords: ["telematics", "IoT", "fleet analytics", "SQL", "dashboard", "business intelligence"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased grid-bg noise-overlay`}
        suppressHydrationWarning
      >
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
