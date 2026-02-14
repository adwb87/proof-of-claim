"use client";

import { Accordion } from "@/components/ui/Accordion";

const citations = [
  {
    title: "Burden of proof \u2014 Ei incumbit probatio qui dicit",
    content:
      "Common law principle established over centuries of English jurisprudence. The party making a claim bears the burden of proving it.",
  },
  {
    title:
      "Right to data verification \u2014 GDPR Article 14, Article 17, DPA 2018",
    content:
      "Data subjects have the right to be informed about how their data is processed and to request erasure where processing is unlawful.",
  },
  {
    title: "Contract requirements \u2014 Common law",
    content:
      "A valid contract requires: offer, acceptance, consideration, and consent. If any element is missing, no binding agreement exists.",
  },
  {
    title:
      "Constitutional standing \u2014 Magna Carta 1215, Article 61",
    content:
      "Invoked in 2001 by the Committee of the Barons and never rescinded. Establishes the right to lawful rebellion against unlawful governance.",
  },
  {
    title: "Consumer protection \u2014 Consumer Rights Act 2015",
    content:
      "Provides statutory rights for consumers including the right to clear information, fair treatment, and recourse for faulty goods and services.",
  },
];

export function EverythingDocumented() {
  return (
    <section className="bg-surface px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-center text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
          Everything Here Is&nbsp;Documented
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-center text-lg leading-relaxed text-text-secondary">
          Every principle used by this tool has a source. Every document
          generated cites specific legislation. This isn&rsquo;t made&nbsp;up.
        </p>

        <Accordion items={citations} />

        <div className="mt-12 rounded-2xl border-2 border-primary/20 bg-primary/5 p-8 text-center">
          <p className="text-lg font-bold leading-relaxed text-primary">
            If any company, solicitor, or legal professional believes anything
            here misrepresents the law, we invite them to cite the specific
            statute or case law that contradicts it.
          </p>
          <p className="mt-2 text-base text-text-secondary">
            We&rsquo;ll publish their response.
          </p>
        </div>
      </div>
    </section>
  );
}
