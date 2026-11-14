import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { DocPage } from "@/components/doc-page";
import { Playground } from "@/components/playground";

export const metadata: Metadata = pageMeta({
  title: "Playground",
  description: "Interactive dynaura playground: change every Toaster option and toast option, run it, and copy the code.",
  path: "/docs/playground",
});

export default function Page() {
  return (
    <DocPage
      href="/docs/playground"
      title="Playground"
      lead="Every option in one place. Change a setting, show the toast, and copy the code that produced it."
      toc={[{ id: "playground", label: "Playground" }]}
    >
      <div id="playground">
        <Playground />
      </div>
    </DocPage>
  );
}
