import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { DocPage, H2, OptionList, Callout } from "@/components/doc-page";
import { Code } from "@/components/code-block";

export const metadata: Metadata = pageMeta({
  title: "API reference",
  description: "Complete dynaura API: methods, toast options, Toaster options, entry points and TypeScript types.",
  path: "/docs/api",
});

const c = (s: string) => <code>{s}</code>;

export default function Page() {
  return (
    <DocPage
      href="/docs/api"
      title="API"
      lead="Every method, option and entry point. Strings are always inserted as text, never as HTML."
      toc={[
        { id: "dynaura", label: "dynaura" },
        { id: "toast-options", label: "Toast options" },
        { id: "toaster-options", label: "Toaster options" },
        { id: "entry-points", label: "Entry points" },
        { id: "typescript", label: "TypeScript" },
      ]}
    >
      <H2 id="dynaura">dynaura</H2>
      <p>The object you call from anywhere. Every method that shows a toast returns its id.</p>
      <OptionList
        items={[
          {
            name: "success(opts)",
            desc: (
              <>
                Also {c("error(opts)")}, {c("warning(opts)")} and {c("info(opts)")}. {c("opts")} is a string (title only) or an options object. Returns the toast id.
              </>
            ),
          },
          { name: "loading(opts)", desc: "Sticky toast with a spinner." },
          {
            name: "live(opts)",
            desc: <>Live activity: sticky, with a running timer (default) or a waveform ({c('kind: "wave"')}).</>,
          },
          {
            name: "promise(promise, { loading, success, error })",
            desc: "Morphs loading into success or error. Each can be a string, an options object, or a function of the result. Returns the original promise.",
          },
          { name: "update(id, patch)", desc: <>Patch a toast in place, including {c("type")}. Also works on queued toasts.</> },
          { name: "dismiss(id?)", desc: "Dismiss the current toast (the next queued one shows) or a specific id." },
          { name: "clear()", desc: "Dismiss everything, including the queue." },
        ]}
      />

      <H2 id="toast-options">Toast options</H2>
      <OptionList
        items={[
          { name: "title", type: "string", required: true, desc: "Main text." },
          { name: "description", type: "string | Node | ReactNode", desc: "Shown when the island expands." },
          { name: "icon", type: "string | Node | ReactNode", def: "built-in", desc: "Replaces the leading icon." },
          { name: "trailing", type: "string | Node | ReactNode", desc: <>Small right-side slot, e.g. {c('"2 min"')}.</> },
          {
            name: "duration",
            type: "number | null",
            def: "4000",
            desc: <>Milliseconds. {c("null")} is sticky. {c("loading")} and {c("live")} default to {c("null")}.</>,
          },
          { name: "button", type: "{ title, onClick }", desc: "Action button. The toast dismisses after the click." },
          { name: "progress", type: "number (0 to 1)", desc: "Value bar plus rolling-digit percent." },
          { name: "confetti", type: "boolean", def: "false", desc: "Confetti burst when shown. Skipped under reduced motion." },
          { name: "kind", type: '"timer" | "wave"', def: '"timer"', desc: <>Flavor of a {c("live")} toast.</> },
          {
            name: "variant",
            type: '"default" | "card"',
            def: '"default"',
            desc: <>{c('"card"')}: header tab plus a full-bleed custom body.</>,
          },
          { name: "queue", type: "boolean", def: "Toaster's queue", desc: "Per-toast override of the Toaster option." },
        ]}
      />
      <Callout>
        <p>React nodes work in the React adapter. Vue, Svelte and vanilla accept strings or DOM nodes.</p>
      </Callout>

      <H2 id="toaster-options">Toaster options</H2>
      <p>
        These apply to {c("<Toaster />")} and to {c("createToaster()")}. Mount one Toaster per page.
      </p>
      <OptionList
        items={[
          {
            name: "position",
            type: '"top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right"',
            def: '"top"',
            desc: "Where the island sits.",
          },
          { name: "offset", type: "number", def: "12", desc: "Pixels from the screen edge. Safe-area insets are added." },
          { name: "theme", type: '"dark" | "light" | "system" | CustomTheme', def: '"dark"', desc: "See Theming." },
          { name: "queue", type: "boolean", def: "false", desc: "Show toasts one after another." },
          { name: "timer", type: "boolean", def: "true", desc: "Thin time-remaining bar on timed toasts." },
          { name: "haptics", type: "boolean", def: "true", desc: <>{c("navigator.vibrate")} on show. A no-op where unsupported.</> },
        ]}
      />

      <H2 id="entry-points">Entry points</H2>
      <OptionList
        items={[
          { name: "dynaura", desc: <>React: {c("Toaster")}, {c("dynaura")}.</> },
          { name: "dynaura/vue", desc: <>Vue 3: {c("Toaster")}, {c("dynaura")}.</> },
          { name: "dynaura/svelte", desc: <>Svelte: {c("toaster")} action, {c("dynaura")}.</> },
          { name: "dynaura/vanilla", desc: <>Plain JS: {c("createToaster")}, {c("dynaura")}.</> },
          { name: "dynaura/styles.css", desc: "The stylesheet. Import it once." },
        ]}
      />

      <H2 id="typescript">TypeScript</H2>
      <p>
        Exported types: {c("ToastOptions")}, {c("ToastType")}, {c("ToasterProps")}, {c("CustomTheme")}, {c("Position")} and {c("Content")}.
      </p>
      <Code lang="ts" code={`import type { ToastOptions, CustomTheme } from "dynaura";`} />
    </DocPage>
  );
}
