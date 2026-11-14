"use client";

// Tab Pill, by DesignBookmark (https://designbookmark.com/motion#db-tab-pill). MIT.
// Ported to motion/react. The pill has two edges on two springs: the edge facing the move is stiff,
// the other is soft, so the pill stretches toward the new tab and then pulls its tail in.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";

const tabs = [
  { label: "Docs", href: "/docs" },
  { label: "Playground", href: "/docs/playground" },
  { label: "Examples", href: "/docs/examples" },
  { label: "API", href: "/docs/api" },
];

const activeIndex = (path: string) => tabs.findIndex((t) => (t.href === "/docs" ? path === t.href : path.startsWith(t.href)));

export function NavTabs() {
  const path = usePathname();
  const reduce = useReducedMotion();
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const left = useMotionValue(0);
  const right = useMotionValue(0);
  const width = useTransform(() => Math.max(0, right.get() - left.get()));
  const opacity = useMotionValue(0);
  const cur = useRef(-1);
  const active = activeIndex(path);

  const place = (i: number, snap: boolean) => {
    const el = refs.current[i];
    if (!el) return;
    const l = el.offsetLeft;
    const r = l + el.offsetWidth;
    if (snap || reduce || cur.current < 0) {
      left.jump(l);
      right.jump(r);
    } else {
      const fwd = i > cur.current;
      const lead = { type: "spring", stiffness: 620, damping: 40 } as const;
      const trail = { type: "spring", stiffness: 170, damping: 19 } as const;
      animate(right, r, fwd ? lead : trail);
      animate(left, l, fwd ? trail : lead);
    }
    cur.current = i;
  };

  useLayoutEffect(() => {
    if (active < 0) {
      animate(opacity, 0, { duration: 0.15 });
      cur.current = -1; // next entry snaps in instead of flying across from a stale spot
      return;
    }
    const first = cur.current < 0;
    place(active, false);
    if (first) animate(opacity, 1, { duration: 0.2 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // fonts load after first paint and change tab widths: re-snap once, and on resize
  useEffect(() => {
    const snap = () => active >= 0 && place(active, true);
    document.fonts?.ready.then(snap);
    addEventListener("resize", snap);
    return () => removeEventListener("resize", snap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <nav aria-label="Primary" className="relative hidden rounded-full bg-surface p-1 md:flex">
      <motion.span aria-hidden className="absolute top-1 bottom-1 left-0 rounded-full bg-ink will-change-transform" style={{ x: left, width, opacity }} />
      {tabs.map((t, i) => (
        <Link
          key={t.href}
          href={t.href}
          ref={(el) => {
            refs.current[i] = el;
          }}
          aria-current={i === active ? "page" : undefined}
          className={`plain relative z-10 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${i === active ? "text-bg" : "text-muted hover:text-ink"}`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
