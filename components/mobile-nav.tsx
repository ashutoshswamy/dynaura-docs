"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { links, nav } from "./nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="ml-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line bg-surface active:scale-[0.97]"
      >
        {open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
      </button>
      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto border-t border-line bg-bg px-4 py-6">
          {nav.map((g) => (
            <div key={g.label} className="mb-6">
              <p className="mb-2 text-sm font-semibold">{g.label}</p>
              <ul className="space-y-1">
                {g.items.map((i) => (
                  <li key={i.href}>
                    <Link
                      href={i.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-full px-4 py-2.5 text-muted hover:bg-line hover:text-ink"
                    >
                      {i.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <a href={links.github} className="block rounded-full px-4 py-2.5 text-muted hover:bg-line hover:text-ink">GitHub</a>
          <a href={links.npm} className="block rounded-full px-4 py-2.5 text-muted hover:bg-line hover:text-ink">npm</a>
        </div>
      )}
    </div>
  );
}
