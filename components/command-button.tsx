// Command button, by DesignBookmark (https://designbookmark.com/motion#db-command-button). MIT.
"use client";

import { type CSSProperties, type ReactNode, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const THEME = {
  "--cb-bg": "var(--island)",
  "--cb-bg-hover": "color-mix(in srgb, var(--island-fg) 9%, var(--island))",
  "--cb-text": "color-mix(in srgb, var(--island-fg) 85%, transparent)",
  "--cb-strong": "var(--island-fg)",
  "--cb-placeholder": "color-mix(in srgb, var(--island-fg) 38%, transparent)",
  "--cb-muted": "color-mix(in srgb, var(--island-fg) 55%, transparent)",
  "--cb-key": "color-mix(in srgb, var(--island-fg) 8%, transparent)",
  "--cb-key-on": "color-mix(in srgb, var(--island-fg) 18%, transparent)",
} as CSSProperties;

const PRESS = { stiffness: 520, damping: 34, mass: 0.6 };
const openSpring = (bounce: number) => ({
  type: "spring" as const,
  stiffness: 300,
  damping: 34 - (Math.min(100, Math.max(0, bounce)) / 100) * 20,
});
const SWAP = { duration: 0.18, ease: [0.23, 1, 0.32, 1] } as const;

type Modifier = "mod" | "ctrl" | "alt" | "shift";
const MODIFIERS: Modifier[] = ["mod", "ctrl", "alt", "shift"];
const MAC: Record<Modifier, string> = { mod: "⌘", ctrl: "⌃", alt: "⌥", shift: "⇧" };
const PC: Record<Modifier, string> = { mod: "Ctrl", ctrl: "Ctrl", alt: "Alt", shift: "Shift" };

function parse(shortcut: string) {
  const parts = shortcut.toLowerCase().split("+").map((p) => p.trim()).filter(Boolean);
  const modifiers = parts.filter((p): p is Modifier => MODIFIERS.includes(p as Modifier));
  const key = parts.find((p) => !MODIFIERS.includes(p as Modifier)) ?? "k";
  return { modifiers, key };
}

const isKey = (e: KeyboardEvent, key: string) =>
  e.key.toLowerCase() === key || e.code === `Key${key.toUpperCase()}` || e.code === `Digit${key}`;

const noSubscribe = () => () => {};
function readIsMac() {
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  return /mac|iphone|ipad|ipod/i.test(nav.userAgentData?.platform ?? navigator.platform);
}

function isDown(m: Modifier, e: KeyboardEvent, mac: boolean) {
  if (m === "mod") return mac ? e.metaKey : e.ctrlKey;
  if (m === "ctrl") return e.ctrlKey;
  if (m === "alt") return e.altKey;
  return e.shiftKey;
}

const typing = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));

function Key({ label, on = false }: { label: string; on?: boolean }) {
  return (
    <kbd
      data-on={on || undefined}
      className="inline-flex h-5 min-w-5 items-center justify-center rounded-md bg-[var(--cb-key)] px-1.5 font-sans text-[11px] font-medium leading-none text-[var(--cb-muted)] transition-colors duration-150 data-[on]:bg-[var(--cb-key-on)] data-[on]:text-[var(--cb-strong)] data-[on]:duration-75"
    >
      {label}
    </kbd>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-[var(--cb-muted)]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export type Suggestion = { id: string; label: string; hint?: string; icon?: ReactNode };

type Props = {
  children?: ReactNode;
  /** Suggestions for the current text (called with "" when the field is empty). Enables the dropdown and inline autocomplete. */
  suggest?: (query: string) => Suggestion[];
  /** Called when a suggestion is picked (Enter, click). */
  onSelect?: (s: Suggestion) => void;
  /** `+`-joined: `mod` (⌘ on Mac, Ctrl elsewhere), `ctrl`, `alt`, `shift`, one key. */
  shortcut?: string;
  placeholder?: string;
  /** Called with the text when Enter is pressed in the open field. */
  onSearch?: (query: string) => void;
  /** Width of the open field, in px. */
  width?: number;
  /** How springy the open is, 0 to 100. */
  bounce?: number;
  /** Fold back by itself after this many ms with nothing typed (demos). */
  autoClose?: number;
  className?: string;
  style?: CSSProperties;
};

export default function CommandButton({
  children = "Search",
  suggest,
  onSelect,
  shortcut = "mod+k",
  placeholder = "Search tools...",
  onSearch,
  width = 300,
  bounce = 30,
  autoClose,
  className = "",
  style,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();
  const mac = useSyncExternalStore(noSubscribe, readIsMac, () => null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const items = open && suggest ? suggest(query) : [];
  const top = items[0];
  // inline autocomplete: grey completion of the top match, Tab / Right arrow accepts it
  const ghost = top && query && top.label.toLowerCase().startsWith(query.toLowerCase()) ? top.label.slice(query.length) : "";
  const pick = (sg: Suggestion) => {
    onSelect?.(sg);
    close();
  };
  const [held, setHeld] = useState<{ mods: Modifier[]; key: boolean }>({ mods: [], key: false });

  const pressTarget = useMotionValue(1);
  const scale = useSpring(pressTarget, PRESS);
  const press = (down: boolean) => pressTarget.set(down && !reduce ? 0.97 : 1);

  const { modifiers, key } = parse(shortcut);
  const live = useRef({ modifiers, key, open });
  useLayoutEffect(() => {
    live.current = { modifiers, key, open };
  });
  const takeFocus = useRef(false);

  const openWith = (trusted: boolean) => {
    takeFocus.current = trusted;
    setOpen(true);
  };
  const close = () => {
    if (!live.current.open) return;
    setOpen(false);
    setQuery("");
    input.current?.blur();
  };

  useEffect(() => {
    if (mac === null) return;
    const sync = (e: KeyboardEvent, down: boolean) => {
      const { modifiers, key } = live.current;
      const next = { mods: modifiers.filter((m) => isDown(m, e, mac)), key: down && isKey(e, key) };
      setHeld((cur) => (cur.key === next.key && cur.mods.join() === next.mods.join() ? cur : next));
      press(next.key || next.mods.length > 0);
    };
    const onDown = (e: KeyboardEvent) => {
      const { modifiers, key, open } = live.current;
      if (open) return;
      if (!modifiers.some((m) => m !== "shift") && typing(e.target)) return;
      sync(e, true);
      if (!e.repeat && modifiers.every((m) => isDown(m, e, mac)) && isKey(e, key)) {
        e.preventDefault();
        openWith(e.isTrusted);
      }
    };
    const onUp = (e: KeyboardEvent) => sync(e, false);
    const release = () => {
      setHeld({ mods: [], key: false });
      press(false);
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    window.addEventListener("blur", release);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("blur", release);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mac]);

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  useEffect(() => {
    if (!open || !autoClose || query) return;
    const t = setTimeout(close, autoClose);
    return () => clearTimeout(t);
  }, [open, autoClose, query]);

  const labels = mac === false ? PC : MAC;

  return (
    <div ref={root} className="relative" style={{ ...THEME, ...style }}>
    <motion.div
      layout
      transition={{ layout: reduce ? { duration: 0 } : openSpring(bounce) }}
      style={{ scale, borderRadius: 20, width: open ? width : "auto" }}
      onPointerDown={() => {
        if (open) return;
        press(true);
      }}
      onPointerUp={() => press(false)}
      onPointerLeave={() => press(false)}
      className={`relative flex h-10 items-center overflow-hidden bg-[var(--cb-bg)] text-sm font-medium text-[var(--cb-text)] transition-colors duration-150 ${open ? "" : "hover:bg-[var(--cb-bg-hover)]"} ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {open ? (
          <motion.div
            key="field"
            className="flex w-full items-center gap-2.5 pl-3.5 pr-2.5"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)", transition: { ...SWAP, delay: 0.06 } }}
            exit={{ opacity: 0, filter: "blur(4px)", transition: SWAP }}
            onAnimationStart={() => takeFocus.current && input.current?.focus({ preventScroll: true })}
          >
            <SearchIcon />
            <div className="relative min-w-0 flex-1">
              {ghost && (
                <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center whitespace-pre text-[var(--cb-placeholder)]">
                  <span className="invisible">{query}</span>
                  {ghost}
                </span>
              )}
              <input
                ref={input}
                value={query}
                role="combobox"
                aria-expanded={items.length > 0}
                aria-controls="cb-list"
                aria-activedescendant={items.length > 0 ? `cb-opt-${active}` : undefined}
                aria-autocomplete="both"
                autoComplete="off"
                spellCheck={false}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") close();
                  else if (e.key === "ArrowDown" && items.length) {
                    e.preventDefault();
                    setActive((a) => (a + 1) % items.length);
                  } else if (e.key === "ArrowUp" && items.length) {
                    e.preventDefault();
                    setActive((a) => (a - 1 + items.length) % items.length);
                  } else if ((e.key === "Tab" || e.key === "ArrowRight") && ghost && e.currentTarget.selectionStart === query.length) {
                    e.preventDefault();
                    setQuery(top.label);
                    setActive(0);
                  } else if (e.key === "Enter") {
                    if (items[active]) pick(items[active]);
                    else if (query.trim()) onSearch?.(query.trim());
                  }
                }}
                onBlur={() => !query && close()}
                placeholder={placeholder}
                aria-label={placeholder}
                className="w-full min-w-0 bg-transparent text-[var(--cb-strong)] outline-none placeholder:text-[var(--cb-placeholder)]"
              />
            </div>
            <Key label="Esc" />
          </motion.div>
        ) : (
          <motion.button
            key="button"
            type="button"
            aria-keyshortcuts={[...modifiers.map((m) => (m === "mod" ? (mac ? "Meta" : "Control") : m[0].toUpperCase() + m.slice(1))), key.toUpperCase()].join("+")}
            aria-expanded={false}
            onClick={(e) => openWith(e.isTrusted)}
            className="flex h-10 cursor-pointer select-none items-center gap-3 whitespace-nowrap pl-4 pr-2.5 outline-none"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)", transition: { ...SWAP, delay: 0.06 } }}
            exit={{ opacity: 0, filter: "blur(4px)", transition: SWAP }}
          >
            {children}
            <span aria-hidden="true" className={`flex items-center gap-1 transition-opacity duration-200 ${mac === null ? "opacity-0" : ""}`}>
              {modifiers.map((m) => (
                <Key key={m} label={labels[m]} on={held.mods.includes(m)} />
              ))}
              <Key label={key.length === 1 ? key.toUpperCase() : key} on={held.key} />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
    <AnimatePresence>
      {items.length > 0 && (
        <motion.ul
          id="cb-list"
          role="listbox"
          initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: SWAP }}
          exit={{ opacity: 0, y: -6, filter: "blur(4px)", transition: { duration: 0.12 } }}
          onPointerDown={(e) => e.preventDefault()}
          className="absolute top-full right-0 z-40 mt-2 grid grid-cols-[minmax(0,1fr)] gap-0.5 rounded-[20px] bg-[var(--cb-bg)] p-1.5 text-sm"
          style={{ width }}
        >
          {items.map((sg, k) => (
            <li
              key={sg.id}
              id={`cb-opt-${k}`}
              role="option"
              aria-selected={k === active}
              data-on={k === active || undefined}
              onPointerMove={() => setActive(k)}
              onClick={() => pick(sg)}
              className="flex cursor-pointer items-center gap-3 rounded-[14px] px-3 py-2 text-[var(--cb-text)] transition-colors duration-100 data-[on]:bg-[var(--cb-key)]"
            >
              {sg.icon && <span className="flex-none text-[var(--cb-muted)] [&>svg]:size-4">{sg.icon}</span>}
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-[var(--cb-strong)]">{sg.label}</span>
                {sg.hint && <span className="block truncate text-xs text-[var(--cb-muted)]">{sg.hint}</span>}
              </span>
              {k === active && <Key label="↵" />}
            </li>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
    </div>
  );
}
