"use client";

import { dynaura } from "dynaura";
import { PlayIcon } from "@heroicons/react/16/solid";
import {
  ArrowPathIcon,
  ArrowUpIcon,
  ArrowUpTrayIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
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
let saves = 0;

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
  secondary: () =>
    dynaura.success({
      title: "File deleted",
      description: "report-final.pdf moved to trash.",
      duration: 6000,
      button: { title: "Open trash", onClick: () => dynaura.info("Trash opened") },
      secondaryButton: { title: "Undo", onClick: () => dynaura.success("Restored") },
    }),
  custom: () =>
    dynaura.custom(
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", minWidth: 200 }}>
        <strong>Volume</strong>
        <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(128,128,128,.35)" }}>
          <div style={{ width: "64%", height: "100%", borderRadius: 3, background: "currentColor" }} />
        </div>
        <span>64</span>
      </div>,
      { duration: 3000 },
    ),
  byId: () => dynaura.info({ id: "save", title: `Saved ${++saves} times` }),
  callbacks: () =>
    dynaura.info({
      title: "Wait, swipe or press Escape",
      duration: 4000,
      onDismiss: (reason) => dynaura.success({ title: `onDismiss: ${reason}`, id: "reason", duration: 2000 }),
    }),
  clickable: () => dynaura.info({ title: "Tap the island", duration: 6000, onClick: () => dynaura.success({ id: "tap", title: "onClick fired" }) }),
  pause: () => {
    dynaura.info({ title: "Timers are paused", description: "Press Resume to continue.", duration: 3000 });
    dynaura.pause();
  },
  resume: () => dynaura.resume(),
  styled: () =>
    dynaura.success({
      title: "Purple, just this once",
      style: { "--dynaura-bg": "#2b1055", "--dynaura-fg": "#fff", "--dynaura-success": "#7cffcb" },
    }),
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

const setlist = [
  { id: "success", title: "Success", body: "A quiet confirmation.", Icon: CheckCircleIcon },
  { id: "error", title: "Error", body: "With an action to retry.", Icon: XCircleIcon },
  { id: "promise", title: "Promise", body: "Loading, then done.", Icon: ArrowPathIcon },
  { id: "progress", title: "Progress", body: "A live upload bar.", Icon: ArrowUpTrayIcon },
  { id: "card", title: "Rich card", body: "A boarding pass, in the island.", Icon: TicketIcon },
] satisfies { id: DemoId; title: string; body: string; Icon: typeof CheckCircleIcon }[];

/** Hero setlist: five rows, each fires the real island at the top of the page on click. */
export function HeroSetlist() {
  return (
    <ul aria-label="Try a toast" className="grid grid-cols-[minmax(0,1fr)] gap-1.5">
      {setlist.map(({ id, title, body, Icon }) => (
        <li key={id}>
          <button
            type="button"
            onClick={() => void demos[id]()}
            className="group flex w-full cursor-pointer items-center gap-4 rounded-[20px] p-3 pr-5 text-left transition-[transform,background-color] duration-200 hover:bg-white/[0.07] active:scale-[0.99]"
          >
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-white/[0.08] text-accent transition-colors group-hover:bg-accent group-hover:text-[#06140a]">
              <Icon className="h-6 w-6" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-2xl leading-tight font-semibold tracking-[-0.02em]">{title}</span>
              <span className="block text-[0.95rem] text-island-fg/65">{body}</span>
            </span>
            <ArrowUpIcon className="h-5 w-5 flex-none text-island-fg/70 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
          </button>
        </li>
      ))}
    </ul>
  );
}
