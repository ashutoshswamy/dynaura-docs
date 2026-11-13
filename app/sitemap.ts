import type { MetadataRoute } from "next";

// ponytail: single URL, add doc pages here as they ship
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://dynaura.ashutoshswamy.in", changeFrequency: "weekly", priority: 1 }];
}
