export type Feature = {
  id: string;
  title: string;
  body: string;
  href: string;
  lang: string;
  code: string;
};

export const features: Feature[] = [
  {
    id: "morph",
    title: "One island, real motion",
    body: "A single pill morphs between compact and expanded with a CSS spring. No animation library.",
    href: "/docs/recipes",
    lang: "tsx",
    code: `dynaura.success({
  title: "Saved",
  description: "Your changes are live.",
});`,
  },
  {
    id: "cards",
    title: "Rich cards",
    body: "A header tab plus any custom body, joined by a curved notch. Flight passes, ride trackers, receipts.",
    href: "/docs/recipes#cards",
    lang: "tsx",
    code: `dynaura.info({
  title: "Boarding soon",
  trailing: "40 min",
  variant: "card",
  description: <BoardingPass />,
});`,
  },
  {
    id: "live",
    title: "Live activities",
    body: "Sticky toasts with a running timer, or an animated waveform for audio.",
    href: "/docs/recipes#live",
    lang: "tsx",
    code: `dynaura.live({ title: "Recording voice memo" });
dynaura.live({ title: "Now playing", kind: "wave" });`,
  },
  {
    id: "progress",
    title: "Progress that feels alive",
    body: "A value bar and rolling digits, updated in place. Frequent updates never restart the toast.",
    href: "/docs/recipes#progress",
    lang: "tsx",
    code: `const id = dynaura.loading({ title: "Uploading", progress: 0 });
dynaura.update(id, { progress: 0.6 });`,
  },
  {
    id: "touch",
    title: "Built for touch",
    body: "Swipe toward the edge to dismiss, tap or long-press to pin, hover to pause with the exact time left.",
    href: "/docs/gestures",
    lang: "tsx",
    code: `<Toaster haptics /> // navigator.vibrate on show`,
  },
  {
    id: "theme",
    title: "Themeable",
    body: "Dark, light, system, or your own colors. Everything is a CSS variable.",
    href: "/docs/theming",
    lang: "tsx",
    code: `<Toaster theme={{
  background: "#2b1055",
  foreground: "#ffffff",
  success: "#7cffcb",
}} />`,
  },
  {
    id: "queue",
    title: "Queue and positions",
    body: "Show toasts one after another, and place the island in any of six positions.",
    href: "/docs/recipes#queue",
    lang: "tsx",
    code: `<Toaster position="bottom-right" queue />`,
  },
  {
    id: "frameworks",
    title: "Any framework",
    body: "React, Vue, Svelte, or plain JS, all on one shared core.",
    href: "/docs/quick-start",
    lang: "ts",
    code: `import { Toaster, dynaura } from "dynaura";       // React
import { Toaster, dynaura } from "dynaura/vue";      // Vue
import { toaster, dynaura } from "dynaura/svelte";   // Svelte
import { createToaster, dynaura } from "dynaura/vanilla";`,
  },
  {
    id: "a11y",
    title: "Light and accessible",
    body: "Zero dependencies and typed. The island is an aria-live region and reduced motion is respected.",
    href: "/docs/accessibility",
    lang: "tsx",
    code: `// role="status" aria-live="polite"
// prefers-reduced-motion: reduce => near-instant`,
  },
];
