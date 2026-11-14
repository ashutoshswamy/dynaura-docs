"use client";

import { useRouter } from "next/navigation";
import CommandButton, { type Suggestion } from "./command-button";
import { flat } from "./nav";
import { docIcons } from "./doc-icons";

const POPULAR = ["/docs/quick-start", "/docs/api", "/docs/playground", "/docs/theming", "/docs/troubleshooting"];

const toSuggestion = (i: (typeof flat)[number]): Suggestion => {
  const Icon = docIcons[i.href];
  return { id: i.href, label: i.title, hint: i.description, icon: Icon && <Icon aria-hidden /> };
};

// ponytail: substring ranking over page titles/descriptions, max 5. Index headings if pages need deeper search.
function suggest(q: string): Suggestion[] {
  const s = q.trim().toLowerCase();
  if (!s) return POPULAR.map((h) => flat.find((i) => i.href === h)!).map(toSuggestion);
  const score = (i: (typeof flat)[number]) => {
    const t = i.title.toLowerCase();
    if (t.startsWith(s)) return 3;
    if (t.includes(s)) return 2;
    return i.description.toLowerCase().includes(s) ? 1 : 0;
  };
  return flat
    .map((i) => [score(i), i] as const)
    .filter(([n]) => n)
    .sort((a, b) => b[0] - a[0])
    .slice(0, 5)
    .map(([, i]) => toSuggestion(i));
}

export function HeaderSearch() {
  const router = useRouter();
  return (
    <div className="mr-1 hidden sm:block">
      <CommandButton placeholder="Search docs..." suggest={suggest} onSelect={(s) => router.push(s.id)} />
    </div>
  );
}
