"use client";

import { useEffect } from "react";
import { dynaura } from "dynaura";

/** The island greets first-time visitors once per session, so the product is the first thing that moves. */
export function Welcome() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("dynaura-docs-welcome")) return;
      sessionStorage.setItem("dynaura-docs-welcome", "1");
    } catch {
      /* storage blocked: still greet */
    }
    const t = setTimeout(
      () => dynaura.info({ title: "This is dynaura", description: "Every demo on this site runs the real package.", duration: 4200 }),
      900,
    );
    return () => clearTimeout(t);
  }, []);
  return null;
}
