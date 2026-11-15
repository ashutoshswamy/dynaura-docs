"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { dynaura } from "dynaura";
import { siAngular, siJavascript, siReact, siSolid, siSvelte, siVuedotjs } from "simple-icons";
import {
  ArrowRightIcon,
  ArrowsRightLeftIcon,
  ChartBarIcon,
  CodeBracketIcon,
  HandRaisedIcon,
  MicrophoneIcon,
  QueueListIcon,
  SwatchIcon,
  TicketIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/16/solid";
import { demos } from "./demos";
import { features } from "./features-data";
import { setToaster } from "./toaster-store";

type Action = { label: string; run: () => unknown };

const icons: Record<string, typeof TicketIcon> = {
  morph: ArrowsRightLeftIcon,
  cards: TicketIcon,
  live: MicrophoneIcon,
  progress: ChartBarIcon,
  touch: HandRaisedIcon,
  theme: SwatchIcon,
  queue: QueueListIcon,
  frameworks: CodeBracketIcon,
  a11y: ShieldCheckIcon,
};

const actions: Record<string, Action[]> = {
  morph: [
    { label: "Success", run: demos.success },
    { label: "Error with action", run: demos.error },
  ],
  cards: [{ label: "Boarding pass", run: demos.card }],
  live: [
    { label: "Timer", run: demos.live },
    { label: "Waveform", run: demos.wave },
  ],
  progress: [{ label: "Simulate upload", run: demos.progress }],
  touch: [{ label: "Show a toast to swipe", run: demos.error }],
  theme: [
    { label: "Light", run: () => { setToaster({ theme: "light" }); dynaura.success("Light theme"); } },
    { label: "Custom", run: () => { setToaster({ theme: "custom" }); dynaura.success("Custom theme"); } },
    { label: "Reset", run: () => { setToaster({ theme: "dark" }); dynaura.success("Dark theme"); } },
  ],
  queue: [
    { label: "Queue three", run: demos.queue },
    { label: "Bottom right", run: () => { setToaster({ position: "bottom-right" }); dynaura.info("bottom-right"); } },
    { label: "Back to top", run: () => { setToaster({ position: "top" }); dynaura.info("top"); } },
  ],
};

const logos = [
  { name: "React", path: siReact.path },
  { name: "Vue", path: siVuedotjs.path },
  { name: "Svelte", path: siSvelte.path },
  { name: "Solid", path: siSolid.path },
  { name: "Angular", path: siAngular.path },
  { name: "JavaScript", path: siJavascript.path },
];

export function FeatureExplorer({ html }: { html: Record<string, string> }) {
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const f = features[i];
  const Icon = icons[f.id];

  function onKey(e: KeyboardEvent) {
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % features.length
      : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i - 1 + features.length) % features.length
      : e.key === "Home" ? 0
      : e.key === "End" ? features.length - 1
      : null;
    if (next === null) return;
    e.preventDefault();
    setI(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)] lg:gap-6">
      {/* tab list: horizontal scroller on small screens, vertical rail on desktop */}
      <div
        role="tablist"
        aria-label="Features"
        aria-orientation="vertical"
        onKeyDown={onKey}
        className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {features.map((x, n) => {
          const I = icons[x.id];
          const on = n === i;
          return (
            <button
              key={x.id}
              ref={(el) => { refs.current[n] = el; }}
              role="tab"
              id={`tab-${x.id}`}
              aria-selected={on}
              aria-controls="feature-panel"
              tabIndex={on ? 0 : -1}
              type="button"
              onClick={() => setI(n)}
              className={`group flex flex-none cursor-pointer items-center gap-3.5 rounded-full py-2.5 pr-5 pl-2.5 text-left font-medium whitespace-nowrap transition-[background-color,color] lg:whitespace-normal ${
                on ? "bg-ink text-bg" : "text-muted hover:bg-line/60 hover:text-ink"
              }`}
            >
              <span
                className={`flex h-9 w-9 flex-none items-center justify-center rounded-full transition-colors ${
                  on ? "bg-accent text-[#06140a]" : "bg-accent-soft text-accent-ink"
                }`}
              >
                <I className="h-[18px] w-[18px]" aria-hidden />
              </span>
              {x.title}
            </button>
          );
        })}
      </div>

      {/* the dark brand panel: one feature at a time, with a live control and the code behind it */}
      <div
        role="tabpanel"
        id="feature-panel"
        aria-labelledby={`tab-${f.id}`}
        className="on-dark flex min-h-[34rem] flex-col rounded-[28px] bg-island p-6 text-island-fg sm:p-9"
      >
        <div key={f.id} className="hero-in flex flex-1 flex-col">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-[#06140a]">
            <Icon className="h-6 w-6" aria-hidden />
          </span>
          <h3 className="mt-6 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{f.title}</h3>
          <p className="mt-3 max-w-[44ch] text-lg leading-relaxed text-island-fg/70">{f.body}</p>

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            {f.id === "frameworks" ? (
              <ul className="flex items-center gap-6 py-1.5 text-island-fg/80">
                {logos.map((l) => (
                  <li key={l.name}>
                    <svg role="img" aria-label={l.name} viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
                      <path d={l.path} />
                    </svg>
                  </li>
                ))}
              </ul>
            ) : f.id === "a11y" ? (
              <ul className="flex flex-wrap gap-2 text-sm">
                {["Zero dependencies", "Types included", "aria-live", "Reduced motion"].map((t) => (
                  <li key={t} className="rounded-full border border-white/15 px-3.5 py-1.5 text-island-fg/80">
                    {t}
                  </li>
                ))}
              </ul>
            ) : (
              (actions[f.id] ?? []).map((a, n) => (
                <button
                  key={a.label}
                  type="button"
                  onClick={() => void a.run()}
                  className={`inline-flex h-11 cursor-pointer items-center gap-2 rounded-full px-5 text-sm font-semibold transition-[transform,background-color] active:scale-[0.97] ${
                    n === 0 ? "bg-island-fg text-island hover:bg-island-fg/85" : "border border-white/20 text-island-fg hover:bg-white/10"
                  }`}
                >
                  <PlayIcon className="h-3.5 w-3.5" aria-hidden />
                  {a.label}
                </button>
              ))
            )}
          </div>

          <div className="mt-auto pt-8">
            <div className="overflow-hidden rounded-[20px] bg-white/[0.06]">
              <div className="code-pre" dangerouslySetInnerHTML={{ __html: html[f.id] }} />
            </div>
            <Link href={f.href} className="plain mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
              Read the docs
              <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
