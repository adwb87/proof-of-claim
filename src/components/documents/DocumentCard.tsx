import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { DocumentTemplateId } from "@/engine/types";

interface DocumentCardProps {
  id: DocumentTemplateId;
  name: string;
  shortDescription: string;
}

export function DocumentCard({ id, name, shortDescription }: DocumentCardProps) {
  return (
    <Link href={`/start?document=${id}`}>
      <Card hover padding="md" className="h-full">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-primary text-base mb-1">
              {name}
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
