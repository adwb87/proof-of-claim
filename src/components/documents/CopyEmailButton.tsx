"use client";

import { useState } from "react";
import { useFlow } from "@/engine/context/FlowContext";
import { Button } from "@/components/ui/Button";

export function CopyEmailButton() {
  const { state } = useFlow();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const { formatAsEmail } = await import("@/engine/lib/email-formatter");
    const { body } = formatAsEmail({
      documentId: state.recommendedDocument!,
      userDetails: state.userDetails,
      entity: state.entity!,
      answers: state.answers,
      category: state.category!,
    });

    try {
      await navigator.clipboard.writeText(body);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = body;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <Button variant="secondary" size="lg" fullWidth onClick={handleCopy}>
      {copied ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Copied to clipboard!
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
          Copy as Email Text
        </span>
      )}
    </Button>
  );
}
