"use client";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusConfig: Record<
  string,
  { label: string; className: string; icon?: string }
> = {
  AWAITING_RESPONSE: {
    label: "Awaiting Response",
    className: "bg-warning/10 text-warning",
  },
  RESPONSE_RECEIVED: {
    label: "Response Received",
    className: "bg-success/10 text-success",
  },
  ACTION_REQUIRED: {
    label: "Action Required",
    className: "bg-primary/10 text-primary",
  },
  CLOSED_DEFAULT: {
    label: "Closed \u2014 Default",
    className: "bg-border/50 text-text-secondary",
  },
  RESOLVED: {
    label: "Resolved",
    className: "bg-success/10 text-success",
    icon: "check",
  },
  ESCALATED: {
    label: "Escalated",
    className: "bg-error/10 text-error",
  },
};

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status] ?? {
    label: status,
    className: "bg-border/50 text-text-secondary",
  };

  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
        config.className,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {config.icon === "check" && (
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      )}
      {config.label}
    </span>
  );
}
