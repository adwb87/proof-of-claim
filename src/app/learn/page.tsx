import { PageContainer } from "@/components/layout/PageContainer";
import { TopicCard } from "@/components/learn/TopicCard";
import { LEARN_TOPICS } from "@/engine/data/learn-topics";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn Your Rights — Proof of Claim",
  description:
    "14 educational topics covering common law, GDPR, burden of proof, contracts, council tax, energy bills, debt collectors, bailiffs, and more.",
};

export default function LearnPage() {
  return (
    <PageContainer>
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3">
          Learn Your Rights
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          Knowledge is your most powerful tool. Explore these topics to
          understand the legal principles behind every document we generate.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LEARN_TOPICS.map((topic) => (
          <TopicCard
            key={topic.slug}
            slug={topic.slug}
            title={topic.title}
            shortDescription={topic.shortDescription}
            icon={topic.icon}
          />
        ))}
      </div>

      <div className="mt-12 bg-primary/5 border border-primary/10 rounded-xl p-6 text-center">
        <h2 className="font-semibold text-primary mb-2">
          Ready to put this knowledge into action?
        </h2>
        <p className="text-text-secondary mb-4">
          Our guided flow turns your rights into real documents you can send.
        </p>
        <a
          href="/start"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-light transition-colors"
        >
          Challenge a Demand
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </PageContainer>
  );
}
