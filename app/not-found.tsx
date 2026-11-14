import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-4 py-24 sm:px-6">
        <h1 className="font-display text-5xl font-bold tracking-[-0.04em] sm:text-7xl">Page not found.</h1>
        <p className="mt-5 max-w-[44ch] text-lg text-muted">That page does not exist. Start from the docs or jump to the API reference.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/docs" className="inline-flex h-12 items-center rounded-full bg-ink px-6 text-[0.95rem] font-semibold text-bg">
            Open the docs
          </Link>
          <Link href="/docs/api" className="inline-flex h-12 items-center rounded-full border border-line bg-surface px-6 text-[0.95rem] font-medium">
            API reference
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
