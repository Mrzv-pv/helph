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
    "HELPH is a professional services marketplace. Find verified specialists: lawyers, consultants, designers, financiers. Secure transactions, transparent reviews, guaranteed quality. Available in Slovenian, English, Russian, and German.",
  keywords: ["marketplace", "specialists", "lawyers", "designers", "consultants", "HELPH", "Slovenia"],
  openGraph: {
    title: "HELPH — Professional Services Marketplace",
    description: "Find verified specialists: lawyers, consultants, designers, financiers. Secure transactions, transparent reviews, guaranteed quality.",
    url: "https://helph.vercel.app",
    siteName: "HELPH",
    locale: "sl_SI",
    type: "website",
  },
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
        <noscript>
          <div style={{padding: "2rem", maxWidth: "800px", margin: "0 auto"}}>
            <h1>HELPH — Professional Services Marketplace</h1>
            <p>Find verified specialists: lawyers, financial advisors, designers, marketers, IT developers, consultants, translators, and more.</p>
            <h2>Features</h2>
            <ul>
              <li>2500+ verified specialists</li>
              <li>12000+ completed projects</li>
              <li>4.8 average rating</li>
              <li>Secure transactions through the platform</li>
              <li>Available in Slovenian, English, Russian, and German</li>
            </ul>
            <h2>Categories</h2>
            <ul>
              <li>Law — 234 specialists</li>
              <li>Finance &amp; Accounting — 189 specialists</li>
              <li>Design — 312 specialists</li>
              <li>Marketing — 156 specialists</li>
              <li>IT &amp; Development — 278 specialists</li>
              <li>Consulting — 98 specialists</li>
              <li>HR &amp; Recruitment — 67 specialists</li>
              <li>Translation — 145 specialists</li>
            </ul>
            <h2>How it works</h2>
            <ol>
              <li>Find a specialist — Use search and filters</li>
              <li>Discuss the task — Contact via built-in chat</li>
              <li>Get results — Pay securely, funds released after confirmation</li>
            </ol>
            <p>Pages: <a href="/catalog">Catalog</a> | <a href="/auth/login">Login</a> | <a href="/auth/register">Register</a> | <a href="/dashboard">Specialist Dashboard</a> | <a href="/client">Client Dashboard</a></p>
          </div>
        </noscript>
      </body>
    </html>
  );
}
