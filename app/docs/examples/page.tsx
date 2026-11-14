import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { DocPage } from "@/components/doc-page";
import { highlight } from "@/components/code-block";
import { ExamplesBrowser } from "@/components/examples-browser";
import { examples } from "@/components/examples-data";

export const metadata: Metadata = pageMeta({
  title: "Examples",
  description: "dynaura examples by category: feedback, async, live activities, rich cards, social and commerce. Run each one live.",
  path: "/docs/examples",
});

export default async function Page() {
  const items = await Promise.all(
    examples.map(async (e) => ({
      id: e.id,
      category: e.category,
      title: e.title,
      description: e.description,
      raw: e.code,
      html: await highlight(e.code, "tsx"),
    })),
  );
  return (
    <DocPage
      href="/docs/examples"
      title="Examples"
      lead="Real situations, grouped by category. Run each one, then copy the code."
      toc={[{ id: "browse", label: "Browse examples" }]}
    >
      <div id="browse">
        <ExamplesBrowser items={items} />
      </div>
    </DocPage>
  );
}
