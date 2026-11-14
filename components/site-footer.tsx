import Image from "next/image";
import Link from "next/link";
import { ArrowUpIcon, GlobeAltIcon, BugAntIcon } from "@heroicons/react/16/solid";
import { FaGithub, FaLinkedinIn, FaNpm, FaXTwitter } from "react-icons/fa6";
import type { ComponentType } from "react";
import { links } from "./nav";

type Item = { title: string; href: string; external?: boolean; Icon?: ComponentType<{ className?: string }> };
const cols: { label: string; items: Item[] }[] = [
  {
    label: "Docs",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick start", href: "/docs/quick-start" },
      { title: "API", href: "/docs/api" },
    ],
  },
  {
    label: "Guides",
    items: [
      { title: "Recipes", href: "/docs/recipes" },
      { title: "Playground", href: "/docs/playground" },
      { title: "Examples", href: "/docs/examples" },
      { title: "Theming", href: "/docs/theming" },
    ],
  },
  {
    label: "Project",
    items: [
      { title: "npm", href: links.npm, external: true, Icon: FaNpm },
      { title: "Repository", href: links.github, external: true, Icon: FaGithub },
      { title: "Issues", href: links.issues, external: true, Icon: BugAntIcon },
    ],
  },
  {
    label: "Author",
    items: [
      { title: "Portfolio", href: links.author, external: true, Icon: GlobeAltIcon },
      { title: "GitHub", href: links.authorGithub, external: true, Icon: FaGithub },
      { title: "LinkedIn", href: links.linkedin, external: true, Icon: FaLinkedinIn },
      { title: "X", href: links.x, external: true, Icon: FaXTwitter },
    ],
  },
];

export function SiteFooter() {
  const a = "plain inline-flex items-center gap-1 text-island-fg/65 transition-colors hover:text-island-fg";
  return (
    <footer className="mt-auto p-2 sm:p-3">
      <div className="relative overflow-hidden rounded-[28px] bg-island text-island-fg">
        <div className="relative mx-auto grid max-w-[1400px] gap-12 px-6 pt-14 pb-10 sm:px-10 lg:grid-cols-[1.2fr_2fr] lg:pt-16">
          <div>
            {/* the mark is black, so it sits on a light chip */}
            <Link href="/" className="plain inline-flex items-center gap-3 rounded-full bg-island-fg py-2 pr-5 pl-3 font-display text-lg font-semibold tracking-tight text-island">
              <Image src="/logo-mark.png" alt="" width={42} height={20} className="h-5 w-auto" />
              dynaura
            </Link>
            <p className="mt-6 max-w-[30ch] font-display text-2xl leading-snug font-semibold tracking-[-0.02em]">
              Dynamic Island toasts for the web.
            </p>
            <p className="mt-3 text-island-fg/65">Zero dependencies. React, Vue, Svelte and vanilla JS.</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.label}>
                <p className="mb-4 font-display text-base font-semibold">{c.label}</p>
                <ul className="space-y-3 text-[0.95rem]">
                  {c.items.map((i) => (
                    <li key={i.title}>
                      {i.external ? (
                        <a href={i.href} className={`${a} gap-2.5`}>
                          {i.Icon && <i.Icon className="h-4 w-4 flex-none" aria-hidden />}
                          {i.title}
                        </a>
                      ) : (
                        <Link href={i.href} className={a}>
                          {i.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="relative mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-6 text-sm text-island-fg/65 sm:px-10">
          <p>MIT licensed. Built by Ashutosh Swamy.</p>
          <a href="#" className="plain inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-medium text-island-fg transition-colors hover:bg-white/10">
            Back to top
            <ArrowUpIcon className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>

        {/* oversized wordmark, fully visible and sized to the panel */}
        <p
          aria-hidden
          className="pointer-events-none px-4 pt-2 pb-6 text-center font-display text-[clamp(4.5rem,21vw,21rem)] leading-[1.05] font-bold tracking-[-0.05em] text-white/[0.1] select-none sm:pb-8"
        >
          dynaura
        </p>
      </div>
    </footer>
  );
}
