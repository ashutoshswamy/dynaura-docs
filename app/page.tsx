import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";
import { SITE, NPM, REPO, author, jsonLd, pageMeta } from "@/lib/seo";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { BoltIcon, BookOpenIcon, PaintBrushIcon, PuzzlePieceIcon } from "@heroicons/react/24/outline";
import { docIcons } from "@/components/doc-icons";
import { siAngular, siJavascript, siReact, siSolid, siSvelte, siVuedotjs } from "simple-icons";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CodeTabsBlock, highlight } from "@/components/code-block";
import { FeatureExplorer } from "@/components/feature-explorer";
import { features } from "@/components/features-data";
import { HeroSetlist } from "@/components/demos";
import { Welcome } from "@/components/landing-bits";
import { CopyCommand } from "@/components/copy-command";
import { nav } from "@/components/nav";
import { WordRoll } from "@/components/word-roll";

export const metadata: Metadata = pageMeta({
  title: "dynaura",
  absoluteTitle: "dynaura | Dynamic Island toasts for React, Vue, Svelte, Solid, Angular and JS",
  description:
    "dynaura shows toasts as one Dynamic Island style pill that spring-morphs between states and swipes away. Zero dependencies, typed, themeable. React, Vue, Svelte, Solid, Angular and vanilla JS.",
  path: "/",
});

const homeLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "dynaura",
    alternateName: "dynaura npm package",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description: "Dynamic Island style toasts. Spring-morphing, swipeable, themeable, zero dependencies.",
    url: SITE,
    downloadUrl: NPM,
    installUrl: NPM,
    softwareHelp: `${SITE}/docs`,
    codeRepository: REPO,
    license: "https://opensource.org/licenses/MIT",
    keywords: "toast, notification, dynamic island, react toast, vue toast, svelte toast, solid toast, angular toast, animation, spring",
    author,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "dynaura docs",
    url: SITE,
    inLanguage: "en",
    publisher: author,
  },
];

const frameworks = [
  { name: "React", icon: siReact, from: 'import { Toaster, dynaura } from "dynaura"' },
  { name: "Vue", icon: siVuedotjs, from: 'import { Toaster, dynaura } from "dynaura/vue"' },
  { name: "Svelte", icon: siSvelte, from: 'import { toaster, dynaura } from "dynaura/svelte"' },
  { name: "Solid", icon: siSolid, from: 'import { Toaster, dynaura } from "dynaura/solid"' },
  { name: "Angular", icon: siAngular, from: 'import { injectToaster, dynaura } from "dynaura/angular"' },
  { name: "Vanilla JS", icon: siJavascript, from: 'import { createToaster } from "dynaura/vanilla"' },
];

const quickFacts = [
  { Icon: PuzzlePieceIcon, title: "Mount once", body: "One Toaster per page, in your root layout.", code: "<Toaster />" },
  { Icon: PaintBrushIcon, title: "Import the stylesheet", body: "Once, at the root.", code: 'import "dynaura/styles.css"' },
  { Icon: BoltIcon, title: "Call from anywhere", body: "State is a global, so there is no provider or hook.", code: 'dynaura.success("Saved")' },
];

const tabs = [
  {
    label: "React",
    lang: "tsx",
    code: `import { Toaster, dynaura } from "dynaura";
import "dynaura/styles.css";

export default function App() {
  return (
    <>
      <Toaster />
      <button onClick={() => dynaura.success({ title: "Saved", description: "Your changes are live." })}>
        Save
      </button>
    </>
  );
}`,
  },
  {
    label: "Vue",
    lang: "vue",
    code: `<script setup>
import { Toaster, dynaura } from "dynaura/vue";
import "dynaura/styles.css";
</script>

<template>
  <Toaster position="top" theme="system" />
  <button @click="dynaura.success('Saved')">Save</button>
</template>`,
  },
  {
    label: "Svelte",
    lang: "svelte",
    code: `<script>
  import { toaster, dynaura } from "dynaura/svelte";
  import "dynaura/styles.css";
</script>

<div use:toaster={{ position: "top", theme: "system" }} />
<button on:click={() => dynaura.success("Saved")}>Save</button>`,
  },
  {
    label: "Solid",
    lang: "tsx",
    code: `import { Toaster, dynaura } from "dynaura/solid";
import "dynaura/styles.css";

export default function App() {
  return (
    <>
      <Toaster position="top" theme="system" />
      <button onClick={() => dynaura.success("Saved")}>Save</button>
    </>
  );
}`,
  },
  {
    label: "Angular",
    lang: "ts",
    code: `import { Component } from "@angular/core";
import { dynaura, injectToaster } from "dynaura/angular";

@Component({
  selector: "app-root",
  standalone: true,
  template: \`<button (click)="save()">Save</button>\`,
})
export class AppComponent {
  toaster = injectToaster({ position: "top", theme: "system" });
  save() {
    dynaura.success("Saved");
  }
}`,
  },
  {
    label: "Vanilla JS",
    lang: "js",
    code: `import { createToaster, dynaura } from "dynaura/vanilla";
import "dynaura/styles.css";

const toaster = createToaster({ position: "top" });
dynaura.info("Hello");`,
  },
];


export default async function Home() {
  const featureHtml = Object.fromEntries(
    await Promise.all(features.map(async (f) => [f.id, await highlight(f.code, f.lang)] as const)),
  );
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(homeLd)} />
      <Welcome />
      <SiteHeader />

      <ViewTransition enter="page-in" exit="page-out" default="none">
      <main>
        {/* hero: asymmetric split on the page background. Copy left, dark brand panel right. */}
        <div className="hero-bg relative isolate overflow-hidden">
        <section className="mx-auto grid min-h-[min(46rem,calc(100dvh-4rem))] max-w-[1400px] grid-cols-[minmax(0,1fr)] items-center gap-14 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20 lg:py-20">
          <div>
            <h1 className="hero-in font-display text-[clamp(3.25rem,10.5vw,6rem)] leading-[1.02] font-bold tracking-[-0.04em] text-balance">
              <span className="block">Island toasts</span>
              <span className="block">
                for <WordRoll words={["React", "Vue", "Svelte", "Solid", "Angular", "vanilla JS"]} />
              </span>
            </h1>
            <p className="hero-in mt-8 max-w-[28rem] text-lg leading-relaxed text-muted" style={{ animationDelay: "90ms" }}>
              One pill that spring-morphs between states and swipes away. Zero dependencies, fully typed.
            </p>
            <div className="hero-in mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: "180ms" }}>
              <Link
                href="/docs/installation"
                className="inline-flex h-[3.25rem] items-center gap-2 rounded-full bg-ink px-6 text-[0.95rem] font-semibold text-bg transition-[transform,background-color] hover:bg-ink/85 active:scale-[0.97]"
              >
                Get started
                <ArrowRightIcon className="h-4 w-4" aria-hidden />
              </Link>
              <CopyCommand />
            </div>
          </div>

          <div className="hero-in hero-stage on-dark rounded-[28px] bg-island p-3 text-island-fg sm:p-4" style={{ animationDelay: "260ms" }}>
            <div className="flex items-center justify-between gap-4 px-3 pt-2 pb-4">
              <h2 className="text-sm font-medium text-island-fg/70">Press one. The island opens at the top of the page.</h2>
              <span aria-hidden className="h-6 w-16 flex-none rounded-full bg-black ring-1 ring-white/10" />
            </div>
            <HeroSetlist />
          </div>
        </section>
        </div>

        {/* adapters: one core, six entry points. Big full-width rows that invert on hover; each links to the quick start. */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:py-28">
            <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">One core. Six adapters.</h2>
            <p className="mt-4 max-w-[52ch] text-lg text-muted">
              Every adapter drives the same island. Pick your framework, change one import.
            </p>
            <ul className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-2">
              {frameworks.map((f) => (
                <li key={f.name}>
                  <Link
                    href="/docs/quick-start"
                    className="plain on-dark group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-5 gap-y-1 rounded-[24px] bg-surface p-4 transition-[background-color,color,transform] duration-300 hover:bg-island hover:text-island-fg active:scale-[0.995] sm:gap-x-8 sm:p-5 lg:grid-cols-[auto_minmax(0,1fr)_auto_auto] lg:px-7 lg:py-6"
                  >
                    <span className="row-span-2 flex h-14 w-14 flex-none items-center justify-center rounded-full bg-accent-soft text-accent-ink transition-colors duration-300 group-hover:bg-accent group-hover:text-[#06140a] sm:h-16 sm:w-16 lg:row-span-1">
                      <svg role="img" aria-label={f.name} viewBox="0 0 24 24" className="h-7 w-7 sm:h-8 sm:w-8" fill="currentColor">
                        <path d={f.icon.path} />
                      </svg>
                    </span>
                    <span className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">{f.name}</span>
                    <ArrowRightIcon className="row-span-2 h-5 w-5 flex-none text-muted transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-accent lg:order-last lg:row-span-1" aria-hidden />
                    <code className="col-start-2 truncate text-[0.82rem] text-muted transition-colors duration-300 group-hover:text-island-fg/70 lg:col-start-3 lg:text-sm">{f.from}</code>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* feature explorer: rail of features + one dark live panel */}
        <section className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:py-32">
          <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
            Everything a toast should be.
          </h2>
          <div className="mt-12">
            <FeatureExplorer html={featureHtml} />
          </div>
        </section>

        {/* quick start: three moves as a rail on the left, the code in a tinted frame on the right */}
        <section className="border-t border-line bg-surface">
          <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:py-32">
            <h2 className="max-w-3xl font-display text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-6xl">
              One Toaster. Call it anywhere.
            </h2>
            <p className="mt-5 max-w-[56ch] text-lg text-muted">
              Three moves and every dynaura call works, from any file, with no provider and no hook.
            </p>

            <div className="mt-14 grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:mt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <ol className="grid grid-cols-[minmax(0,1fr)] gap-10">
                {quickFacts.map(({ Icon, title, body, code }, i, all) => (
                  <li key={title} className="relative flex gap-5">
                    {i < all.length - 1 && <span aria-hidden className="absolute top-14 -bottom-10 left-[1.4rem] w-px bg-line" />}
                    <span className="relative flex h-11 w-11 flex-none items-center justify-center rounded-full bg-island text-accent">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="min-w-0 pt-1">
                      <span className="block font-display text-2xl font-semibold tracking-[-0.02em]">{title}</span>
                      <span className="mt-1 block text-[1.02rem] leading-snug text-muted">{body}</span>
                      <code className="mt-3 inline-block max-w-full truncate rounded-[8px] bg-code px-2.5 py-1 text-[0.82rem]">{code}</code>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="rounded-[28px] bg-accent-soft p-3 sm:p-4 [&>figure]:my-0">
                <CodeTabsBlock tabs={tabs} />
              </div>
            </div>
          </div>
        </section>

        {/* docs index: one tile per nav group, each with its own surface (dark, green, white) */}
        <section className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:py-32">
          <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">Read the docs.</h2>
          <p className="mt-5 max-w-[52ch] text-lg text-muted">
            Guides for every feature, a full API reference, and a playground to try each option.
          </p>

          <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-3 lg:mt-16 lg:grid-cols-12 lg:gap-4">
            {nav.map((g, n) => {
              const dark = n === 0;
              const tone = [
                "on-dark bg-island text-island-fg lg:col-span-5",
                "bg-accent-soft lg:col-span-7",
                "border border-line bg-surface lg:col-span-12",
              ][n];
              return (
                <div key={g.label} className={`rounded-[28px] p-4 sm:p-6 ${tone}`}>
                  <h3 className="px-3 pt-2 pb-4 font-display text-2xl font-semibold tracking-[-0.02em]">{g.label}</h3>
                  <ul className={`grid grid-cols-[minmax(0,1fr)] gap-0.5 ${n === 2 ? "lg:grid-cols-2 lg:gap-x-4" : ""}`}>
                    {g.items.map((i) => {
                      const Icon = docIcons[i.href] ?? BookOpenIcon;
                      return (
                        <li key={i.href}>
                          <Link
                            href={i.href}
                            className={`plain group flex items-center gap-4 rounded-[20px] px-3 py-3 transition-colors ${dark ? "hover:bg-white/10" : "hover:bg-ink/[0.06]"}`}
                          >
                            <span
                              className={`flex h-11 w-11 flex-none items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105 ${dark ? "bg-accent text-[#06140a]" : "bg-island text-accent"}`}
                            >
                              <Icon className="h-5 w-5" aria-hidden />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-medium">{i.title}</span>
                              <span className={`block truncate text-sm ${dark ? "text-island-fg/65" : "text-muted"}`}>{i.description}</span>
                            </span>
                            <ArrowRightIcon className={`h-4 w-4 flex-none transition-transform group-hover:translate-x-1 ${dark ? "text-island-fg/60" : "text-muted group-hover:text-ink"}`} aria-hidden />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      </ViewTransition>

      <SiteFooter />
    </>
  );
}
