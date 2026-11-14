"use client";

import { Toaster } from "dynaura";
import { customTheme, useToasterConfig } from "./toaster-store";

/** The single Toaster for the whole site. Demos change its options through the store. */
export function SiteToaster() {
  const c = useToasterConfig();
  return (
    <Toaster
      position={c.position}
      offset={c.offset}
      theme={c.theme === "custom" ? customTheme : c.theme}
      queue={c.queue}
      timer={c.timer}
      haptics={c.haptics}
    />
  );
}
