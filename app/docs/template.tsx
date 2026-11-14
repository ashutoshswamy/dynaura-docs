import { ViewTransition } from "react";

// A template remounts on every navigation, so enter/exit fire here (layouts persist and would not).
export default function DocsTemplate({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
