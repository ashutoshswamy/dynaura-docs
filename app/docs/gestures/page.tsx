import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { DocPage, H2, Table, DemoBar } from "@/components/doc-page";
import { Try } from "@/components/demos";

export const metadata: Metadata = pageMeta({
  title: "Gestures",
  description: "How dynaura reacts to hover, tap, long-press and swipe.",
  path: "/docs/gestures",
});

export default function Page() {
  return (
    <DocPage
      href="/docs/gestures"
      title="Gestures"
      lead="The island is built for touch first and still feels right with a mouse."
      toc={[
        { id: "reference", label: "Reference" },
        { id: "try", label: "Try it" },
      ]}
    >
      <H2 id="reference">Reference</H2>
      <Table
        head={["Gesture", "Result"]}
        rows={[
          [<strong key="1">Hover</strong>, "Expands and pauses the timer. Leaving resumes with the exact time left."],
          [<strong key="2">Tap</strong>, "Pins an expandable toast open and paused. Tap outside to unpin."],
          [<strong key="3">Long-press</strong>, "Pins, with haptic feedback."],
          [<strong key="4">Swipe toward the screen edge</strong>, "Dismisses. A short swipe snaps back."],
        ]}
      />
      <p>
        Timers track remaining time, so hover, drag and pin pause and resume exactly.
      </p>

      <H2 id="try">Try it</H2>
      <p>Fire a toast with a description, then hover it, tap it, or drag it toward the edge of the screen.</p>
      <DemoBar>
        <Try id="error">Show a toast</Try>
      </DemoBar>
    </DocPage>
  );
}
