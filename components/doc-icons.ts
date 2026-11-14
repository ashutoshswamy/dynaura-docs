import {
  ArrowDownTrayIcon,
  BeakerIcon,
  BoltIcon,
  BookOpenIcon,
  CodeBracketSquareIcon,
  Cog6ToothIcon,
  HandRaisedIcon,
  PlayCircleIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
  SwatchIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export type Icon = typeof BookOpenIcon;

/** One Heroicon per docs page, shared by the sidebar, page headers and the landing index. */
export const docIcons: Record<string, Icon> = {
  "/docs": BookOpenIcon,
  "/docs/installation": ArrowDownTrayIcon,
  "/docs/quick-start": BoltIcon,
  "/docs/recipes": BeakerIcon,
  "/docs/playground": PlayCircleIcon,
  "/docs/examples": Squares2X2Icon,
  "/docs/theming": SwatchIcon,
  "/docs/gestures": HandRaisedIcon,
  "/docs/api": CodeBracketSquareIcon,
  "/docs/accessibility": ShieldCheckIcon,
  "/docs/how-it-works": Cog6ToothIcon,
  "/docs/troubleshooting": WrenchScrewdriverIcon,
};
