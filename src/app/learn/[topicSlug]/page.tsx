import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { TopicContent } from "@/components/learn/TopicContent";
import { RelatedTopics } from "@/components/learn/RelatedTopics";
import { LEARN_TOPICS } from "@/engine/data/learn-topics";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ topicSlug: string }>;
}

export function generateStaticParams() {
  return LEARN_TOPICS.map((topic) => ({
    topicSlug: topic.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topicSlug } = await params;
  const topic = LEARN_TOPICS.find((t) => t.slug === topicSlug);
  if (!topic) return { title: "Topic Not Found" };
  return {
    title: `${topic.title} — Learn — Proof of Claim`,
    description: topic.shortDescription,
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { topicSlug } = await params;
  const topic = LEARN_TOPICS.find((t) => t.slug === topicSlug);

  if (!topic) {
    notFound();
  }

  return (
    <PageContainer narrow>
      <div className="mb-6">
        <Link
          href="/learn"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors mb-4"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Topics
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">
          {topic.title}
        </h1>
        <p className="text-lg text-text-secondary mt-2">
          {topic.shortDescription}
        </p>
      </div>

      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8">
        <TopicContent sections={topic.sections} callouts={topic.callouts} />
      </div>

      <RelatedTopics topicSlugs={topic.relatedTopicSlugs} />

      <div className="mt-12 bg-accent-teal/5 border border-accent-teal/10 rounded-xl p-6 text-center">
        <h3 className="font-semibold text-primary mb-2">
          Ready to use what you&apos;ve learned?
        </h3>
        <p className="text-text-secondary mb-4">
          Start a guided challenge and get the right document for your
          situation.
        </p>
        <Link
          href="/start"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-light transition-colors"
        >
          Start a Case
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </PageContainer>
  );
}
