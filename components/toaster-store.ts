"use client";

import { useSyncExternalStore } from "react";
import type { Position } from "dynaura";

export type ThemeChoice = "dark" | "light" | "system" | "custom";

export type ToasterConfig = {
  position: Position;
  offset: number;
  theme: ThemeChoice;
  queue: boolean;
  timer: boolean;
  haptics: boolean;
  swipe: "edge" | "up" | "down" | "both" | "none";
  capQueue: boolean; // maxQueue = 2
  dedupeTitle: boolean;
};

export const defaults: ToasterConfig = {
  position: "top",
  offset: 78, // 64px header + 14px gap, so the island never covers the header
  theme: "dark",
  queue: false,
  timer: true,
  haptics: true,
  swipe: "edge",
  capQueue: false,
  dedupeTitle: false,
};

export const customTheme = { background: "#2b1055", foreground: "#ffffff", success: "#7cffcb" };

// ponytail: module-level store; the one site Toaster and the demo controls share it
let state = defaults;
const listeners = new Set<() => void>();

export function setToaster(patch: Partial<ToasterConfig>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

export function useToasterConfig() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => defaults,
  );
}
