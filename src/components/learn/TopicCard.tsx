import Link from "next/link";
import { Card } from "@/components/ui/Card";

interface TopicCardProps {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
}

export function TopicCard({ slug, title, shortDescription, icon }: TopicCardProps) {
  return (
    <Link href={`/learn/${slug}`}>
      <Card hover padding="md" className="h-full">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-primary"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={icon} />
            </svg>
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-primary text-base mb-1">
              {title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {shortDescription}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
