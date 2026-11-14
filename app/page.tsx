import type { Metadata } from "next";
import Link from "next/link";
import { SITE, NPM, REPO, author, jsonLd, pageMeta } from "@/lib/seo";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { BoltIcon, BookOpenIcon, PaintBrushIcon, PuzzlePieceIcon } from "@heroicons/react/24/outline";
import { docIcons } from "@/components/doc-icons";
import { siJavascript, siReact, siSvelte, siVuedotjs } from "simple-icons";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CodeTabsBlock, highlight } from "@/components/code-block";
import { FeatureExplorer } from "@/components/feature-explorer";
import { features } from "@/components/features-data";
import { HeroPanel } from "@/components/demos";
import { Welcome } from "@/components/landing-bits";
import { CopyCommand } from "@/components/copy-command";
import { nav } from "@/components/nav";

export const metadata: Metadata = pageMeta({
  title: "dynaura",
  absoluteTitle: "dynaura | Dynamic Island toasts for React, Vue, Svelte and JS",
  description:
    "dynaura shows toasts as one Dynamic Island style pill that spring-morphs between states and swipes away. Zero dependencies, typed, themeable. React, Vue, Svelte and vanilla JS.",
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
    keywords: "toast, notification, dynamic island, react toast, vue toast, svelte toast, animation, spring",
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
  { name: "Vanilla JS", icon: siJavascript, from: 'import { createToaster } from "dynaura/vanilla"' },
];

const quickFacts = [
  { Icon: PuzzlePieceIcon, title: "Mount once", body: "One Toaster per page, in your root layout." },
  { Icon: PaintBrushIcon, title: "Import the stylesheet", body: "dynaura/styles.css, once, at the root." },
  { Icon: BoltIcon, title: "Call from anywhere", body: "State is a global, so there is no provider or hook." },
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
    label: "Vanilla JS",
    lang: "js",
    code: `import { createToaster, dynaura } from "dynaura/vanilla";
import "dynaura/styles.css";

const toaster = createToaster({ position: "top" });
dynaura.info("Hello");`,
  },
];


export default async function Home() {
  const heroCode = await highlight('dynaura.success({ title: "Saved", description: "Your changes are live." });', "tsx");
  const featureHtml = Object.fromEntries(
    await Promise.all(features.map(async (f) => [f.id, await highlight(f.code, f.lang)] as const)),
  );
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(homeLd)} />
      <Welcome />
      <SiteHeader />

      <main>
        {/* hero: asymmetric split on the page background. Copy left, dark brand panel right. */}
        <section className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)] items-center gap-14 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16 lg:pt-36 lg:pb-28">
          <div>
            <h1 className="hero-in font-display text-[3rem] leading-[1] font-bold tracking-[-0.04em] text-balance sm:text-[4.5rem] lg:text-[4.75rem]">
              Toasts that morph like an island.
            </h1>
            <p className="hero-in mt-7 max-w-[32rem] text-lg leading-relaxed text-muted" style={{ animationDelay: "90ms" }}>
              One pill that spring-morphs between states, swipes away, and stays out of your way. Zero dependencies.
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

          <div className="hero-in" style={{ animationDelay: "260ms" }}>
            <HeroPanel codeHtml={heroCode} />
          </div>
        </section>

        {/* adapters: one core, four entry points. Each row links to the quick start. */}
        <section className="border-t border-line">
          <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:py-24">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">One core. Four adapters.</h2>
            <p className="mt-3 max-w-[52ch] text-lg text-muted">
              React, Vue, Svelte and plain JS are thin wrappers over the same island, each on its own import.
            </p>
            <ul className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2">
              {frameworks.map((f) => (
                <li key={f.name}>
                  <Link
                    href="/docs/quick-start"
                    className="plain group flex items-center gap-5 rounded-[20px] border border-line bg-surface p-4 pr-6 transition-[border-color,transform] hover:border-ink/40 active:scale-[0.99] sm:p-5"
                  >
                    <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-accent-soft text-accent-ink transition-colors group-hover:bg-ink group-hover:text-bg">
                      <svg role="img" aria-label={f.name} viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                        <path d={f.icon.path} />
                      </svg>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-xl font-semibold tracking-tight">{f.name}</span>
                      <code className="mt-0.5 block truncate text-[0.82rem] text-muted">{f.from}</code>
                    </span>
                    <ArrowRightIcon className="h-4 w-4 flex-none text-muted transition-transform group-hover:translate-x-1 group-hover:text-ink" aria-hidden />
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

        {/* quick start: stacked. Code card with a Run button, then three plain facts. */}
        <section className="border-t border-line bg-surface">
          <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:py-28">
            <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">One Toaster. Call it anywhere.</h2>
            <p className="mt-4 max-w-[60ch] text-lg text-muted">Mount it once, import the stylesheet once, and every dynaura call works.</p>
            <div className="mt-8 max-w-4xl">
              <CodeTabsBlock tabs={tabs} />
            </div>
            <ul className="mt-10 grid max-w-4xl grid-cols-[minmax(0,1fr)] gap-x-10 gap-y-7 sm:grid-cols-3">
              {quickFacts.map(({ Icon, title, body }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-accent-soft text-accent-ink">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-medium">{title}</span>
                    <span className="mt-0.5 block text-[0.95rem] leading-snug text-muted">{body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* docs index: heading on the left, grouped rows on the right */}
        <section className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)] gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-20 lg:py-32">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Read the docs.</h2>
            <p className="mt-4 max-w-[36ch] text-lg text-muted">Guides for every feature, a full API reference, and a playground to try each option.</p>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-9">
            {nav.map((g) => (
              <div key={g.label}>
                <h3 className="mb-2 px-4 font-display text-lg font-semibold tracking-tight">{g.label}</h3>
                <ul className="grid grid-cols-[minmax(0,1fr)] gap-0.5">
                  {g.items.map((i) => {
                    const Icon = docIcons[i.href] ?? BookOpenIcon;
                    return (
                      <li key={i.href}>
                        <Link href={i.href} className="plain group flex items-center gap-4 rounded-[20px] px-4 py-3.5 transition-colors hover:bg-accent-soft">
                          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-line bg-surface text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-bg">
                            <Icon className="h-5 w-5" aria-hidden />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-medium">{i.title}</span>
                            <span className="block truncate text-sm text-muted">{i.description}</span>
                          </span>
                          <ArrowRightIcon className="h-4 w-4 flex-none text-muted transition-transform group-hover:translate-x-1 group-hover:text-ink" aria-hidden />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
