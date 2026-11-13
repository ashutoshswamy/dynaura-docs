import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const siteUrl = "https://dynaura.ashutoshswamy.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dynaura Docs | Official documentation for the dynaura npm package",
    template: "%s | Dynaura Docs",
  },
  description:
    "Official documentation for dynaura, an npm package by Ashutosh Swamy. Guides, API reference and examples coming soon.",
  applicationName: "Dynaura Docs",
  authors: [{ name: "Ashutosh Swamy", url: "https://ashutoshswamy.in" }],
  creator: "Ashutosh Swamy",
  keywords: ["dynaura", "dynaura npm", "dynaura docs", "dynaura documentation"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Dynaura Docs",
    title: "Dynaura Docs",
    description: "Official documentation for the dynaura npm package.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dynaura Docs",
    description: "Official documentation for the dynaura npm package.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
