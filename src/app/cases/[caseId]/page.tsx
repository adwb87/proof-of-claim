"use client";

import { useEffect, useState, useCallback } from "react";
import { use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatusBadge } from "@/components/cases/StatusBadge";
import { CaseTimeline } from "@/components/cases/CaseTimeline";
import { ResponseLogger } from "@/components/cases/ResponseLogger";
import { ReminderBadge } from "@/components/cases/ReminderBadge";

interface TimelineEvent {
  id: string;
  eventType: string;
  title: string;
  detail?: string | null;
  createdAt: string;
}

interface Reminder {
  id: string;
  dueDate: string;
  title: string;
  sent: boolean;
}

interface CaseDetail {
  id: string;
  status: string;
  category: string;
  entityName: string;
  entityAddress?: string | null;
  referenceNumber?: string | null;
  recommendedDocument: string;
  createdAt: string;
  updatedAt: string;
  timeline: TimelineEvent[];
  reminders: Reminder[];
  _count?: {
    documents: number;
    responses: number;
  };
}

function formatCategory(category: string): string {
  return category
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDocumentName(templateId: string): string {
  return templateId
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-border/50 ${className}`} />;
}

export default function CaseDetailPage({
  params,
}: {
  params: Promise<{ caseId: string }>;
}) {
  const { caseId } = use(params);

  const [caseData, setCaseData] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reminderTitle, setReminderTitle] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [settingReminder, setSettingReminder] = useState(false);

  const fetchCase = useCallback(async () => {
    try {
      const res = await fetch(`/api/cases/${caseId}`);
      if (!res.ok) throw new Error("Failed to load case");
      const data = await res.json();
      setCaseData(data);
    } catch {
      setError("Could not load this case. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [caseId]);

  useEffect(() => {
    fetchCase();
  }, [fetchCase]);

  async function handleSetReminder(e: React.FormEvent) {
    e.preventDefault();
    if (!reminderTitle.trim() || !reminderDate) return;
    setSettingReminder(true);
    try {
      const res = await fetch(`/api/cases/${caseId}/reminders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: reminderTitle.trim(),
          dueDate: new Date(reminderDate).toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setReminderTitle("");
      setReminderDate("");
      fetchCase(); // Refresh data
    } catch {
      // Silently fail - could add toast here
    } finally {
      setSettingReminder(false);
    }
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <SkeletonBlock className="mb-4 h-4 w-24" />
          <SkeletonBlock className="mb-3 h-8 w-64" />
          <div className="flex gap-2">
            <SkeletonBlock className="h-6 w-20 rounded-full" />
            <SkeletonBlock className="h-6 w-32 rounded-full" />
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SkeletonBlock className="h-64 rounded-2xl" />
          </div>
          <div className="space-y-6 lg:col-span-2">
            <SkeletonBlock className="h-48 rounded-2xl" />
            <SkeletonBlock className="h-72 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !caseData) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-error/10">
          <svg
            className="h-8 w-8 text-error"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-bold text-primary">
          Case not found
        </h2>
        <p className="mb-6 text-text-secondary">
          {error || "This case doesn't exist or you don't have access."}
        </p>
        <Link href="/cases">
          <Button variant="outline">Back to My Cases</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Back link */}
      <Link
        href="/cases"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-primary"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        Back to My Cases
      </Link>

      {/* Reminder badge */}
      {caseData.reminders && caseData.reminders.length > 0 && (
        <div className="mb-4">
          <ReminderBadge reminders={caseData.reminders} />
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-primary sm:text-3xl">
          {caseData.entityName}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={caseData.status} />
          <Badge variant="info">{formatCategory(caseData.category)}</Badge>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-8 lg:grid-cols-5">
        {/* Left column - Timeline */}
        <div className="lg:col-span-3">
          <Card padding="md">
            <h2 className="mb-5 text-lg font-bold text-primary">
              Case Timeline
            </h2>
            <CaseTimeline events={caseData.timeline} />
          </Card>
        </div>

        {/* Right column - Details, Response Logger, Reminder */}
        <div className="space-y-6 lg:col-span-2">
          {/* Case details */}
          <Card padding="md">
            <h2 className="mb-4 text-lg font-bold text-primary">
              Case Details
            </h2>
            <dl className="space-y-3">
              {caseData.referenceNumber && (
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                    Reference Number
                  </dt>
                  <dd className="mt-0.5 text-sm font-medium text-text-primary">
                    {caseData.referenceNumber}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Recommended Document
                </dt>
                <dd className="mt-0.5 text-sm font-medium text-text-primary">
                  {formatDocumentName(caseData.recommendedDocument)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Case Opened
                </dt>
                <dd className="mt-0.5 text-sm text-text-primary">
                  {formatDate(caseData.createdAt)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                  Last Updated
                </dt>
                <dd className="mt-0.5 text-sm text-text-primary">
                  {formatDate(caseData.updatedAt)}
                </dd>
              </div>
            </dl>

            {/* Generate Next Document button */}
            {caseData.status === "ACTION_REQUIRED" && (
              <div className="mt-5 border-t border-border pt-5">
                <Link href={`/documents/generate?caseId=${caseData.id}`}>
                  <Button variant="primary" size="sm" fullWidth>
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                        />
                      </svg>
                      Generate Next Document
                    </span>
                  </Button>
                </Link>
              </div>
            )}
          </Card>

          {/* Response Logger */}
          <Card padding="md">
            <h2 className="mb-4 text-lg font-bold text-primary">
              Log a Response
            </h2>
            <ResponseLogger
              caseId={caseData.id}
              onResponseLogged={fetchCase}
            />
          </Card>

          {/* Set Reminder */}
          <Card padding="md">
            <h2 className="mb-4 text-lg font-bold text-primary">
              Set Reminder
            </h2>
            <form onSubmit={handleSetReminder} className="space-y-3">
              <div>
                <label
                  htmlFor="reminder-title"
                  className="mb-1 block text-sm font-medium text-text-primary"
                >
                  Reminder title
                </label>
                <input
                  id="reminder-title"
                  type="text"
                  value={reminderTitle}
                  onChange={(e) => setReminderTitle(e.target.value)}
                  placeholder="e.g. Follow up if no response"
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="reminder-date"
                  className="mb-1 block text-sm font-medium text-text-primary"
                >
                  Due date
                </label>
                <input
                  id="reminder-date"
                  type="date"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                fullWidth
                disabled={
                  !reminderTitle.trim() || !reminderDate || settingReminder
                }
              >
                {settingReminder ? "Setting..." : "Set Reminder"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
