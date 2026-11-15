import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { DocPage, H2, Callout, DemoBar } from "@/components/doc-page";
import { CodeTabsBlock } from "@/components/code-block";
import { Try } from "@/components/demos";

export const metadata: Metadata = pageMeta({
  title: "Quick start",
  description: "Mount one Toaster and call dynaura from anywhere, in React, Vue, Svelte, Solid, Angular or vanilla JS.",
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
  toaster = injectToaster({ position: "top", theme: "system" }); // once, in the root component
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
        { id: "angular", label: "Angular" },
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
        <p>Mount one Toaster per page. State is a single global, so a second one would fight the first. In development a second one logs a console warning.</p>
      </Callout>

      <H2 id="angular">Angular</H2>
      <p>
        Add <code>dynaura/styles.css</code> to <code>styles</code> in <code>angular.json</code>. <code>injectToaster</code> must run in an injection context (a component constructor or field initializer). It is a no-op on the server and cleans up with the component.
      </p>

      <H2 id="result">Result</H2>
      <p>The snippet above produces this island:</p>
      <DemoBar>
        <Try id="success">Save</Try>
      </DemoBar>
    </DocPage>
  );
}
