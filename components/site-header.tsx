import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaNpm } from "react-icons/fa6";
import { links } from "./nav";
import { MobileNav } from "./mobile-nav";
import { HeaderSearch } from "./header-search";
import { NavTabs } from "./nav-tabs";

const socials = [
  { label: "npm", href: links.npm, Icon: FaNpm },
  { label: "GitHub", href: links.github, Icon: FaGithub },
];

export function Logo() {
  return (
    <Link href="/" className="plain flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight">
      <Image src="/logo-mark.png" alt="" width={50} height={24} priority className="h-6 w-auto" />
      dynaura
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30" style={{ viewTransitionName: "site-header" }}>
      {/* blur lives on its own layer: backdrop-filter on the header would trap the fixed mobile menu inside it */}
      <div aria-hidden className="absolute inset-0 border-b border-line bg-bg/85 backdrop-blur-md" />
      <div className="relative mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6">
        <Logo />
        <div className="flex items-center gap-1">
          <HeaderSearch />
          <NavTabs />
          <ul className="mx-1 hidden items-center gap-1.5 lg:flex">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink transition-[transform,border-color,background-color] hover:border-ink hover:bg-ink hover:text-bg active:scale-[0.94]"
                >
                  <Icon className={label === "npm" ? "h-5 w-7" : "h-[18px] w-[18px]"} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
