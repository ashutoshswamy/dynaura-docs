import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { DocPage, H2, Callout, DemoBar } from "@/components/doc-page";
import { CodeTabsBlock } from "@/components/code-block";
import { Try } from "@/components/demos";

export const metadata: Metadata = pageMeta({
  title: "Quick start",
  description: "Mount one Toaster and call dynaura from anywhere, in React, Vue, Svelte or vanilla JS.",
  path: "/docs/quick-start",
});

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
      <button
        onClick={() =>
          dynaura.success({
            title: "Saved",
            description: "Your changes are live.",
          })
        }
      >
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
dynaura.info("Hello");
// toaster.destroy() to unmount`,
  },
];

export default function Page() {
  return (
    <DocPage
      href="/docs/quick-start"
      title="Quick start"
      lead="Mount one Toaster, import the stylesheet once, then call dynaura from anywhere."
      toc={[
        { id: "setup", label: "Setup" },
        { id: "nextjs", label: "Next.js" },
        { id: "result", label: "Result" },
      ]}
    >
      <H2 id="setup">Setup</H2>
      <CodeTabsBlock tabs={tabs} />

      <H2 id="nextjs">Next.js</H2>
      <p>
        The bundle ships with <code>&quot;use client&quot;</code>, so you can render <code>&lt;Toaster /&gt;</code> straight from the App Router root layout. This very site does exactly that.
      </p>
      <Callout>
        <p>Mount one Toaster per page. State is a single global, so a second one would fight the first.</p>
      </Callout>

      <H2 id="result">Result</H2>
      <p>The snippet above produces this island:</p>
      <DemoBar>
        <Try id="success">Save</Try>
      </DemoBar>
    </DocPage>
  );
}
