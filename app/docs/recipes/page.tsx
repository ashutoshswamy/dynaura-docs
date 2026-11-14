import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { DocPage, H2, DemoBar } from "@/components/doc-page";
import { Code } from "@/components/code-block";
import { Try } from "@/components/demos";
import { PositionPicker } from "@/components/theme-demo";

export const metadata: Metadata = pageMeta({
  title: "Recipes",
  description: "dynaura recipes: actions, promises, progress, live activities, rich cards, queue and custom icons, each with a live demo.",
  path: "/docs/recipes",
});

export default function Page() {
  return (
    <DocPage
      href="/docs/recipes"
      title="Recipes"
      lead="Copy-ready patterns for the things toasts are actually used for. Each one has a live demo."
      toc={[
        { id: "actions", label: "Success, error and actions" },
        { id: "promises", label: "Promises" },
        { id: "progress", label: "Progress" },
        { id: "live", label: "Live activities" },
        { id: "cards", label: "Rich cards" },
        { id: "queue", label: "Queue" },
        { id: "icons", label: "Custom icons and slots" },
        { id: "sticky", label: "Sticky, update and dismiss" },
        { id: "positions", label: "Positions" },
      ]}
    >
      <H2 id="actions">Success, error and actions</H2>
      <p>
        The island expands to show the description and button, then collapses before it dismisses. A <code>button</code> click dismisses the toast.
      </p>
      <Code
        code={`dynaura.error({
  title: "Payment failed",
  description: "Card ending 4242 was declined.",
  button: { title: "Retry", onClick: retry },
});`}
      />
      <DemoBar>
        <Try id="error">Error with action</Try>
        <Try id="warning" variant="outline">Warning</Try>
        <Try id="info" variant="outline">Info</Try>
      </DemoBar>

      <H2 id="promises">Promises</H2>
      <p>
        The same island morphs from loading to success or error. <code>success</code> and <code>error</code> can be strings, option objects, or functions of the result. The original promise is returned.
      </p>
      <Code
        code={`dynaura.promise(save(), {
  loading: "Saving...",
  success: (data) => ({ title: "Saved", description: \`Version \${data.v}\` }),
  error: { title: "Failed", description: "Check your connection." },
});`}
      />
      <DemoBar>
        <Try id="promise">Run promise</Try>
      </DemoBar>

      <H2 id="progress">Progress</H2>
      <p>
        Create a sticky loading toast, then patch it with <code>dynaura.update</code>. Frequent <code>progress</code> updates do not restart the toast. Pass <code>progress: undefined</code> to clear the bar.
      </p>
      <Code
        code={`const id = dynaura.loading({ title: "Uploading", progress: 0 });

onProgress((p) => dynaura.update(id, { progress: p })); // 0 to 1

dynaura.update(id, {
  type: "success",
  title: "Upload complete",
  progress: undefined, // clear the bar
  duration: 4000,
  confetti: true,
});`}
      />
      <DemoBar>
        <Try id="progress">Simulate upload</Try>
      </DemoBar>

      <H2 id="live">Live activities</H2>
      <p>
        Sticky toasts with a running timer by default, or an animated waveform with <code>kind: &quot;wave&quot;</code>.
      </p>
      <Code
        code={`dynaura.live({
  title: "Recording voice memo",
  button: { title: "Stop", onClick: stop },
});

dynaura.live({ title: "Now playing", kind: "wave" }); // waveform instead of a timer`}
      />
      <DemoBar>
        <Try id="live">Timer</Try>
        <Try id="wave" variant="outline">Waveform</Try>
        <Try id="clear" variant="outline">Clear</Try>
      </DemoBar>

      <H2 id="cards">Rich cards</H2>
      <p>
        <code>variant: &quot;card&quot;</code> makes a header tab plus any custom body, joined by a curved notch. Card content inherits colors through <code>var(--dynaura-fg)</code>, <code>var(--dynaura-muted)</code> and <code>var(--state)</code>, so it follows any theme. The header tab follows <code>position</code>: centered for <code>top</code> and <code>bottom</code>, flush to the edge for <code>-left</code> and <code>-right</code>.
      </p>
      <Code
        code={`dynaura.info({
  title: "Boarding soon",
  trailing: "40 min",
  variant: "card",
  duration: 9000,
  description: <BoardingPass />, // any React node (a DOM Node in Vue, Svelte and vanilla)
  button: { title: "Show boarding pass", onClick: openPass },
});`}
      />
      <DemoBar>
        <Try id="card">Boarding pass</Try>
      </DemoBar>

      <H2 id="queue">Queue</H2>
      <p>Show toasts one after another instead of replacing the current one. Set it on the Toaster, or per toast.</p>
      <Code
        code={`// every toast waits its turn
<Toaster queue />

// or per toast
dynaura.info({ title: "Invite sent to Maya", queue: true, duration: 1600 });`}
      />
      <DemoBar>
        <Try id="queue">Queue three</Try>
      </DemoBar>

      <H2 id="icons">Custom icons and slots</H2>
      <p>
        <code>icon</code> replaces the built-in icon. <code>trailing</code> is a small right-side slot.
      </p>
      <Code
        code={`import { CalendarDaysIcon } from "@heroicons/react/24/outline";

dynaura.info({
  title: "Design sync starts soon",
  icon: <CalendarDaysIcon width={16} height={16} />, // replaces the built-in icon
  trailing: "5 min", // small right-side slot
});`}
      />
      <DemoBar>
        <Try id="icon">Custom icon</Try>
      </DemoBar>

      <H2 id="sticky">Sticky, update and dismiss</H2>
      <p>
        <code>duration: null</code> keeps a toast open. Every call returns an id, so you can patch it with <code>update</code> (including its <code>type</code>) or remove it with <code>dismiss(id)</code>. <code>dismiss()</code> with no id closes the current toast, and <code>clear()</code> removes everything including the queue.
      </p>
      <Code
        code={`const id = dynaura.info({ title: "Sticky until dismissed", duration: null });
dynaura.dismiss(id);      // one toast
dynaura.dismiss();        // the current toast, then the next queued one shows
dynaura.clear();          // everything

const sync = dynaura.loading({ title: "Syncing" });
dynaura.update(sync, { type: "success", title: "Synced", duration: 3500 });`}
      />
      <DemoBar>
        <Try id="sticky">Show sticky</Try>
        <Try id="dismissSticky" variant="outline">Dismiss it</Try>
        <Try id="update" variant="outline">Update in place</Try>
        <Try id="clear" variant="outline">Clear all</Try>
      </DemoBar>

      <H2 id="positions">Positions</H2>
      <p>
        Six positions: <code>top</code>, <code>top-left</code>, <code>top-right</code>, <code>bottom</code>, <code>bottom-left</code> and <code>bottom-right</code>. Safe-area insets are added to <code>offset</code>. This changes the island on this page, so reload to reset it.
      </p>
      <Code lang="tsx" code={`<Toaster position="bottom-right" offset={16} />`} />
      <PositionPicker />
    </DocPage>
  );
}
