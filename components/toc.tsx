"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

/** "On this page" with scroll-spy. Uses IntersectionObserver, no scroll listener. */
export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (seen[0]) setActive(seen[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p className="mb-3 text-sm font-semibold">On this page</p>
      <ul className="space-y-0.5 border-l border-line text-sm">
        {items.map((t) => {
          const on = active === t.id;
          return (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                aria-current={on ? "location" : undefined}
                className={`plain -ml-px block border-l-2 py-1 pl-4 transition-colors ${
                  on ? "border-accent font-medium text-ink" : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {t.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
