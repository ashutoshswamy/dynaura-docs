import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { DocPage, H2, Callout } from "@/components/doc-page";
import { CodeTabsBlock, Code } from "@/components/code-block";

export const metadata: Metadata = pageMeta({
  title: "Installation",
  description: "Install dynaura with npm, pnpm, yarn or bun and import the stylesheet once.",
  path: "/docs/installation",
});

export default function Page() {
  return (
    <DocPage
      href="/docs/installation"
      title="Installation"
      lead="One package, zero dependencies. Install it, import the stylesheet once, and you are ready."
      toc={[
        { id: "install", label: "Install" },
        { id: "stylesheet", label: "Stylesheet" },
        { id: "peers", label: "Peer dependencies" },
        { id: "typescript", label: "TypeScript" },
      ]}
    >
      <H2 id="install">Install</H2>
      <CodeTabsBlock
        tabs={[
          { label: "npm", lang: "sh", code: "npm install dynaura" },
          { label: "pnpm", lang: "sh", code: "pnpm add dynaura" },
          { label: "yarn", lang: "sh", code: "yarn add dynaura" },
          { label: "bun", lang: "sh", code: "bun add dynaura" },
        ]}
      />

      <H2 id="stylesheet">Stylesheet</H2>
      <p>Import the stylesheet once, at the root of your app. Without it the island renders unstyled.</p>
      <Code lang="ts" code={`import "dynaura/styles.css";`} />
      <Callout title="About the font">
        <p>
          The stylesheet loads Bricolage Grotesque from Google Fonts with an <code>@import</code> on its first line. To self-host or satisfy a strict CSP, import <code>dynaura/styles-no-font.css</code> instead (the same stylesheet without that line) and set <code>--dynaura-font</code>.
        </p>
      </Callout>

      <H2 id="peers">Peer dependencies</H2>
      <p>
        React 18 or newer is needed for the default entry. Vue 3 or newer is needed for <code>dynaura/vue</code>, Solid 1.6 or newer for <code>dynaura/solid</code>, and Angular 16 or newer for <code>dynaura/angular</code>. Svelte and vanilla need nothing. All peers are optional, so install only the framework you use.
      </p>

      <H2 id="typescript">TypeScript</H2>
      <p>Types ship with the package. No <code>@types</code> install.</p>
      <Code lang="ts" code={`import type { ToastOptions, CustomTheme } from "dynaura";`} />
    </DocPage>
  );
}
