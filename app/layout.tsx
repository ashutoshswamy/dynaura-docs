import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./dynaura.css";
import "./globals.css";
import { SiteToaster } from "@/components/site-toaster";
import { ScrollTop } from "@/components/scroll-top";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const siteUrl = "https://dynaura.ashutoshswamy.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "dynaura | Dynamic Island toasts for the web",
    template: "%s | dynaura docs",
  },
  description:
    "Documentation for dynaura: spring-morphing, swipeable, themeable Dynamic Island toasts. Zero dependencies. React, Vue, Svelte, Solid, Angular and vanilla JS.",
  applicationName: "dynaura docs",
  authors: [{ name: "Ashutosh Swamy", url: "https://ashutoshswamy.in" }],
  creator: "Ashutosh Swamy",
  keywords: ["dynaura", "toast", "dynamic island", "react toast", "vue toast", "svelte toast", "notification"],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "dynaura docs",
    title: "dynaura | Dynamic Island toasts for the web",
    description: "One pill that spring-morphs between states, swipes away, and stays out of your way.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "dynaura | Dynamic Island toasts for the web",
    description: "One pill that spring-morphs between states, swipes away, and stays out of your way.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#f6f8f5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="min-h-dvh flex flex-col">
        <ScrollTop />
        {children}
        {/* the docs use the package itself: every demo on the site drives this one island */}
        <SiteToaster />
      </body>
    </html>
  );
}
