"use client";

import { useState } from "react";
import { useFlow } from "@/engine/context/FlowContext";
import { Button } from "@/components/ui/Button";

export function DownloadButton() {
  const { state } = useFlow();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  async function handleDownload() {
    setIsGenerating(true);
    try {
      // Dynamic import to keep docx bundle out of initial load
      const { generateDocx, downloadDocx } = await import(
        "@/engine/lib/document-generator"
      );
      const blob = await generateDocx({
        documentId: state.recommendedDocument!,
        userDetails: state.userDetails,
        entity: state.entity!,
        answers: state.answers,
        category: state.category!,
      });
      const filename = `proof-of-claim-${state.recommendedDocument}-${Date.now()}.docx`;
      downloadDocx(blob, filename);
      setIsComplete(true);
      setTimeout(() => setIsComplete(false), 3000);
    } catch (err) {
      console.error("Document generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Button
      variant="primary"
      size="lg"
      fullWidth
      onClick={handleDownload}
      disabled={isGenerating}
    >
      {isComplete ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5 animate-celebration"
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
          Downloaded!
        </span>
      ) : isGenerating ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="w-5 h-5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
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
          Generating...
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
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download .docx
        </span>
      )}
    </Button>
  );
}
