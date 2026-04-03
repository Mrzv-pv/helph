import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "HELPH — Tržnica strokovnih storitev",
  description:
    "Poiščite preverjene strokovnjake: odvetniki, svetovalci, oblikovalci, finančniki. Varne transakcije in pregledne ocene.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sl"
      className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
