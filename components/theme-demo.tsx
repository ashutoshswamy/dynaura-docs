"use client";

import { dynaura, type Position } from "dynaura";
import { setToaster, useToasterConfig, type ThemeChoice } from "./toaster-store";

const themes: { value: ThemeChoice; label: string; swatch: string }[] = [
  { value: "dark", label: "Dark", swatch: "#000000" },
  { value: "light", label: "Light", swatch: "#ffffff" },
  { value: "system", label: "System", swatch: "linear-gradient(90deg,#000 50%,#fff 50%)" },
  { value: "custom", label: "Custom", swatch: "#2b1055" },
];

const pill =
  "inline-flex cursor-pointer items-center gap-2.5 rounded-full border py-2 pr-4 pl-2.5 text-sm font-medium transition-[transform,border-color,background-color] active:scale-[0.97]";

/** Switches the real Toaster `theme` prop, then fires a toast so the change is visible. */
export function ThemeSwitcher() {
  const { theme } = useToasterConfig();
  return (
    <div role="group" aria-label="Toaster theme" className="my-5 flex flex-wrap gap-2.5">
      {themes.map((t) => (
        <button
          key={t.value}
          type="button"
          aria-pressed={theme === t.value}
          onClick={() => {
            setToaster({ theme: t.value });
            dynaura.success({ title: `${t.label} theme`, description: "Set through the theme prop." });
          }}
          className={`${pill} ${theme === t.value ? "border-ink bg-ink text-bg" : "border-line bg-surface hover:border-ink/40"}`}
        >
          <span aria-hidden className="h-4 w-4 rounded-full border border-line" style={{ background: t.swatch }} />
          {t.label}
        </button>
      ))}
    </div>
  );
}

export const positions: Position[] = ["top-left", "top", "top-right", "bottom-left", "bottom", "bottom-right"];

/** Moves the real Toaster by changing its `position` prop. */
export function PositionPicker() {
  const { position } = useToasterConfig();
  return (
    <div role="group" aria-label="Toaster position" className="my-5 grid max-w-md grid-cols-3 gap-2">
      {positions.map((p) => (
        <button
          key={p}
          type="button"
          aria-pressed={position === p}
          onClick={() => {
            setToaster({ position: p });
            dynaura.info({ title: p, description: `position="${p}"`, duration: 2600 });
          }}
          className={`cursor-pointer rounded-full border px-3 py-2 text-sm font-medium transition-[transform,border-color,background-color] active:scale-[0.97] ${
            position === p ? "border-ink bg-ink text-bg" : "border-line bg-surface hover:border-ink/40"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
