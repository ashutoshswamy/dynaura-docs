import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { DocPage, H2, OptionList, Callout } from "@/components/doc-page";
import { Code } from "@/components/code-block";

export const metadata: Metadata = pageMeta({
  title: "API reference",
  description: "Complete dynaura API: methods, toast options, callbacks, Toaster options, entry points and TypeScript types.",
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
          {
            name: "custom(node, opts?)",
            desc: <>Fully custom body (string, DOM Node or React node) with no title row and no card variant. {c("opts")} are the usual toast options.</>,
          },
          { name: "pause() / resume()", desc: "Freeze or release every timer, e.g. while a modal is open. Toasts shown while paused start frozen." },
          {
            name: "dismiss(id?, reason?)",
            desc: <>Dismiss the current toast (the next queued one shows) or a specific id. {c("reason")} defaults to {c('"api"')} and is passed to {c("onDismiss")}.</>,
          },
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
            name: "avatar",
            type: "string | AvatarItem | (string | AvatarItem)[]",
            desc: <>Round face(s) in place of the icon. {c("AvatarItem")} is {c("{ src?, name?, presence? }")}. With no {c("src")}, or a failed load, the face is a gradient disc with initials. An array overlaps into a group. {c("icon")} wins over a leading avatar.</>,
          },
          { name: "avatarMax", type: "number", def: "3", desc: <>Faces shown before the rest collapse into a {c("+N")} chip.</> },
          {
            name: "avatarPosition",
            type: '"leading" | "card"',
            def: '"leading"',
            desc: <>{c('"card"')}: a boarding-pass style card (implies {c('variant: "card"')}) with big faces, name, presence and a tear line before the description.</>,
          },
          { name: "onAvatarClick", type: "(i: number) => void", desc: <>Tap, or Enter / Space, on a face. {c("i")} is its index; the {c("+N")} chip reports {c("avatarMax")}. Does not trigger {c("onClick")} or pin the toast.</> },
          { name: "typing", type: "boolean", def: "false", desc: "Animated typing dots after the title. Static under reduced motion." },
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
          { name: "secondaryButton", type: "{ title, onClick }", desc: <>Second action next to {c("button")}, e.g. Undo. The toast dismisses after the click.</> },
          { name: "custom", type: "string | Node | ReactNode", desc: <>Replaces the title row with your own body. Prefer {c("dynaura.custom()")}.</> },
          { name: "id", type: "string", def: "auto-numbered", desc: "Custom key. Showing a toast with an id that is already live updates it in place instead of stacking, and restarts its timer." },
          { name: "className", type: "string", desc: "Extra class(es) on the island, for this toast only." },
          { name: "style", type: "Record<string, string | number>", desc: <>Inline styles on the island for this toast. CSS variables work, e.g. {c('{ "--dynaura-bg": "#123" }')}.</> },
          { name: "onShow", type: "() => void", desc: "Fires when the toast becomes visible. Not on updates." },
          {
            name: "onDismiss",
            type: "(reason) => void",
            desc: <>Fires when the toast ends. {c("reason")}: {c('"timeout"')}, {c('"swipe"')}, {c('"button"')}, {c('"escape"')} or {c('"api"')}. A toast replaced by a newer one reports {c('"api"')}.</>,
          },
          { name: "onAutoClose", type: "() => void", desc: <>Fires when the toast ends because {c("duration")} ran out. {c('onDismiss("timeout")')} fires too.</> },
          { name: "onClick", type: "() => void", desc: "Tap or click on the island itself, not its buttons. Pointer only: put keyboard-reachable actions in button." },
        ]}
      />
      <Callout>
        <p>React nodes work in the React adapter. Vue, Svelte, Solid, Angular and vanilla accept strings or DOM nodes.</p>
      </Callout>

      <H2 id="toaster-options">Toaster options</H2>
      <p>
        These apply to {c("<Toaster />")} and to {c("createToaster()")}. Mount one Toaster per page; in development a second one logs a {c("console.warn")}.
      </p>
      <OptionList
        items={[
          {
            name: "position",
            type: '"top" | "top-left" | "top-right" | "top-start" | "top-end" | "bottom" | "bottom-left" | "bottom-right" | "bottom-start" | "bottom-end"',
            def: '"top"',
            desc: <>Where the island sits. {c("start")} and {c("end")} are logical: they flip on RTL pages.</>,
          },
          { name: "offset", type: "number", def: "12", desc: "Pixels from the screen edge. Safe-area insets are added." },
          { name: "theme", type: '"dark" | "light" | "system" | CustomTheme', def: '"dark"', desc: "See Theming." },
          { name: "queue", type: "boolean", def: "false", desc: "Show toasts one after another." },
          { name: "maxQueue", type: "number", def: "Infinity", desc: "With queue: the most toasts that may wait. Beyond it the oldest waiting toast is dropped." },
          {
            name: "dedupe",
            type: '"id" | "title"',
            def: '"id"',
            desc: <>{c('"id"')}: a repeated custom id updates in place. {c('"title"')}: a repeated title does too.</>,
          },
          {
            name: "swipe",
            type: '"edge" | "up" | "down" | "both" | "none"',
            def: '"edge"',
            desc: <>Drag-to-dismiss direction. {c('"edge"')} is toward the anchored screen edge, {c('"both"')} is either vertical way, {c('"none"')} turns it off.</>,
          },
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
          { name: "dynaura/solid", desc: <>Solid: {c("Toaster")}, {c("dynaura")}.</> },
          { name: "dynaura/angular", desc: <>Angular: {c("injectToaster")}, {c("dynaura")}.</> },
          { name: "dynaura/vanilla", desc: <>Plain JS: {c("createToaster")}, {c("dynaura")}.</> },
          { name: "dynaura/styles.css", desc: "The stylesheet. Import it once." },
          { name: "dynaura/styles-no-font.css", desc: <>The same stylesheet without the Google Fonts {c("@import")}. Use it with a strict CSP or your own font.</> },
        ]}
      />

      <H2 id="typescript">TypeScript</H2>
      <p>
        Exported types: {c("ToastOptions")}, {c("ToastType")}, {c("ToasterProps")}, {c("CustomTheme")}, {c("Position")}, {c("DismissReason")}, {c("AvatarItem")}, {c("Presence")} and {c("Content")}.
      </p>
      <Code lang="ts" code={`import type { ToastOptions, CustomTheme } from "dynaura";`} />
    </DocPage>
  );
}
