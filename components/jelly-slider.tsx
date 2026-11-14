"use client";

// Jelly Slider, by DesignBookmark (https://designbookmark.com/motion#db-jelly-slider). Ported to motion/react.
// The thumb follows the pointer through a spring and stretches with speed. While held, a value drop
// rises out of it; both sit in one goo layer so the drop peels off like liquid and melts back on release.
// Dragging past either end meets rubber resistance and snaps back.

import { useEffect, useId, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring, useTransform } from "motion/react";

// R thumb radius, TR drawn thumb half size (the goo filter eats ~2px), D drop radius, CY track centre,
// OX/OY goo layer offset, RISE how far the drop lifts.
const R = 12, TR = 14, D = 18, OX = 40, OY = 80, CY = 16, RISE = -38, REST = 0.5;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const rubber = (x: number, min: number, max: number, d = 18) =>
  x < min ? min - (1 - 1 / (((min - x) * 0.55) / d + 1)) * d : x > max ? max + (1 - 1 / (((x - max) * 0.55) / d + 1)) * d : x;
const marks = Array.from({ length: 21 }, (_, i) => i / 20);

export function JellySlider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  format = (v: number) => String(v),
}: {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  const reduce = useReducedMotion();
  const gooId = useId().replace(/:/g, "");
  const rail = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hover, setHover] = useState(false);
  const [lifted, setLifted] = useState(false);
  const emitted = useRef(value);

  const span = Math.max(W - 2 * R, 1);
  const toX = (v: number) => R + ((v - min) / (max - min)) * span;
  const snap = (x: number) => {
    const v = min + clamp((x - R) / span, 0, 1) * (max - min);
    return Number((Math.round((v - min) / step) * step + min).toFixed(4));
  };

  const sp = (k: number, c: number) => ({ stiffness: k, damping: reduce ? 2 * Math.sqrt(k) : c });
  const x = useMotionValue(R);
  const xs = useSpring(x, sp(900, 50)); // thumb follows the pointer
  const dx = useSpring(xs, sp(260, 18)); // drop lags behind, so it leans
  const dy = useSpring(CY, sp(420, 22));
  const ds = useSpring(REST, sp(420, 22));
  const ps = useSpring(1, sp(520, 16)); // hover / press scale

  const thumbT = useTransform([xs, ps], ([px, p]: number[]) => {
    const st = 1 + Math.min(Math.abs(xs.getVelocity()) / 2400, 0.4);
    return `translate(${px - TR + OX}px,${CY - TR + OY}px) scale(${st * p},${p / st})`;
  });
  const dropLocal = ([pdx, px, pdy, pds]: number[]) =>
    `translate(${pdx - D}px,${pdy - D}px) rotate(${clamp((pdx - px) * 0.9, -28, 28)}deg) scale(${pds})`;
  const dropT = useTransform([dx, xs, dy, ds], (v: number[]) => `translate(${OX}px,${OY}px) ${dropLocal(v)}`);
  const labelT = useTransform([dx, xs, dy, ds], dropLocal);
  const labelO = useTransform(ds, (s) => clamp((s - 0.7) / 0.25, 0, 1));
  const fillW = useTransform(xs, (p) => clamp(p, 0, Math.max(W, 0)) * clamp((p - R) / R, 0, 1));
  const hitL = useTransform(xs, (p) => p - R);

  // measure; jump (no spring) to the value on first layout
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  const ready = useRef(false);
  useEffect(() => {
    if (!W) return;
    if (!ready.current) {
      ready.current = true;
      x.jump(toX(value));
      xs.jump(toX(value));
      dx.jump(toX(value));
      return;
    }
    // external change (not our own emit): glide there
    if (value !== emitted.current && !dragging) {
      emitted.current = value;
      x.set(toX(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [W, value, min, max]);

  useMotionValueEvent(xs, "change", (px) => {
    if (!W) return;
    const v = snap(px);
    if (v !== emitted.current) {
      emitted.current = v;
      onChange(v);
    }
  });

  useEffect(() => {
    const up = dragging || lifted;
    dy.set(up ? CY + RISE : CY);
    ds.set(up ? 1 : REST);
    ps.set(dragging ? 1.16 : hover ? 1.08 : 1);
  }, [dragging, lifted, hover, dy, ds, ps]);

  const localX = (e: React.PointerEvent) => e.clientX - rail.current!.getBoundingClientRect().left;
  const end = () => {
    if (!dragging) return;
    setDragging(false);
    x.set(clamp(x.get(), R, W - R));
  };

  const bigStep = Math.max(step, Number((((max - min) / 20 / step) | 0) * step) || step);
  const onKey = (e: React.KeyboardEvent) => {
    const d = ({ ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 2, PageDown: -2 } as Record<string, number>)[e.key];
    const abs = ({ Home: min, End: max } as Record<string, number>)[e.key];
    if (d === undefined && abs === undefined) return;
    e.preventDefault();
    const next = abs ?? clamp(value + d * bigStep, min, max);
    x.set(toX(next));
    setLifted(true);
  };

  const labels = [0, 0.25, 0.5, 0.75, 1];
  const track = "absolute left-0 right-0 top-[13px] h-1.5 overflow-hidden rounded-full bg-ink/[0.14]";
  return (
    <div className="mx-auto w-full max-w-[26rem] pt-9 pb-1 select-none">
      <svg width="0" height="0" className="absolute" aria-hidden>
        <filter id={gooId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b" />
          <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="g" />
          <feComposite in="SourceGraphic" in2="g" operator="atop" />
        </filter>
      </svg>
      <div
        ref={rail}
        className="relative h-8 cursor-pointer touch-none"
        onPointerDown={(e) => {
          setDragging(true);
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {}
          x.set(rubber(localX(e), R, W - R));
          (e.currentTarget.querySelector("[role=slider]") as HTMLElement | null)?.focus({ preventScroll: true });
        }}
        onPointerMove={(e) => dragging && x.set(rubber(localX(e), R, W - R))}
        onPointerUp={end}
        onPointerCancel={end}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        <div className={track}>
          <motion.div className="absolute inset-y-0 left-0 rounded-full bg-ink" style={{ width: fillW }} />
        </div>
        <div className="pointer-events-none absolute -top-20 -right-10 -left-10 h-[140px]" style={{ filter: `url(#${gooId})` }}>
          <motion.div className="absolute top-0 left-0 h-9 w-9 rounded-full bg-ink will-change-transform" style={{ transform: dropT }} />
          <motion.div className="absolute top-0 left-0 h-7 w-7 rounded-full bg-ink will-change-transform" style={{ transform: thumbT }} />
        </div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 grid h-9 w-9 place-items-center text-xs font-semibold text-bg tabular-nums will-change-transform"
          style={{ transform: labelT, opacity: labelO }}
        >
          {format(value)}
        </motion.div>
        <motion.div
          role="slider"
          tabIndex={0}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={format(value)}
          className="absolute top-1 h-6 w-6 rounded-full"
          style={{ left: hitL }}
          onKeyDown={onKey}
          onFocus={(e) => e.currentTarget.matches(":focus-visible") && setLifted(true)}
          onBlur={() => setLifted(false)}
        />
      </div>
      <div aria-hidden className="mt-2">
        <div className="relative h-2">
          {marks.map((p) => {
            const major = p % 0.25 === 0;
            const on = value > min && (min + p * (max - min)) <= value;
            return (
              <i
                key={p}
                className={`absolute top-0 -ml-[0.75px] w-[1.5px] rounded-[1px] transition-colors ${major ? "h-2" : "h-1"} ${
                  on ? (major ? "bg-ink" : "bg-ink/70") : major ? "bg-muted" : "bg-ink/[0.14]"
                }`}
                style={{ left: `calc(12px + (100% - 24px) * ${p})` }}
              />
            );
          })}
        </div>
        <div className="relative mt-1.5 h-3.5 text-[0.7rem] leading-[14px] font-medium text-muted tabular-nums">
          {labels.map((p) => (
            <span key={p} className="absolute top-0 -translate-x-1/2" style={{ left: `calc(12px + (100% - 24px) * ${p})` }}>
              {format(Number((min + p * (max - min)).toFixed(2)))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
