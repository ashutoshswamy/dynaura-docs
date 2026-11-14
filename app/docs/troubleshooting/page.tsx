import type { Metadata } from "next";
import { jsonLd, pageMeta } from "@/lib/seo";
import { DocPage } from "@/components/doc-page";
import { links } from "@/components/nav";

export const metadata: Metadata = pageMeta({
  title: "Troubleshooting",
  description: "Fixes for dynaura problems: nothing appears, wrong font, SSR, iOS safe areas and framework nodes.",
  path: "/docs/troubleshooting",
});

const faq = [
  {
    id: "nothing-appears",
    q: "Nothing appears",
    a: (
      <p>
        Check that <code>&lt;Toaster /&gt;</code> is mounted once and that <code>dynaura/styles.css</code> is imported. Without the stylesheet the island renders unstyled.
      </p>
    ),
  },
  {
    id: "font",
    q: "The font is wrong, or I need to avoid Google Fonts",
    a: (
      <p>
        The stylesheet&apos;s first line is an <code>@import</code> for Bricolage Grotesque. Copy the stylesheet without it, or set <code>--dynaura-font</code> to your own font. This is also the fix for a strict Content Security Policy.
      </p>
    ),
  },
  {
    id: "multiple",
    q: "Can I have more than one Toaster?",
    a: <p>No. State is a single global, so mount one Toaster per page.</p>,
  },
  {
    id: "ssr",
    q: "Does it work with SSR?",
    a: (
      <p>
        Yes. The Toaster renders nothing on the server and mounts on the client. Calling <code>dynaura.*</code> on the server only sets state and shows nothing.
      </p>
    ),
  },
  {
    id: "ios",
    q: "The toast sits under the notch or home indicator on iOS",
    a: (
      <p>
        Add <code>viewport-fit=cover</code> to your viewport meta tag. dynaura adds <code>env(safe-area-inset-*)</code> to the offset.
      </p>
    ),
  },
  {
    id: "react-nodes",
    q: "My description is a React component but it does not show in Vue or Svelte",
    a: (
      <p>
        React nodes only work in the React adapter. In Vue, Svelte and vanilla, pass a string or a DOM <code>Node</code>.
      </p>
    ),
  },
];

const faqText: Record<string, string> = {
  "nothing-appears": "Check that <Toaster /> is mounted once and that dynaura/styles.css is imported. Without the stylesheet the island renders unstyled.",
  "font": "The stylesheet's first line is an @import for Bricolage Grotesque. Copy the stylesheet without it, or set --dynaura-font to your own font. This is also the fix for a strict Content Security Policy.",
  "multiple": "No. State is a single global, so mount one Toaster per page.",
  "ssr": "Yes. The Toaster renders nothing on the server and mounts on the client. Calling dynaura.* on the server only sets state and shows nothing.",
  "ios": "Add viewport-fit=cover to your viewport meta tag. dynaura adds env(safe-area-inset-*) to the offset.",
  "react-nodes": "React nodes only work in the React adapter. In Vue, Svelte and vanilla, pass a string or a DOM Node."
};

const shortLabel: Record<string, string> = {
  "nothing-appears": "Nothing appears",
  font: "Wrong font or no Google Fonts",
  multiple: "More than one Toaster",
  ssr: "SSR",
  ios: "iOS notch and home bar",
  "react-nodes": "React nodes in Vue or Svelte",
};

export default function Page() {
  return (
    <DocPage
      href="/docs/troubleshooting"
      title="Troubleshooting"
      lead="The snags people hit most, and the one-line fix for each."
      toc={faq.map((f) => ({ id: f.id, label: shortLabel[f.id] }))}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: faqText[f.id] },
          })),
        })}
      />
      {faq.map((f) => (
        <section key={f.id}>
          <h2 id={f.id} className="!text-[1.4rem]">{f.q}</h2>
          {f.a}
        </section>
      ))}
      <p className="mt-12">
        Still stuck? <a href={links.issues}>Open an issue on GitHub</a>.
      </p>
    </DocPage>
  );
}
