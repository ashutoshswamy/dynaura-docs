import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";
import { CodeTabs } from "./code-tabs";
import type { DemoId } from "./demos";

export async function highlight(code: string, lang: string) {
  "use cache"; // shiki touches Date.now() while loading grammars; cache it so it runs at build time
  return codeToHtml(code.trim(), {
    lang,
    themes: { light: "vitesse-light", dark: "vitesse-dark" },
    defaultColor: false,
  });
}

export async function Code({ code, lang = "tsx", title }: { code: string; lang?: string; title?: string }) {
  const html = await highlight(code, lang);
  return (
    <figure className="on-dark my-7 overflow-hidden rounded-[24px] bg-island text-island-fg">
      <div className="flex items-center justify-between px-5 pt-3 pb-1 text-xs text-island-fg/60">
        <span>{title ?? lang}</span>
        <CopyButton text={code.trim()} />
      </div>
      <div className="code-pre" dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}

export type Tab = { label: string; lang: string; code: string };

export async function CodeTabsBlock({ tabs, demo }: { tabs: Tab[]; demo?: DemoId }) {
  const rendered = await Promise.all(
    tabs.map(async (t) => ({ label: t.label, raw: t.code.trim(), html: await highlight(t.code, t.lang) })),
  );
  return <CodeTabs tabs={rendered} demo={demo} />;
}
