import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { DocPage, H2 } from "@/components/doc-page";

export const metadata: Metadata = pageMeta({
  title: "Accessibility",
  description: "dynaura accessibility: aria-live, keyboard focus, reduced motion, and browser support.",
  path: "/docs/accessibility",
});

export default function Page() {
  return (
    <DocPage
      href="/docs/accessibility"
      title="Accessibility"
      lead="Toasts are announced politely, controls are keyboard reachable, and motion respects your visitors' settings."
      toc={[
        { id: "built-in", label: "Built in" },
        { id: "browsers", label: "Browser support" },
      ]}
    >
      <H2 id="built-in">Built in</H2>
      <ul>
        <li>The island has <code>role=&quot;status&quot;</code> and <code>aria-live=&quot;polite&quot;</code>. Error toasts switch to <code>role=&quot;alert&quot;</code> and <code>aria-live=&quot;assertive&quot;</code> so they interrupt.</li>
        <li><kbd>Escape</kbd> dismisses the current toast.</li>
        <li><code>onClick</code> is pointer only. Put keyboard-reachable actions in <code>button</code> or <code>secondaryButton</code>.</li>
        <li>Action buttons are keyboard focusable, with a visible focus ring.</li>
        <li>Under <code>prefers-reduced-motion: reduce</code>, motion is cut to near-instant. Loading spinners keep spinning.</li>
        <li>Rolling digits expose their value through <code>aria-label</code>.</li>
        <li>Text is rendered as text. Toast strings can never inject HTML.</li>
      </ul>

      <H2 id="browsers">Browser support</H2>
      <p>
        Modern evergreen browsers. The morph uses CSS <code>linear()</code> easing (Chrome 113+, Safari 17.2+, Firefox 112+) and <code>color-mix()</code>. Older browsers fall back to a bounce curve. Without <code>color-mix()</code> support, tinted backgrounds fall back to a neutral tint.
      </p>
      <p>Smoke-tested in Chrome and WebKit with Playwright. Firefox has not been verified yet.</p>
    </DocPage>
  );
}
