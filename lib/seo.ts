import type { Metadata } from "next";

export const SITE = "https://dynaura.ashutoshswamy.in";
export const NPM = "https://www.npmjs.com/package/dynaura";
export const REPO = "https://github.com/ashutoshswamy/dynaura";

export const author = {
  "@type": "Person",
  name: "Ashutosh Swamy",
  url: "https://ashutoshswamy.in",
  sameAs: [
    "https://github.com/ashutoshswamy",
    "https://www.linkedin.com/in/ashutoshswamy",
    "https://x.com/ashutoshswamy_",
  ],
};

/** One place for per-page metadata so canonical, Open Graph and Twitter never inherit the home page's values. */
export function pageMeta({
  title,
  description,
  path,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: string;
}): Metadata {
  const full = absoluteTitle ?? `${title} | dynaura docs`;
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: "dynaura docs",
      title: full,
      description,
      locale: "en_US",
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "dynaura: Dynamic Island toasts for the web" }],
    },
    twitter: { card: "summary_large_image", title: full, description, images: ["/twitter-image.png"] },
  };
}

export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
