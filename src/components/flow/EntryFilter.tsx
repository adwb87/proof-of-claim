"use client";

import { useState } from "react";
import { useFlow } from "@/engine/context/FlowContext";

export function EntryFilter() {
  const { setPhase } = useFlow();
  const [showExit, setShowExit] = useState(false);

  if (showExit) {
    return (
      <div className="animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-error"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-4">
            This Tool Is Not For Your Situation
          </h2>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
          <p className="text-lg text-text-primary leading-relaxed">
            If harm has occurred, the matter should be resolved through proper
            legal channels. We recommend seeking professional legal advice.
          </p>
          <p className="text-text-secondary mt-4">
            This tool is designed exclusively for people who have received
            demands for money where no living person or their property has
            suffered actual harm, loss, or damage.
          </p>
        </div>

        <button
          onClick={() => setShowExit(false)}
          className="w-full min-h-[56px] rounded-xl p-4 px-6 bg-surface border-2 border-border text-text-primary text-lg font-medium hover:border-primary hover:bg-primary/5 transition-all duration-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      {/* Heading */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-accent-teal/10 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-accent-teal"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
          Before We Begin
        </h2>
      </div>

      {/* Warning box */}
      <div className="bg-warning/5 border-2 border-warning/30 rounded-2xl p-5 sm:p-6 mb-8">
        <div className="flex gap-3 mb-3">
          <svg
            className="w-6 h-6 text-warning flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <div>
            <p className="text-lg font-semibold text-warning mb-2">
              Important Disclaimer
            </p>
            <p className="text-text-primary leading-relaxed text-base sm:text-lg">
              This tool is for people who have received demands for money that
              have not been supported with proof. It is{" "}
              <strong className="font-bold">NOT</strong> for anyone who has
              caused intentional harm, loss, or damage to another person or
              their property.
            </p>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <p className="text-xl font-semibold text-primary mb-2 text-center">
          Has any living person or their property suffered actual harm, loss, or
          damage as a direct result of your actions?
        </p>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => setShowExit(true)}
          className="w-full min-h-[56px] rounded-xl p-4 px-6 bg-surface border-2 border-border text-text-primary text-lg font-medium text-left hover:border-error hover:bg-error/5 transition-all duration-200"
        >
          <span className="font-semibold">Yes</span>
          <span className="block text-sm text-text-secondary mt-1">
            Harm, loss, or damage has occurred
          </span>
        </button>

        <button
          onClick={() => setPhase("category-select")}
          className="w-full min-h-[56px] rounded-xl p-4 px-6 bg-surface border-2 border-border text-text-primary text-lg font-medium text-left hover:border-accent-teal hover:bg-accent-teal/5 transition-all duration-200"
        >
          <span className="font-semibold">No</span>
          <span className="block text-sm text-text-secondary mt-1">
            No one has been harmed — I&apos;ve received a demand for money and I
            require proof
          </span>
        </button>
      </div>
    </div>
  );
}
