"use client";

import { useState } from "react";
import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/16/solid";
import { dynaura } from "dynaura";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          dynaura.success({ title: "Copied", duration: 1400 });
          setTimeout(() => setDone(false), 1400);
        } catch {
          dynaura.error({ title: "Copy failed", description: "Select the text and copy it manually." });
        }
      }}
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium pointer-coarse:px-3.5 pointer-coarse:py-2.5 text-muted transition-colors hover:bg-line hover:text-ink in-[.on-dark]:text-island-fg/65 in-[.on-dark]:hover:bg-white/10 in-[.on-dark]:hover:text-island-fg active:scale-[0.97]"
    >
      {done ? <CheckIcon className="h-3.5 w-3.5" aria-hidden /> : <ClipboardDocumentIcon className="h-3.5 w-3.5" aria-hidden />}
      {done ? "Copied" : label}
    </button>
  );
}
