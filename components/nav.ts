export type NavItem = { title: string; href: string; description: string };
export type NavGroup = { label: string; items: NavItem[] };

export const nav: NavGroup[] = [
  {
    label: "Start",
    items: [
      { title: "Introduction", href: "/docs", description: "What dynaura is and why it exists." },
      { title: "Installation", href: "/docs/installation", description: "Add the package and the stylesheet." },
      { title: "Quick start", href: "/docs/quick-start", description: "Mount one Toaster, call dynaura anywhere." },
    ],
  },
  {
    label: "Guides",
    items: [
      { title: "Recipes", href: "/docs/recipes", description: "Actions, promises, progress, live activities, cards." },
      { title: "Playground", href: "/docs/playground", description: "Change every option, run it, copy the code." },
      { title: "Examples", href: "/docs/examples", description: "Feedback, async, live, cards, social and commerce, all runnable." },
      { title: "Theming", href: "/docs/theming", description: "Dark, light, system, or your own colors." },
      { title: "Gestures", href: "/docs/gestures", description: "Hover, tap, long-press and swipe." },
    ],
  },
  {
    label: "Reference",
    items: [
      { title: "API", href: "/docs/api", description: "Methods, toast options, Toaster options, entry points." },
      { title: "Accessibility", href: "/docs/accessibility", description: "Live regions, focus and reduced motion." },
      { title: "How it works", href: "/docs/how-it-works", description: "Internals, adapters, development and releasing." },
      { title: "Troubleshooting", href: "/docs/troubleshooting", description: "Fixes for the common snags." },
    ],
  },
];

export const flat = nav.flatMap((g) => g.items);

export const links = {
  npm: "https://www.npmjs.com/package/dynaura",
  github: "https://github.com/ashutoshswamy/dynaura",
  issues: "https://github.com/ashutoshswamy/dynaura/issues",
  author: "https://ashutoshswamy.in",
  authorGithub: "https://github.com/ashutoshswamy",
  linkedin: "https://www.linkedin.com/in/ashutoshswamy",
  x: "https://x.com/ashutoshswamy_",
};
