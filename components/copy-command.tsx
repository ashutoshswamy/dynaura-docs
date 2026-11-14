"use client";

import { useEffect, useRef, useState } from "react";

const spring = "cubic-bezier(0.34, 1.45, 0.64, 1)"; // overshoot, close to the pasted 260/20 spring

/**
 * Command line with a Copy button (ported from the pasted Copy Button study).
 * Click: the copy icon shrinks and turns away, a check pops in, the label rolls
 * up from Copy to Copied and the button width eases to fit. It rolls back after 1.8s.
 * ponytail: CSS transitions stand in for the spring engine; no autoplay loop.
 */
export function CopyCommand({ command = "npm install dynaura" }: { command?: string }) {
  const [on, setOn] = useState(false);
  const [w, setW] = useState<number | null>(null);
  const a = useRef<HTMLElement>(null);
  const b = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const measure = () => setW((on ? b.current : a.current)?.offsetWidth ?? null);
    measure();
    document.fonts?.ready.then(measure);
    return () => clearTimeout(timer.current);
  }, [on]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      return;
    }
    setOn(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOn(false), 1800);
  }

  const icon = "absolute inset-0 h-[18px] w-[18px] fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round]";
  return (
    <div className="flex w-[22rem] max-w-full items-center gap-3 rounded-[20px] border border-line bg-surface py-2 pr-2 pl-5">
      <code className="min-w-0 flex-1 truncate text-[0.82rem]">
        <span className="text-muted">$</span> {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={on ? "Copied to clipboard" : `Copy ${command}`}
        className="flex h-9 flex-none cursor-pointer items-center gap-1.5 overflow-hidden rounded-full bg-ink/[0.07] pr-3.5 pl-3 text-[0.82rem] font-medium transition-colors hover:bg-ink/[0.12]"
      >
        <span className="relative h-[18px] w-[18px] flex-none" aria-hidden>
          <svg
            viewBox="0 0 24 24"
            className={icon}
            strokeWidth={1.9}
            style={{
              opacity: on ? 0 : 1,
              transform: on ? "scale(0.5) rotate(-40deg)" : "none",
              transition: `opacity 200ms, transform 450ms ${spring}`,
            }}
          >
            <rect x="8.5" y="8.5" width="11" height="11" rx="3" />
            <path d="M15.5 8.5V7a2.5 2.5 0 0 0-2.5-2.5H7A2.5 2.5 0 0 0 4.5 7v6A2.5 2.5 0 0 0 7 15.5h1.5" />
          </svg>
          <svg
            viewBox="0 0 24 24"
            className={`${icon} text-accent-ink`}
            strokeWidth={2.4}
            style={{
              opacity: on ? 1 : 0,
              transform: on ? "none" : "scale(0.4)",
              transition: `opacity 200ms, transform 450ms ${spring}`,
            }}
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <span
          className="relative block h-[18px] overflow-hidden"
          style={{ width: w ?? undefined, transition: `width 450ms ${spring}` }}
        >
          <span
            className="flex flex-col"
            aria-hidden
            style={{ transform: on ? "translateY(-18px)" : "none", transition: `transform 450ms ${spring}` }}
          >
            <b ref={a} className="block h-[18px] w-fit leading-[18px] font-medium whitespace-nowrap">Copy</b>
            <b ref={b} className="block h-[18px] w-fit leading-[18px] font-medium whitespace-nowrap text-accent-ink">Copied</b>
          </span>
        </span>
      </button>
    </div>
  );
}
