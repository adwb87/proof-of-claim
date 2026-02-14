"use client";

interface Reminder {
  id: string;
  dueDate: string;
  title: string;
  sent: boolean;
}

interface ReminderBadgeProps {
  reminders: Reminder[];
}

function getDaysUntil(dateStr: string): number {
  const now = new Date();
  const due = new Date(dateStr);
  const diffMs = due.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function ReminderBadge({ reminders }: ReminderBadgeProps) {
  const upcomingUnsent = reminders
    .filter((r) => !r.sent)
    .sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );

  if (upcomingUnsent.length === 0) return null;

  const next = upcomingUnsent[0];
  const daysUntil = getDaysUntil(next.dueDate);

  if (daysUntil < 0) {
    // Overdue
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-error/10 px-3 py-1 text-xs font-semibold text-error">
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        Overdue: {next.title}
      </span>
    );
  }

  if (daysUntil <= 3) {
    // Due soon
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-3 py-1 text-xs font-semibold text-warning">
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {next.title} &mdash; due in {daysUntil} day{daysUntil !== 1 ? "s" : ""}
      </span>
    );
  }

  // Not urgent, don't render
  return null;
}
