import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { DocPage, H2, Table, Callout } from "@/components/doc-page";
import { Code } from "@/components/code-block";
import { ThemeSwitcher } from "@/components/theme-demo";

export const metadata: Metadata = pageMeta({
  title: "Theming",
  description: "Theme dynaura with dark, light, system or a custom theme, and override any CSS variable.",
  path: "/docs/theming",
});

const c = (s: string) => <code>{s}</code>;

export default function Page() {
  return (
    <DocPage
      href="/docs/theming"
      title="Theming"
      lead="Pick a built-in theme, hand over your own colors, or override the CSS variables directly."
      toc={[
        { id: "themes", label: "Themes" },
        { id: "custom", label: "Custom theme" },
        { id: "css", label: "CSS variables" },
        { id: "font", label: "Font" },
      ]}
    >
      <H2 id="themes">Themes</H2>
      <Code
        code={`<Toaster theme="light" />
<Toaster theme="system" />   {/* follows the OS */}
<Toaster theme={{ background: "#2b1055", foreground: "#ffffff", success: "#7cffcb" }} />`}
      />
      <p>
        Switch the island on this page between {c("dark")}, {c("light")}, {c("system")} (follows the OS) and a custom theme. Each button sets the real {c("theme")} prop. The site theme menu in the header is separate.
      </p>
      <ThemeSwitcher />

      <H2 id="custom">Custom theme</H2>
      <p>
        {c("CustomTheme")} keys take any CSS color, and all are optional. Missing keys fall back to the dark theme.
      </p>
      <Table
        head={["Key", "Controls"]}
        rows={[
          [c("background"), "Island fill."],
          [c("foreground"), "Primary text."],
          [c("muted"), "Secondary text."],
          [c("ring"), "Hairline around the island."],
          [c("button"), "Action button fill."],
          [<span key="s">{c("success")} {c("error")} {c("warning")} {c("info")}</span>, "State accents."],
          [<span key="l">{c("loading")} {c("live")}</span>, "Spinner and live-activity accents."],
        ]}
      />

      <H2 id="css">CSS variables</H2>
      <p>Everything is a CSS variable, so you can also override styles directly:</p>
      <Code
        lang="css"
        code={`.dynaura-root {
  --dynaura-font: "Inter", system-ui, sans-serif;
  --dynaura-duration: 500ms; /* morph speed */
  --dynaura-success: #00c853;
}`}
      />

      <H2 id="font">Font</H2>
      <p>
        The default font is Bricolage Grotesque, loaded by an <code>@import</code> on the first line of <code>dynaura/styles.css</code>. To self-host or skip the request, copy the stylesheet without that line and set <code>--dynaura-font</code>.
      </p>
      <Callout>
        <p>Card content inherits the toast colors through var(--dynaura-fg), var(--dynaura-muted) and var(--state), so rich cards follow any theme.</p>
      </Callout>
    </DocPage>
  );
}
