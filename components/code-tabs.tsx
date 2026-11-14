"use client";

import { useState } from "react";
import { PlayIcon } from "@heroicons/react/16/solid";
import { CopyButton } from "./copy-button";
import { demos, type DemoId } from "./demos";

type T = { label: string; raw: string; html: string };

export function CodeTabs({ tabs, demo }: { tabs: T[]; demo?: DemoId }) {
  const [i, setI] = useState(0);
  const cur = tabs[i];
  return (
    <figure className="my-6 overflow-hidden rounded-[20px] border border-line bg-code">
      <div className="flex items-center justify-between gap-2 border-b border-line px-2 py-1.5">
        <div role="tablist" className="flex gap-1 overflow-x-auto">
          {tabs.map((t, n) => (
            <button
              key={t.label}
              role="tab"
              type="button"
              aria-selected={n === i}
              onClick={() => setI(n)}
              className={`cursor-pointer whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors pointer-coarse:py-2.5 ${
                n === i ? "bg-ink text-bg" : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex flex-none items-center gap-1">
          <CopyButton text={cur.raw} />
          {demo && (
            <button
              type="button"
              onClick={() => void demos[demo]()}
              className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full bg-accent px-3.5 text-xs font-semibold text-[#06140a] transition-[transform,filter] hover:brightness-95 active:scale-[0.97]"
            >
              <PlayIcon className="h-3 w-3" aria-hidden />
              Run
            </button>
          )}
        </div>
      </div>
      <div role="tabpanel" className="code-pre" dangerouslySetInnerHTML={{ __html: cur.html }} />
    </figure>
  );
}
