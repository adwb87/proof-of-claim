"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface ResponseLoggerProps {
  caseId: string;
  onResponseLogged?: () => void;
}

const responseTypes = [
  {
    value: "full_compliance",
    label: "Full Compliance",
    icon: (
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
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: "border-success text-success bg-success/5",
    activeColor: "border-success bg-success text-white",
  },
  {
    value: "partial",
    label: "Partial Response",
    icon: (
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
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
    ),
    color: "border-warning text-warning bg-warning/5",
    activeColor: "border-warning bg-warning text-white",
  },
  {
    value: "refusal",
    label: "Refusal",
    icon: (
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
          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        />
      </svg>
    ),
    color: "border-error text-error bg-error/5",
    activeColor: "border-error bg-error text-white",
  },
  {
    value: "threat",
    label: "Threat / Escalation",
    icon: (
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
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
    ),
    color: "border-error text-error bg-error/5",
    activeColor: "border-error bg-error text-white",
  },
  {
    value: "no_response",
    label: "No Response (14 days)",
    icon: (
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
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    color: "border-text-secondary text-text-secondary bg-text-secondary/5",
    activeColor:
      "border-text-secondary bg-text-secondary text-white",
  },
];

export function ResponseLogger({
  caseId,
  onResponseLogged,
}: ResponseLoggerProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [summary, setSummary] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedType || !summary.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/cases/${caseId}/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responseType: selectedType,
          summary: summary.trim(),
          nextAction: nextAction.trim() || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to log response");
      }

      // Reset form
      setSelectedType(null);
      setSummary("");
      setNextAction("");

      // Show toast
      setToast("Response logged successfully");
      setTimeout(() => setToast(null), 3000);

      // Callback
      onResponseLogged?.();
    } catch {
      setToast("Failed to log response. Please try again.");
      setTimeout(() => setToast(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-semibold text-text-primary">
          Response Type
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {responseTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setSelectedType(type.value)}
              className={[
                "flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-left text-sm font-medium transition-all duration-200",
                selectedType === type.value ? type.activeColor : type.color,
              ].join(" ")}
            >
              {type.icon}
              <span className="leading-tight">{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="response-summary"
          className="mb-1.5 block text-sm font-semibold text-text-primary"
        >
          Summary
        </label>
        <textarea
          id="response-summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Describe what they said or did..."
          rows={3}
          className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>

      <div>
        <label
          htmlFor="next-action"
          className="mb-1.5 block text-sm font-semibold text-text-primary"
        >
          Next Action{" "}
          <span className="font-normal text-text-secondary">(optional)</span>
        </label>
        <textarea
          id="next-action"
          value={nextAction}
          onChange={(e) => setNextAction(e.target.value)}
          placeholder="What should you do next?"
          rows={2}
          className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="sm"
        fullWidth
        disabled={!selectedType || !summary.trim() || isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Logging Response...
          </span>
        ) : (
          "Log Response"
        )}
      </Button>

      {/* Toast */}
      {toast && (
        <div
          className={[
            "animate-fade-in rounded-xl px-4 py-3 text-center text-sm font-medium",
            toast.includes("Failed")
              ? "bg-error/10 text-error"
              : "bg-success/10 text-success",
          ].join(" ")}
        >
          {toast}
        </div>
      )}
    </form>
  );
}
