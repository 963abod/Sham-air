import type { Metadata } from "next";
import { Alexandria, IBM_Plex_Sans_Arabic, Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  weight: ["300", "500", "700"],
  display: "swap",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ibm-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SHAM AIR (شام للطيران) | From Damascus, To The World",
  description: "The definitive ultra-luxury digital aviation experience from Damascus to the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${alexandria.variable} ${ibmPlexArabic.variable} ${cormorant.variable} ${manrope.variable} antialiased bg-sham-dark text-sham-ivory selection:bg-sham-brass selection:text-sham-dark`}
      >
        {children}
      </body>
    </html>
  );
}
