import { LEARN_TOPICS } from "@/engine/data/learn-topics";
import { TopicCard } from "./TopicCard";

interface RelatedTopicsProps {
  topicSlugs: string[];
}

export function RelatedTopics({ topicSlugs }: RelatedTopicsProps) {
  const topics = topicSlugs
    .map((slug) => LEARN_TOPICS.find((t) => t.slug === slug))
    .filter(Boolean);

  if (topics.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="text-lg font-bold text-primary mb-4">Related Topics</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {topics.map((topic) => (
          <TopicCard
            key={topic!.slug}
            slug={topic!.slug}
            title={topic!.title}
            shortDescription={topic!.shortDescription}
            icon={topic!.icon}
          />
        ))}
      </div>
    </div>
  );
}
