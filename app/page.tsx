import Image from "next/image";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Dynaura Docs",
  url: "https://dynaura.ashutoshswamy.in",
  description: "Official documentation for the dynaura npm package.",
  logo: "https://dynaura.ashutoshswamy.in/logo-mark.png",
  author: { "@type": "Person", name: "Ashutosh Swamy", url: "https://ashutoshswamy.in" },
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Image
        src="/logo-mark.png"
        alt="Dynaura logo"
        width={120}
        height={58}
        priority
        className="dark:[filter:drop-shadow(0_0_1px_#fff)_drop-shadow(0_0_1px_#fff)]"
      />
      <h1 className="font-display text-3xl font-semibold tracking-tight">Dynaura Docs</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        Development mode is on. Soon it will be ready. Come back again after
        some time.
      </p>
    </main>
  );
}
