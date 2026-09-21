import type { Metadata } from "next";
import { Anton, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { InquiryProvider } from "@/context/InquiryContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InquiryDrawer } from "@/components/inquiry/InquiryDrawer";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parashar Lighting | Detailed Technical Architecture & Website",
  description:
    "Luxury architectural lighting atelier specializing in hand-burnished solid brass luminaires, mouth-blown glass flutes, and bespoke spatial installations.",
  keywords: [
    "Parashar Lighting",
    "Architectural Lighting",
    "Luxury Lighting",
    "Brass Luminaires",
    "Pendant Lights",
    "Chandeliers",
    "Sconces",
    "Jaipur Atelier",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${anton.variable} ${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body
        className="bg-brand-canvas text-brand-charcoal flex flex-col min-h-screen font-sans"
        suppressHydrationWarning
      >
        <InquiryProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <InquiryDrawer />
          <Footer />
        </InquiryProvider>
      </body>
    </html>
  );
}
