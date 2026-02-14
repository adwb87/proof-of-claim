"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatusBadge } from "@/components/cases/StatusBadge";

interface CaseData {
  id: string;
  status: string;
  category: string;
  entityName: string;
  referenceNumber?: string | null;
  recommendedDocument: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    documents: number;
    responses: number;
  };
}

interface CaseCardProps {
  case: CaseData;
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Created today";
  if (diffDays === 1) return "Created yesterday";
  if (diffDays < 30) return `Created ${diffDays} days ago`;
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `Created ${months} month${months !== 1 ? "s" : ""} ago`;
  }
  return `Created ${date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;
}

function formatCategory(category: string): string {
  return category
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function CaseCard({ case: caseData }: CaseCardProps) {
  const docCount = caseData._count?.documents ?? 0;
  const responseCount = caseData._count?.responses ?? 0;

  return (
    <Link href={`/cases/${caseData.id}`} className="block">
      <Card hover padding="md" className="h-full">
        <div className="flex flex-col gap-3">
          {/* Top row: badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="info">{formatCategory(caseData.category)}</Badge>
            <StatusBadge status={caseData.status} />
          </div>

          {/* Entity name */}
          <h3 className="text-lg font-semibold leading-snug text-text-primary">
            {caseData.entityName}
          </h3>

          {/* Reference number */}
          {caseData.referenceNumber && (
            <p className="text-sm text-text-secondary">
              Ref: {caseData.referenceNumber}
            </p>
          )}

          {/* Counts */}
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4"
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
              {docCount} document{docCount !== 1 ? "s" : ""} sent
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
              {responseCount} response{responseCount !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Created time */}
          <p className="text-xs text-text-secondary/70">
            {formatRelativeTime(caseData.createdAt)}
          </p>
        </div>
      </Card>
    </Link>
  );
}
