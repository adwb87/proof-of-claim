import { PageContainer } from "@/components/layout/PageContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why We Built This — Proof of Claim",
  description:
    "The story behind Proof of Claim and why holding companies to their burden of proof matters.",
};

export default function AboutPage() {
  return (
    <PageContainer narrow>
      <article className="space-y-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">
          Why We Built This
        </h1>

        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 space-y-6 text-text-primary leading-relaxed">
          <p className="text-lg text-text-secondary">
            Every year, millions of people in the UK receive demands for money
            they may not legally owe. Energy bills with no verified meter
            readings. Council tax demands with no proof of a valid liability
            order. Parking charges from companies with no contractual standing.
            Debt collection letters for debts that were never properly assigned.
          </p>

          <p>
            Most people pay because they&apos;re afraid. The letters are
            designed to frighten — threatening court action, bailiff visits,
            credit score damage, even imprisonment. The language is deliberately
            intimidating, using legal-sounding terms that most people
            don&apos;t understand.
          </p>

          <p>
            But here&apos;s what they don&apos;t want you to know:{" "}
            <strong className="text-primary">
              the burden of proof is always on the claimant.
            </strong>
          </p>

          <p>
            This isn&apos;t a conspiracy theory. It&apos;s how English common
            law has worked for centuries. If someone claims you owe them money,
            they must prove it. Not assert it. Not threaten you into paying it.{" "}
            <em>Prove it.</em>
          </p>

          <div className="bg-background rounded-xl p-6 border border-border">
            <h2 className="text-xl font-semibold text-primary mb-3">
              What &quot;Proof&quot; Means
            </h2>
            <p className="mb-4">
              When we say proof, we mean actual evidence that would stand up in
              court:
            </p>
            <ul className="space-y-2">
              {[
                "A signed contract or agreement between you and the claimant",
                "Verified, substantiated account records — not computer-generated summaries",
                "Evidence of the legal authority under which they're acting",
                "Proof that the specific amount demanded is accurate and lawful",
                "Documentation showing the proper chain of assignment (for debts sold on)",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-accent-teal mt-0.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <h2 className="text-xl font-semibold text-primary">
            This Tool Doesn&apos;t Help You Avoid Legitimate Debts
          </h2>

          <p>
            Let&apos;s be absolutely clear: if you genuinely owe money and it
            can be properly evidenced, you should pay it. This tool is not about
            getting out of real obligations.
          </p>

          <p>
            What this tool <em>does</em> is give you the ability to ask a
            simple question:{" "}
            <strong className="text-primary">
              &quot;Can you prove I owe this?&quot;
            </strong>
          </p>

          <p>
            If they can — great. You now have clarity and can make an informed
            decision. If they can&apos;t — and many cannot — then you have
            every right to withhold payment until they do.
          </p>

          <h2 className="text-xl font-semibold text-primary">
            Who This Is For
          </h2>

          <ul className="space-y-3">
            {[
              "Anyone who's received a bill or demand they're unsure about",
              "People being chased by debt collectors for unverified amounts",
              "People facing council tax demands without proper liability orders",
              "Drivers receiving parking charges from private companies",
              "Anyone threatened with bailiff action who doesn't understand their rights",
              "People who feel overwhelmed by legal-sounding correspondence",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-accent mt-2.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
            <h2 className="text-xl font-semibold text-primary mb-3">
              Our Principles
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Free Forever",
                  desc: "This tool will never charge you. Access to legal knowledge shouldn't be paywalled.",
                },
                {
                  title: "Privacy First",
                  desc: "Your data stays on your device. We don't store, track, or sell your information.",
                },
                {
                  title: "Plain English",
                  desc: "Every concept is explained clearly. Legal jargon is translated into language you can understand.",
                },
                {
                  title: "Court-Ready",
                  desc: "Every document generated could be read aloud in a courtroom. Professional, measured, and grounded in law.",
                },
              ].map((item, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-primary">{item.title}</h3>
                  <p className="text-sm text-text-secondary mt-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </PageContainer>
  );
}
