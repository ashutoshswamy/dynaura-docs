import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeftIcon, ArrowRightIcon, InformationCircleIcon, LinkIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import { flat, links } from "./nav";
import { docIcons } from "./doc-icons";
import { Toc } from "./toc";
import { SITE, author, jsonLd } from "@/lib/seo";

export type Toc = { id: string; label: string }[];

export function DocPage({
  href,
  title,
  lead,
  toc,
  children,
}: {
  href: string;
  title: string;
  lead: string;
  toc: Toc;
  children: ReactNode;
}) {
  const i = flat.findIndex((p) => p.href === href);
  const prev = flat[i - 1];
  const next = flat[i + 1];
  const Icon = docIcons[href];
  const url = SITE + href;
  const crumbs = [
    { name: "dynaura", url: SITE },
    { name: "Docs", url: `${SITE}/docs` },
    ...(href === "/docs" ? [] : [{ name: title, url }]),
  ];
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: `${title} | dynaura docs`,
      description: lead,
      url,
      mainEntityOfPage: url,
      inLanguage: "en",
      about: { "@type": "SoftwareApplication", name: "dynaura", url: SITE },
      author,
      publisher: author,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, n) => ({ "@type": "ListItem", position: n + 1, name: c.name, item: c.url })),
    },
  ];
  return (
    <div className="flex gap-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(ld)} />
      <article className="doc min-w-0 flex-1 pb-8">
        <header className="rounded-[28px] bg-accent-soft p-6 sm:p-10">
          {Icon && (
            <span className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-island text-accent sm:h-16 sm:w-16">
              <Icon className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden />
            </span>
          )}
          <h1 className="text-[clamp(2.25rem,9vw,3rem)] leading-[1.04] font-bold tracking-[-0.04em] break-words sm:text-6xl lg:text-[4.25rem]">{title}</h1>
          <p className="!mt-5 !max-w-[52ch] text-lg leading-relaxed !text-ink/70 sm:text-xl">{lead}</p>
        </header>

        {/* below xl the right rail is hidden, so the same anchors run as a scrolling row */}
        <nav aria-label="On this page" className="-mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 xl:hidden">
          {toc.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="plain flex-none rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium whitespace-nowrap text-muted transition-colors hover:text-ink"
            >
              {t.label}
            </a>
          ))}
        </nav>

        <div className="mt-10">{children}</div>

        <footer className="mt-20 border-t border-line pt-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {prev ? <PageLink dir="prev" {...prev} /> : <span />}
            {next ? <PageLink dir="next" {...next} /> : <span />}
          </div>
          <a
            href={`${links.github}/issues`}
            className="plain mt-8 inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
          >
            <PencilSquareIcon className="h-3.5 w-3.5" aria-hidden />
            Found a mistake? Open an issue on GitHub
          </a>
        </footer>
      </article>

      <aside className="hidden w-52 shrink-0 xl:block">
        <div className="sticky top-24">
          <Toc items={toc} />
        </div>
      </aside>
    </div>
  );
}

function PageLink({ dir, title, href, description }: { dir: "prev" | "next"; title: string; href: string; description: string }) {
  return (
    <Link
      href={href}
      className={`plain group flex flex-col gap-1 rounded-[24px] p-6 transition-[background-color,transform] active:scale-[0.99] ${
        dir === "next"
          ? "on-dark items-end bg-island text-right text-island-fg hover:bg-[#161a16] sm:col-start-2"
          : "border border-line bg-surface hover:bg-accent-soft"
      }`}
    >
      <span className={`flex items-center gap-1.5 text-sm ${dir === "next" ? "text-accent" : "text-muted"}`}>
        {dir === "prev" && <ArrowLeftIcon className="h-3.5 w-3.5" aria-hidden />}
        {dir === "prev" ? "Previous" : "Next"}
        {dir === "next" && <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden />}
      </span>
      <span className="font-display text-xl font-semibold tracking-tight">{title}</span>
      <span className={`text-sm ${dir === "next" ? "text-island-fg/65" : "text-muted"}`}>{description}</span>
    </Link>
  );
}

/** Section heading with a stable anchor and a hover link icon. */
export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="group">
      <a href={`#${id}`} className="plain inline-flex items-center gap-2.5">
        {children}
        <LinkIcon className="h-4 w-4 text-muted opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100" aria-hidden />
      </a>
    </h2>
  );
}

export function Callout({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <aside className="my-7 flex gap-4 rounded-[24px] border border-line bg-surface p-5 text-[0.95rem] [&_p]:!mb-0 [&_p]:!text-ink">
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-accent-soft text-accent-ink">
        <InformationCircleIcon className="h-5 w-5" aria-hidden />
      </span>
      <div>
        {title && <p className="!mb-1 font-display text-base font-semibold">{title}</p>}
        {children}
      </div>
    </aside>
  );
}

/** Demo row: a try button next to a short explanation. Keeps live demos visually distinct from code. */
export function DemoBar({ children }: { children: ReactNode }) {
  return <div className="my-5 flex flex-wrap items-center gap-3">{children}</div>;
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="my-7 overflow-x-auto rounded-[24px] border border-line bg-surface">
      <table className="doc-table">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, n) => (
            <tr key={n}>
              {r.map((c, k) => (
                <td key={k}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type Option = { name: string; type?: string; def?: string; required?: boolean; desc: ReactNode };

/**
 * API reference rows. Name, type and default sit on one line, the description below.
 * Reads better than a wide table, and stacks cleanly on a phone.
 */
export function OptionList({ items }: { items: Option[] }) {
  return (
    <dl className="my-7 overflow-hidden rounded-[24px] border border-line bg-surface">
      {items.map((o) => (
        <div key={o.name} className="border-t border-line px-6 py-5 transition-colors first:border-t-0 hover:bg-accent-soft/50">
          <dt className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <code className="!border-0 !bg-transparent !p-0 !text-[1rem] !font-semibold">{o.name}</code>
            {o.type && <code className="!rounded-full !px-2.5 !py-0.5 !text-[0.78rem] break-words !whitespace-normal text-muted">{o.type}</code>}
            {o.required && <span className="rounded-full bg-ink px-2.5 py-0.5 text-xs font-medium text-bg">required</span>}
            {o.def && (
              <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-ink">default {o.def}</span>
            )}
          </dt>
          <dd className="mt-2 max-w-[65ch] text-muted">{o.desc}</dd>
        </div>
      ))}
    </dl>
  );
}
