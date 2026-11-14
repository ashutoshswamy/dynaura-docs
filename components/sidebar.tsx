"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "./nav";
import { docIcons } from "./doc-icons";

export function Sidebar() {
  const path = usePathname();
  return (
    <nav aria-label="Documentation" className="space-y-8">
      {nav.map((g) => (
        <div key={g.label}>
          <p className="mb-2.5 px-3 font-display text-base font-semibold tracking-tight">{g.label}</p>
          <ul className="space-y-0.5">
            {g.items.map((i) => {
              const active = path === i.href;
              const Icon = docIcons[i.href];
              return (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-full py-1.5 pr-3 pl-1.5 text-[0.92rem] transition-colors ${
                      active ? "bg-ink font-medium text-bg" : "text-muted hover:bg-line/60 hover:text-ink"
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 flex-none items-center justify-center rounded-full ${
                        active ? "bg-accent text-[#06140a]" : "bg-accent-soft text-accent-ink"
                      }`}
                    >
                      {Icon && <Icon className="h-4 w-4" aria-hidden />}
                    </span>
                    {i.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
