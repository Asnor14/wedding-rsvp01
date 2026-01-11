import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Brianna & Gabriel | December 31, 2025",
  description: "Join us in celebrating our love. We can't wait to share this special day with you.",
  openGraph: {
    title: "Brianna & Gabriel | Wedding Celebration",
    description: "Join us in celebrating our love. December 31, 2025.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorantGaramond.variable} ${playfairDisplay.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
