"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * App Router keeps the scroll position when the new page's top is already in view
 * (shared docs layout). Force every page change to start at the top, unless the
 * link points at a #section.
 */
export function ScrollTop() {
  const path = usePathname();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [path]);
  return null;
}
