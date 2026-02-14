"use client";

interface TimelineEvent {
  id: string;
  eventType: string;
  title: string;
  detail?: string | null;
  createdAt: string;
}

interface CaseTimelineProps {
  events: TimelineEvent[];
}

const eventTypeColors: Record<string, string> = {
  case_created: "bg-accent-teal",
  document_sent: "bg-primary",
  response_received: "bg-success",
  status_changed: "bg-warning",
  reminder_set: "bg-accent",
  note_added: "bg-text-secondary",
};

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "Just now";
  if (diffMinutes < 60)
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  if (diffHours < 24)
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  if (diffDays < 30)
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function CaseTimeline({ events }: CaseTimelineProps) {
  if (!events || events.length === 0) {
    return (
      <div className="py-12 text-center">
        <svg
          className="mx-auto mb-3 h-10 w-10 text-text-secondary/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-sm text-text-secondary">No activity yet</p>
      </div>
    );
  }

  // Sort newest first
  const sorted = [...events].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="relative">
      {sorted.map((event, index) => {
        const dotColor =
          eventTypeColors[event.eventType] || "bg-text-secondary";
        const isLast = index === sorted.length - 1;

        return (
          <div key={event.id} className="relative flex gap-4 pb-6">
            {/* Connecting line */}
            {!isLast && (
              <div className="absolute left-[9px] top-5 h-full w-0.5 bg-border" />
            )}

            {/* Dot */}
            <div className="relative z-10 flex-shrink-0">
              <div
                className={[
                  "h-[20px] w-[20px] rounded-full border-[3px] border-surface",
                  dotColor,
                ].join(" ")}
              />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-sm font-semibold text-text-primary">
                {event.title}
              </p>
              {event.detail && (
                <p className="mt-0.5 text-sm text-text-secondary">
                  {event.detail}
                </p>
              )}
              <p className="mt-1 text-xs text-text-secondary/70">
                {formatRelativeTime(event.createdAt)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
