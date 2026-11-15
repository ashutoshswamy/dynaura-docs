import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { DocPage, H2 } from "@/components/doc-page";
import { Code } from "@/components/code-block";

export const metadata: Metadata = pageMeta({
  title: "How it works",
  description: "How dynaura works inside: one island, size morphing, the card variant, timers and adapters. Plus development and release steps.",
  path: "/docs/how-it-works",
});

export default function Page() {
  return (
    <DocPage
      href="/docs/how-it-works"
      title="How it works"
      lead="A look inside: the single island, the spring, the card outline, exact timers, and how adapters wrap the core."
      toc={[
        { id: "internals", label: "Internals" },
        { id: "adapter", label: "Adding an adapter" },
        { id: "development", label: "Development" },
        { id: "releasing", label: "Releasing" },
      ]}
    >
      <H2 id="internals">Internals</H2>
      <ul>
        <li><strong>One island.</strong> A single DOM element holds the current toast. A new toast morphs it instead of stacking, unless <code>queue</code> is on.</li>
        <li><strong>Size morph.</strong> The core measures the compact row and the expanded content, then transitions <code>width</code>, <code>height</code> and <code>border-radius</code> between them with a CSS <code>linear()</code> spring.</li>
        <li><strong>Card variant.</strong> The header tab and body are drawn as one <code>clip-path</code>. The core recomputes the outline every frame while the size transitions.</li>
        <li><strong>Timers.</strong> Remaining time is tracked, so hover, drag and pin pause and resume exactly. The timer bar is a CSS animation that pauses with them.</li>
        <li><strong>Adapters.</strong> Vue, Svelte, Solid, Angular and vanilla are thin wrappers over <code>createToaster()</code>. React adds portals so <code>description</code>, <code>icon</code> and <code>trailing</code> can be React nodes.</li>
      </ul>

      <H2 id="adapter">Adding an adapter</H2>
      <p>
        Call <code>createToaster(options)</code> on mount and <code>.destroy()</code> on unmount. Forward option changes with <code>.set()</code>. If the framework has its own node type, pass a <code>render(el, node)</code> option: the core calls it with <code>node = null</code> to unmount.
      </p>

      <H2 id="development">Development</H2>
      <Code
        lang="sh"
        code={`git clone https://github.com/ashutoshswamy/dynaura.git
cd dynaura
npm install
npm run dev     # local test playground: imports src/ directly
npm test        # vitest + jsdom
npm run build   # tsup, outputs dist/`}
      />
      <p>
        The package playground runs at <code>http://localhost:5173</code> and exercises every feature: themes with live color pickers, positions, queue, the timer bar and rich cards. The code it shows comes from the files that run, so it cannot drift.
      </p>

      <H2 id="releasing">Releasing</H2>
      <Code
        lang="sh"
        code={`npm version patch      # or minor / major
npm publish            # prepublishOnly runs typecheck, build and tests first`}
      />
    </DocPage>
  );
}
