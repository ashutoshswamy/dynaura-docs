"use client";

import { useId, useState, type ReactNode } from "react";
import { dynaura, type ToastOptions } from "dynaura";
import { PlayIcon } from "@heroicons/react/16/solid";
import { CopyButton } from "./copy-button";
import { positions } from "./theme-demo";
import { setToaster, useToasterConfig, type ThemeChoice } from "./toaster-store";

type Kind = "success" | "error" | "warning" | "info" | "loading" | "live";
const kinds: Kind[] = ["success", "error", "warning", "info", "loading", "live"];

const field =
  "w-full rounded-full border border-line bg-bg px-4 py-2.5 text-base text-ink placeholder:text-muted sm:text-sm focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

function Field({ label, children }: { label: string; children: (id: string) => ReactNode }) {
  const id = useId();
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children(id)}
    </div>
  );
}

function Seg<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="grid gap-2">
      <span className="text-sm font-medium">{label}</span>
      <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors pointer-coarse:py-2.5 ${
              value === o ? "border-ink bg-ink text-bg" : "border-line bg-bg text-muted hover:text-ink"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Switch({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-full py-1 text-left text-sm font-medium"
    >
      {label}
      <span className={`relative h-6 w-11 flex-none rounded-full transition-colors ${checked ? "bg-accent" : "bg-ink/25"}`}>
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </span>
    </button>
  );
}

const q = (s: string) => JSON.stringify(s);

export function Playground() {
  const cfg = useToasterConfig();
  const [kind, setKind] = useState<Kind>("success");
  const [title, setTitle] = useState("Saved");
  const [description, setDescription] = useState("Your changes are live.");
  const [trailing, setTrailing] = useState("");
  const [duration, setDuration] = useState<"4000" | "8000" | "sticky">("4000");
  const [action, setAction] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [card, setCard] = useState(false);
  const [queue, setQueue] = useState(false);
  const [progress, setProgress] = useState(0.4);
  const [wave, setWave] = useState(false);

  const opts: ToastOptions = { title: title || "Untitled" };
  if (description) opts.description = description;
  if (trailing) opts.trailing = trailing;
  if (duration === "8000") opts.duration = 8000;
  if (duration === "sticky") opts.duration = null;
  if (action) opts.button = { title: "Undo", onClick: () => dynaura.success("Undone") };
  if (confetti) opts.confetti = true;
  if (card) opts.variant = "card";
  if (queue) opts.queue = true;
  if (kind === "loading") opts.progress = progress;
  if (kind === "live" && wave) opts.kind = "wave";

  // the code shown is built from the same options that run
  const lines = [`  title: ${q(opts.title)},`];
  if (description) lines.push(`  description: ${q(description)},`);
  if (trailing) lines.push(`  trailing: ${q(trailing)},`);
  if (duration === "8000") lines.push("  duration: 8000,");
  if (duration === "sticky") lines.push("  duration: null,");
  if (action) lines.push('  button: { title: "Undo", onClick: undo },');
  if (confetti) lines.push("  confetti: true,");
  if (card) lines.push('  variant: "card",');
  if (queue) lines.push("  queue: true,");
  if (kind === "loading") lines.push(`  progress: ${progress.toFixed(2)},`);
  if (kind === "live" && wave) lines.push('  kind: "wave",');
  const toastCode = `dynaura.${kind}({\n${lines.join("\n")}\n});`;

  const themeProp = cfg.theme === "custom" ? "{{ background: \"#2b1055\", foreground: \"#ffffff\", success: \"#7cffcb\" }}" : `"${cfg.theme}"`;
  const toasterProps = [`position="${cfg.position}"`];
  if (cfg.offset !== 12) toasterProps.push(`offset={${cfg.offset}}`);
  toasterProps.push(`theme=${cfg.theme === "custom" ? themeProp : themeProp}`);
  if (cfg.queue) toasterProps.push("queue");
  if (!cfg.timer) toasterProps.push("timer={false}");
  if (!cfg.haptics) toasterProps.push("haptics={false}");
  const toasterCode = `<Toaster ${toasterProps.join(" ")} />`;

  const panel = "rounded-[28px] border border-line bg-surface p-6 sm:p-7";
  const h = "font-display text-xl font-semibold tracking-tight";

  return (
    <div className="not-prose grid gap-6 xl:grid-cols-2">
      {/* toaster options */}
      <section aria-labelledby="pg-toaster" className={`${panel} grid content-start gap-6`}>
        <h3 id="pg-toaster" className={h}>
          Toaster options
        </h3>
        <div className="grid gap-2">
          <span className="text-sm font-medium">position</span>
          <div role="group" aria-label="position" className="grid grid-cols-3 gap-1.5">
            {positions.map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={cfg.position === p}
                onClick={() => setToaster({ position: p })}
                className={`cursor-pointer rounded-full border px-2 py-1.5 text-sm font-medium transition-colors ${
                  cfg.position === p ? "border-ink bg-ink text-bg" : "border-line bg-bg text-muted hover:text-ink"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <Seg<ThemeChoice>
          label="theme"
          value={cfg.theme}
          options={["dark", "light", "system", "custom"]}
          onChange={(theme) => setToaster({ theme })}
        />
        <Field label={`offset: ${cfg.offset}px`}>
          {(id) => (
            <input
              id={id}
              type="range"
              min={0}
              max={160}
              value={cfg.offset}
              onChange={(e) => setToaster({ offset: Number(e.target.value) })}
              className="w-full accent-[var(--accent)]"
            />
          )}
        </Field>
        <div className="grid gap-2">
          <Switch label="queue" checked={cfg.queue} onChange={(queue) => setToaster({ queue })} />
          <Switch label="timer bar" checked={cfg.timer} onChange={(timer) => setToaster({ timer })} />
          <Switch label="haptics" checked={cfg.haptics} onChange={(haptics) => setToaster({ haptics })} />
        </div>
        <div className="overflow-hidden rounded-[20px] border border-line bg-code">
          <div className="flex items-center justify-between border-b border-line px-4 py-2 text-xs text-muted">
            <span>tsx</span>
            <CopyButton text={toasterCode} />
          </div>
          <pre className="overflow-x-auto p-4 text-[0.82rem] leading-relaxed whitespace-pre-wrap">{toasterCode}</pre>
        </div>
      </section>

      {/* toast builder */}
      <section aria-labelledby="pg-toast" className={`${panel} grid content-start gap-6`}>
        <h3 id="pg-toast" className={h}>
          Toast options
        </h3>
        <Seg<Kind> label="type" value={kind} options={kinds} onChange={setKind} />
        <Field label="title">
          {(id) => <input id={id} className={field} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Saved" />}
        </Field>
        <Field label="description">
          {(id) => (
            <input id={id} className={field} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Shown when the island expands" />
          )}
        </Field>
        <Field label="trailing">
          {(id) => <input id={id} className={field} value={trailing} onChange={(e) => setTrailing(e.target.value)} placeholder="2 min" />}
        </Field>
        <Seg<"4000" | "8000" | "sticky"> label="duration (ms)" value={duration} options={["4000", "8000", "sticky"]} onChange={setDuration} />
        {kind === "loading" && (
          <Field label={`progress: ${Math.round(progress * 100)}%`}>
            {(id) => (
              <input
                id={id}
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
            )}
          </Field>
        )}
        {kind === "live" && <Switch label='kind: "wave"' checked={wave} onChange={setWave} />}
        <div className="grid gap-2">
          <Switch label="button (Undo)" checked={action} onChange={setAction} />
          <Switch label="confetti" checked={confetti} onChange={setConfetti} />
          <Switch label='variant: "card"' checked={card} onChange={setCard} />
          <Switch label="queue (this toast)" checked={queue} onChange={setQueue} />
        </div>

        <div className="overflow-hidden rounded-[20px] border border-line bg-code">
          <div className="flex items-center justify-between border-b border-line px-4 py-2 text-xs text-muted">
            <span>tsx</span>
            <CopyButton text={toastCode} />
          </div>
          <pre className="overflow-x-auto p-4 text-[0.82rem] leading-relaxed">{toastCode}</pre>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => void dynaura[kind](opts)}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-bg transition-[transform,background-color] hover:bg-ink/85 active:scale-[0.97]"
          >
            <PlayIcon className="h-3.5 w-3.5" aria-hidden />
            Show toast
          </button>
          <button
            type="button"
            onClick={() => dynaura.clear()}
            className="inline-flex h-11 cursor-pointer items-center rounded-full border border-line bg-bg px-5 text-sm font-medium transition-[transform,border-color] hover:border-ink/40 active:scale-[0.97]"
          >
            Clear all
          </button>
        </div>
      </section>
    </div>
  );
}
