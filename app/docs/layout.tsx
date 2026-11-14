import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Sidebar } from "@/components/sidebar";

export default function DocsLayout({ children }: LayoutProps<"/docs">) {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 gap-12 px-4 py-10 sm:px-6 lg:py-14">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pb-6">
            <Sidebar />
          </div>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <SiteFooter />
    </>
  );
}
