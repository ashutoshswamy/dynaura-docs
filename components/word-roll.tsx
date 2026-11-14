"use client";

// Word Roll, by DesignBookmark (https://designbookmark.com/motion#db-word-roll). MIT.
// Ported to motion/react: letters roll up and out one by one, the next word rolls in from below,
// and the slot springs to the new word's width.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function WordRoll({ words, interval = 2400, className = "text-accent-ink" }: { words: string[]; interval?: number; className?: string }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [width, setWidth] = useState<number | null>(null);
  const word = words[i];

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  // Measure the live word (not exiting ones), and again once fonts load: the first pass can use the fallback face.
  const cur = useRef<HTMLElement | null>(null);
  useEffect(() => {
    let live = true;
    const m = () => live && cur.current && setWidth(cur.current.offsetWidth);
    m();
    document.fonts?.ready.then(m);
    return () => {
      live = false;
    };
  }, [word]);

  return (
    <motion.span
      className={`relative inline-block h-[1.2em] align-baseline leading-[1.2] [clip-path:inset(0_-0.5em)] ${className}`}
      animate={width === null ? undefined : { width }}
      initial={false}
      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 30 }}
    >
      <span className="sr-only">{word}</span>
      {/* sizer: in-flow text gives the slot a real baseline (aligns with "for") and the first word's width before measuring */}
      <span aria-hidden className="invisible block whitespace-nowrap">
        {words[0]}
      </span>
      <AnimatePresence initial={false}>
        <motion.span
          key={word}
          ref={(el: HTMLElement | null) => {
            if (el && el.dataset.w === word) cur.current = el;
          }}
          data-w={word}
          aria-hidden
          className="absolute top-0 left-0 flex"
          initial="below"
          animate="in"
          exit="above"
          transition={{ staggerChildren: 0.028 }}
        >
          {[...word].map((ch, k) => (
            <motion.span
              key={k}
              className="inline-block whitespace-pre"
              variants={{
                below: { y: reduce ? "0%" : "105%", opacity: 0 },
                in: { y: "0%", opacity: 1, transition: { duration: reduce ? 0 : 0.7, ease: EASE, delay: reduce ? 0 : 0.06 + k * 0.028 } },
                above: { y: reduce ? "0%" : "-105%", opacity: 0, transition: { duration: reduce ? 0 : 0.45, ease: EASE, delay: reduce ? 0 : k * 0.022 } },
              }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
