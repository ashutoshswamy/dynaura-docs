import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { DocPage, H2, DemoBar } from "@/components/doc-page";
import { Code } from "@/components/code-block";
import { Try } from "@/components/demos";
import { PositionPicker } from "@/components/theme-demo";

export const metadata: Metadata = pageMeta({
  title: "Recipes",
  description: "dynaura recipes: actions, promises, progress, live activities, rich cards, avatars, queue, undo, custom bodies, callbacks and pause, each with a live demo.",
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
        { id: "avatars", label: "Avatars" },
        { id: "two-actions", label: "Two actions" },
        { id: "custom-body", label: "Custom body" },
        { id: "ids", label: "Ids and dedupe" },
        { id: "callbacks", label: "Callbacks and click" },
        { id: "pause", label: "Pause and resume" },
        { id: "style", label: "Per-toast style" },
        { id: "swipe", label: "Swipe direction" },
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
        <code>variant: &quot;card&quot;</code> makes a header tab plus any custom body, joined by a curved notch. Card content inherits colors through <code>var(--dynaura-fg)</code>, <code>var(--dynaura-muted)</code> and <code>var(--state)</code>, so it follows any theme. The header tab follows <code>position</code>: centered for <code>top</code> and <code>bottom</code>, flush to the edge for <code>-left</code>, <code>-right</code>, <code>-start</code> and <code>-end</code>.
      </p>
      <Code
        code={`dynaura.info({
  title: "Boarding soon",
  trailing: "40 min",
  variant: "card",
  duration: 9000,
  description: <BoardingPass />, // any React node (a DOM Node in Vue, Svelte, Solid, Angular and vanilla)
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
      <p>
        Cap the line with <code>maxQueue</code>: beyond it the oldest waiting toast is dropped. Collapse repeats with <code>dedupe=&quot;title&quot;</code>.
      </p>
      <Code lang="tsx" code={`<Toaster queue maxQueue={3} dedupe="title" />`} />
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

      <H2 id="avatars">Avatars</H2>
      <p>
        <code>avatar</code> takes a URL, an <code>{"{ src?, name?, presence? }"}</code> object, or an array of either. With no <code>src</code>, or when an image fails to load, the face becomes a gradient disc with initials. <code>typing</code> adds animated dots after the title.
      </p>
      <Code
        code={`// a name is enough: gradient + initials, which is also the fallback for a broken image
dynaura.info({
  title: "Ana is typing",
  typing: true,
  avatar: { name: "Ana Ruiz", src: anaUrl, presence: "online" },
});`}
      />
      <DemoBar>
        <Try id="avatar">Typing</Try>
      </DemoBar>
      <p>
        An array becomes an overlapping group. <code>avatarMax</code> (default 3) sets how many faces show before a <code>+N</code> chip. <code>onAvatarClick(i)</code> fires on a tap, or Enter and Space on a focused face; the chip reports <code>avatarMax</code>. It does not trigger <code>onClick</code> or pin the toast.
      </p>
      <Code
        code={`dynaura.info({
  title: "6 new comments",
  avatar: people,        // (string | { src?, name?, presence? })[]
  avatarMax: 4,          // 4 faces, then "+2"
  onAvatarClick: (i) => openProfile(people[i]),
});`}
      />
      <DemoBar>
        <Try id="avatarGroup">Group</Try>
      </DemoBar>
      <p>
        <code>avatarPosition: &quot;card&quot;</code> turns the toast into a boarding-pass style card: header tab, big faces with name and presence, a perforated tear line, then the description and buttons. It implies <code>variant: &quot;card&quot;</code>.
      </p>
      <Code
        code={`dynaura.info({
  title: "Meet your host",
  description: "Design lead, joined 2021.",
  avatar: { name: "Ana Ruiz", src: anaUrl, presence: "online" },
  avatarPosition: "card",
  button: { title: "Say hello", onClick: sayHello },
});`}
      />
      <DemoBar>
        <Try id="avatarCard">Host card</Try>
      </DemoBar>

      <H2 id="two-actions">Two actions</H2>
      <p>
        <code>secondaryButton</code> sits next to <code>button</code>. Both dismiss the toast after the click, so undo-after-delete is one call.
      </p>
      <Code
        code={`dynaura.success({
  title: "File deleted",
  duration: 6000,
  button: { title: "Open trash", onClick: openTrash },
  secondaryButton: { title: "Undo", onClick: restore },
});`}
      />
      <DemoBar>
        <Try id="secondary">Delete file</Try>
      </DemoBar>

      <H2 id="custom-body">Custom body</H2>
      <p>
        <code>dynaura.custom()</code> gives you the whole island: no title row and no card variant. Pass a string, a DOM Node or (in React) any element. It takes the usual options.
      </p>
      <Code lang="tsx" code={`dynaura.custom(<Volume level={64} />, { duration: 3000 });`} />
      <DemoBar>
        <Try id="custom">Show volume</Try>
      </DemoBar>

      <H2 id="ids">Ids and dedupe</H2>
      <p>
        Give a toast an <code>id</code> and showing it again updates it in place, restarting its timer, instead of stacking. Calls return that same id.
      </p>
      <Code code={`dynaura.info({ id: "save", title: \`Saved \${++n} times\` });`} />
      <DemoBar>
        <Try id="byId">Save repeatedly</Try>
      </DemoBar>

      <H2 id="callbacks">Callbacks and click</H2>
      <p>
        <code>onShow</code> fires when the toast appears, <code>onDismiss(reason)</code> when it ends (<code>&quot;timeout&quot;</code>, <code>&quot;swipe&quot;</code>, <code>&quot;button&quot;</code>, <code>&quot;escape&quot;</code> or <code>&quot;api&quot;</code>) and <code>onAutoClose</code> when its duration runs out. <code>onClick</code> fires on a tap of the island, not its buttons.
      </p>
      <Code
        code={`dynaura.info({
  title: "Wait, swipe or press Escape",
  onShow: () => track("toast_shown"),
  onDismiss: (reason) => track("toast_ended", reason),
  onAutoClose: () => track("toast_timeout"),
  onClick: () => openInbox(),
});`}
      />
      <DemoBar>
        <Try id="callbacks">Watch the reason</Try>
        <Try id="clickable" variant="outline">Tap the island</Try>
      </DemoBar>

      <H2 id="pause">Pause and resume</H2>
      <p>
        <code>dynaura.pause()</code> freezes every timer, for example while a modal is open. Toasts shown meanwhile start frozen. Call <code>resume()</code> to release them.
      </p>
      <Code code={`dynaura.pause();   // modal opens\ndynaura.resume();  // modal closes`} />
      <DemoBar>
        <Try id="pause">Pause</Try>
        <Try id="resume" variant="outline">Resume</Try>
      </DemoBar>

      <H2 id="style">Per-toast style</H2>
      <p>
        <code>className</code> and <code>style</code> apply to one toast only and are removed when the next one shows. CSS variables work, so a single toast can use its own theme without any global CSS.
      </p>
      <Code
        code={`dynaura.success({
  title: "Purple, just this once",
  className: "mine",
  style: { "--dynaura-bg": "#2b1055", "--dynaura-fg": "#fff", "--dynaura-success": "#7cffcb" },
});`}
      />
      <DemoBar>
        <Try id="styled">Show toast</Try>
      </DemoBar>

      <H2 id="swipe">Swipe direction</H2>
      <p>
        By default a swipe toward the anchored screen edge dismisses. Change it with the <code>swipe</code> Toaster option: <code>&quot;up&quot;</code>, <code>&quot;down&quot;</code>, <code>&quot;both&quot;</code> (either vertical way) or <code>&quot;none&quot;</code>. Horizontal swiping is not supported.
      </p>
      <Code lang="tsx" code={`<Toaster swipe="both" />`} />

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
        Six physical positions: <code>top</code>, <code>top-left</code>, <code>top-right</code>, <code>bottom</code>, <code>bottom-left</code> and <code>bottom-right</code>. For right-to-left pages use the logical <code>top-start</code>, <code>top-end</code>, <code>bottom-start</code> and <code>bottom-end</code>, which flip with the page direction. Safe-area insets are added to <code>offset</code>. This changes the island on this page, so reload to reset it.
      </p>
      <Code lang="tsx" code={`<Toaster position="bottom-right" offset={16} />`} />
      <PositionPicker />
    </DocPage>
  );
}
