import type { MetadataRoute } from "next";
import { flat } from "@/components/nav";
import { SITE } from "@/lib/seo";

// ponytail: static date, bump it when the docs change
const UPDATED = "2026-11-14";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, lastModified: UPDATED, changeFrequency: "weekly", priority: 1 },
    ...flat.map((p) => ({
      url: SITE + p.href,
      lastModified: UPDATED,
      changeFrequency: "weekly" as const,
      priority: p.href === "/docs/installation" || p.href === "/docs/quick-start" || p.href === "/docs/api" ? 0.9 : 0.7,
    })),
  ];
}
