import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import {
  ArrowsRightLeftIcon,
  ChartBarIcon,
  CodeBracketIcon,
  HandRaisedIcon,
  MicrophoneIcon,
  ShieldCheckIcon,
  SwatchIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { DocPage, H2, DemoBar } from "@/components/doc-page";
import { Code } from "@/components/code-block";
import { Try } from "@/components/demos";

export const metadata: Metadata = pageMeta({
  title: "Introduction",
  description: "dynaura is a Dynamic Island style toast library with spring morphing, swipe gestures and theming. Zero dependencies.",
  path: "/docs",
});

const why = [
  { Icon: ArrowsRightLeftIcon, title: "One island, real motion", body: "A single pill morphs between compact and expanded using a CSS linear() spring. No animation library." },
  { Icon: TicketIcon, title: "Rich cards", body: "A header tab plus any custom body. Flight passes, ride trackers, receipts." },
  { Icon: MicrophoneIcon, title: "Live activities", body: "Sticky toasts with a running timer or an animated waveform." },
  { Icon: ChartBarIcon, title: "Progress that feels alive", body: "A value bar and rolling digits, updated in place with dynaura.update." },
  { Icon: HandRaisedIcon, title: "Built for touch", body: "Swipe to dismiss, tap or long-press to pin, hover to pause." },
  { Icon: SwatchIcon, title: "Themeable", body: "Dark, light, system, or your own colors. Everything is a CSS variable." },
  { Icon: CodeBracketIcon, title: "Any framework", body: "React, Vue, Svelte, or plain JS, all on one shared core." },
  { Icon: ShieldCheckIcon, title: "Light and accessible", body: "Zero dependencies, typed, aria-live, and prefers-reduced-motion respected." },
];

export default function Page() {
  return (
    <DocPage
      href="/docs"
      title="Introduction"
      lead="dynaura shows toasts as one pill that spring-morphs between states, swipes away, and stays out of your way."
      toc={[
        { id: "try-it", label: "Try it" },
        { id: "why", label: "Why dynaura" },
        { id: "frameworks", label: "Frameworks" },
      ]}
    >
      <H2 id="try-it">Try it</H2>
      <p>
        Every demo on this site runs the published <code>dynaura</code> package. Press a button and watch the island at the top of the page.
      </p>
      <DemoBar>
        <Try id="success">Success</Try>
        <Try id="promise" variant="outline">Promise</Try>
        <Try id="card" variant="outline">Rich card</Try>
      </DemoBar>
      <Code lang="tsx" code={`dynaura.success({ title: "Saved", description: "Your changes are live." });`} />
      <p>
        That is the whole setup: mount one <code>Toaster</code>, call <code>dynaura</code> from anywhere.
      </p>

      <H2 id="why">Why dynaura</H2>
      <ul className="not-prose my-8 grid max-w-3xl grid-cols-[minmax(0,1fr)] gap-x-12 gap-y-8 !p-0 sm:grid-cols-2">
        {why.map(({ Icon, title, body }) => (
          <li key={title} className="!m-0 flex gap-4 !p-0 before:!hidden">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-accent-soft text-accent-ink">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <span>
              <span className="block font-medium !text-ink">{title}</span>
              <span className="mt-1 block text-[0.95rem] leading-snug text-muted">{body}</span>
            </span>
          </li>
        ))}
      </ul>

      <H2 id="frameworks">Frameworks</H2>
      <p>
        The React adapter is the default import. Vue, Svelte and vanilla JS are thin wrappers over the same core, each on its own entry point. See{" "}
        <Link href="/docs/quick-start">Quick start</Link> for each one, or jump to the <Link href="/docs/api">API reference</Link>.
      </p>
    </DocPage>
  );
}
