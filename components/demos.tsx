"use client";

import { dynaura } from "dynaura";
import { PlayIcon } from "@heroicons/react/16/solid";
import {
  ArrowPathIcon,
  ArrowUpIcon,
  ArrowUpTrayIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  MicrophoneIcon,
  TicketIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function BoardingPass() {
  const cell = "flex flex-col gap-0.5";
  const label = { color: "var(--dynaura-muted)", fontSize: 11 } as const;
  return (
    <div style={{ display: "grid", gap: 14, padding: "4px 4px 8px", minWidth: 280 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
        <div className={cell}>
          <span style={label}>From</span>
          <strong style={{ fontSize: 28, lineHeight: 1, letterSpacing: "-0.02em" }}>BLR</strong>
        </div>
        <div className={cell} style={{ textAlign: "right" }}>
          <span style={label}>To</span>
          <strong style={{ fontSize: 28, lineHeight: 1, letterSpacing: "-0.02em" }}>SFO</strong>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
        <div className={cell}>
          <span style={label}>Gate</span>
          <strong>B14</strong>
        </div>
        <div className={cell}>
          <span style={label}>Seat</span>
          <strong>22A</strong>
        </div>
        <div className={cell} style={{ textAlign: "right" }}>
          <span style={label}>Boards</span>
          <strong>09:35</strong>
        </div>
      </div>
    </div>
  );
}

let stickyId: string | undefined;

export const demos = {
  success: () => dynaura.success({ title: "Saved", description: "Your changes are live." }),
  error: () =>
    dynaura.error({
      title: "Payment failed",
      description: "Card ending 4242 was declined.",
      button: { title: "Retry", onClick: () => dynaura.success("Retrying payment") },
    }),
  warning: () => dynaura.warning({ title: "Storage almost full", description: "92 MB of 100 MB used." }),
  info: () => dynaura.info({ title: "Invite sent to Maya", trailing: "now" }),
  promise: () =>
    dynaura.promise(wait(1800).then(() => ({ v: 14 })), {
      loading: "Saving...",
      success: (d: { v: number }) => ({ title: "Saved", description: `Version ${d.v}` }),
      error: { title: "Failed", description: "Check your connection." },
    }),
  progress: async () => {
    const id = dynaura.loading({ title: "Uploading", progress: 0 });
    for (let p = 0; p <= 1; p += 0.05) {
      await wait(110);
      dynaura.update(id, { progress: Math.min(p, 1) });
    }
    dynaura.update(id, {
      type: "success",
      title: "Upload complete",
      progress: undefined,
      duration: 4000,
      confetti: true,
    });
  },
  live: () =>
    dynaura.live({
      title: "Recording voice memo",
      button: { title: "Stop", onClick: () => dynaura.success("Memo saved") },
    }),
  wave: () => dynaura.live({ title: "Now playing", kind: "wave", button: { title: "Pause", onClick: () => {} } }),
  card: () =>
    dynaura.info({
      title: "Boarding soon",
      trailing: "40 min",
      variant: "card",
      duration: 9000,
      description: <BoardingPass />,
      button: { title: "Show boarding pass", onClick: () => dynaura.success("Pass opened") },
    }),
  queue: () => {
    dynaura.info({ title: "Invite sent to Maya", queue: true, duration: 1600 });
    dynaura.success({ title: "Maya joined", queue: true, duration: 1600 });
    dynaura.info({ title: "Workspace ready", queue: true, duration: 1600 });
  },
  icon: () =>
    dynaura.info({
      title: "Design sync starts soon",
      icon: <CalendarDaysIcon width={16} height={16} />,
      trailing: "5 min",
    }),
  sticky: () => {
    stickyId = dynaura.info({ title: "Sticky until dismissed", description: "duration: null keeps it open.", duration: null });
  },
  dismissSticky: () => {
    if (stickyId !== undefined) dynaura.dismiss(stickyId);
    else dynaura.dismiss();
  },
  update: async () => {
    const id = dynaura.loading({ title: "Syncing" });
    await wait(1500);
    dynaura.update(id, { type: "success", title: "Synced", description: "3 files updated.", duration: 3500 });
  },
  clear: () => dynaura.clear(),
} satisfies Record<string, () => unknown>;

export type DemoId = keyof typeof demos;

const base =
  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-[transform,background-color,border-color] duration-200 active:scale-[0.97] active:translate-y-px cursor-pointer";

/** Primary pill button that fires a real dynaura toast. */
export function Try({ id, children, variant = "solid" }: { id: DemoId; children?: ReactNode; variant?: "solid" | "outline" | "invert" }) {
  const style =
    variant === "solid"
      ? "bg-ink text-bg hover:bg-ink/85"
      : variant === "invert"
        ? "bg-island-fg text-island hover:bg-island-fg/85"
        : "border border-line bg-surface text-ink hover:border-ink/40";
  return (
    <button type="button" onClick={() => void demos[id]()} className={`${base} ${style}`}>
      <PlayIcon className="h-3.5 w-3.5" aria-hidden />
      {children ?? "Try it"}
    </button>
  );
}

/** Hero panel: dark brand panel in the same language as the feature explorer and footer. */
export function HeroPanel({ codeHtml }: { codeHtml: string }) {
  const rows = [
    { id: "success", label: "Success", Icon: CheckCircleIcon },
    { id: "error", label: "Error with action", Icon: XCircleIcon },
    { id: "promise", label: "Promise", Icon: ArrowPathIcon },
    { id: "progress", label: "Progress", Icon: ArrowUpTrayIcon },
    { id: "live", label: "Live activity", Icon: MicrophoneIcon },
    { id: "card", label: "Rich card", Icon: TicketIcon },
  ] satisfies { id: DemoId; label: string; Icon: typeof CheckCircleIcon }[];
  return (
    <div className="on-dark rounded-[28px] bg-island p-6 text-island-fg sm:p-8">
      <h2 className="font-display text-3xl font-semibold tracking-[-0.03em]">Try it live</h2>
      <p className="mt-2 flex items-center gap-2 text-island-fg/65">
        <ArrowUpIcon className="h-4 w-4 flex-none text-accent" aria-hidden />
        The island appears at the top of the page.
      </p>
      <div className="mt-7 grid grid-cols-[minmax(0,1fr)] gap-2 sm:grid-cols-2">
        {rows.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => void demos[id]()}
            className="flex cursor-pointer items-center gap-3 rounded-full bg-white/[0.07] py-2 pr-5 pl-2 text-left text-[0.95rem] font-medium transition-[transform,background-color] hover:bg-white/[0.13] active:scale-[0.98]"
          >
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-accent text-[#06140a]">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            {label}
          </button>
        ))}
      </div>
      <div className="mt-6 overflow-hidden rounded-[20px] bg-white/[0.06]">
        <div className="code-pre" dangerouslySetInnerHTML={{ __html: codeHtml }} />
      </div>
    </div>
  );
}
