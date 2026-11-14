import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaNpm } from "react-icons/fa6";
import { links } from "./nav";
import { MobileNav } from "./mobile-nav";

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
  const link = "rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-ink";
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav aria-label="Primary" className="flex items-center gap-1">
          <Link href="/docs" className={`${link} hidden sm:block`}>
            Docs
          </Link>
          <Link href="/docs/api" className={`${link} hidden sm:block`}>
            API
          </Link>
          <ul className="mx-1 hidden items-center gap-1.5 sm:flex">
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
        </nav>
      </div>
    </header>
  );
}
