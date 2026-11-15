"use client";

import { useState } from "react";
import { dynaura } from "dynaura";
import { PlayIcon } from "@heroicons/react/16/solid";
import { demos } from "./demos";
import { categories, type Category } from "./examples-data";

type Item = { id: string; category: Category; title: string; description: string; raw: string; html: string };

function DeliveryCard() {
  const label = { color: "var(--dynaura-muted)", fontSize: 11 } as const;
  const steps = ["Packed", "Shipped", "Out for delivery"];
  return (
    <div style={{ display: "grid", gap: 12, padding: "4px 4px 8px", minWidth: 280 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "grid", gap: 4, opacity: i === 2 ? 1 : 0.55 }}>
            <span style={label}>Step {i + 1}</span>
            <strong>{s}</strong>
          </div>
        ))}
      </div>
      <div style={{ height: 4, borderRadius: 4, background: "var(--dynaura-btn)" }}>
        <div style={{ width: "82%", height: "100%", borderRadius: 4, background: "var(--state)" }} />
      </div>
    </div>
  );
}

const ok = (title: string) => () => dynaura.success(title);

const runs: Record<string, () => unknown> = {
  saved: demos.success,
  declined: demos.error,
  storage: demos.warning,
  copied: () => dynaura.info({ title: "Link copied", duration: 1600 }),
  promise: demos.promise,
  upload: demos.progress,
  undo: () =>
    dynaura.info({ title: "Message deleted", duration: 6000, button: { title: "Undo", onClick: ok("Message restored") } }),
  memo: demos.live,
  music: demos.wave,
  ride: () => dynaura.live({ title: "Driver arriving", trailing: "3 min", button: { title: "Call", onClick: ok("Calling driver") } }),
  boarding: demos.card,
  delivery: () =>
    dynaura.success({
      title: "Out for delivery",
      trailing: "12 min",
      variant: "card",
      duration: 9000,
      description: <DeliveryCard />,
      button: { title: "Track order", onClick: ok("Opening tracker") },
    }),
  message: () =>
    dynaura.info({
      title: "Maya sent a message",
      description: "Are we still on for 6?",
      button: { title: "Reply", onClick: ok("Reply sent") },
    }),
  queue: demos.queue,
  follow: () => dynaura.success({ title: "You followed Maya", confetti: true }),
  order: () =>
    dynaura.success({
      title: "Order placed",
      description: "Arrives Thursday.",
      confetti: true,
      button: { title: "Track order", onClick: ok("Opening tracker") },
    }),
  cart: () =>
    dynaura.success({
      title: "Added to cart",
      description: "Linen shirt, size M.",
      button: { title: "View cart", onClick: ok("Cart opened") },
    }),
};

export function ExamplesBrowser({ items }: { items: Item[] }) {
  const [cat, setCat] = useState<Category | "All">("All");
  const shown = cat === "All" ? items : items.filter((i) => i.category === cat);
  const tab = (active: boolean) =>
    `cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      active ? "bg-ink text-bg" : "border border-line bg-surface text-muted hover:text-ink"
    }`;
  return (
    <div className="not-prose">
      <div role="tablist" aria-label="Example categories" className="flex flex-wrap gap-2">
        {(["All", ...categories] as const).map((c) => (
          <button key={c} role="tab" type="button" aria-selected={cat === c} onClick={() => setCat(c)} className={tab(cat === c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(min(100%,19rem),1fr))] gap-4">
        {shown.map((e) => (
          <div key={e.id} className="flex flex-col justify-between gap-5 rounded-[20px] border border-line bg-surface p-6">
            <div>
              <p className="!m-0 !text-sm !font-medium !text-accent-ink">{e.category}</p>
              <h3 className="!mt-1 !mb-0 font-display text-xl font-semibold tracking-tight">{e.title}</h3>
              <p className="!mt-2 !mb-0 !text-[0.95rem]">{e.description}</p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => void runs[e.id]()}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg transition-[transform,background-color] hover:bg-ink/85 active:scale-[0.97]"
              >
                <PlayIcon className="h-3.5 w-3.5" aria-hidden />
                Run
              </button>
              <details className="group mt-4">
                <summary className="w-fit cursor-pointer text-sm font-medium text-muted hover:text-ink">Show code</summary>
                <div className="code-pre mt-3 overflow-hidden rounded-[20px] border border-line bg-code" dangerouslySetInnerHTML={{ __html: e.html }} />
              </details>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
