"use client";

import { useState } from "react";
import { useFlow } from "@/engine/context/FlowContext";
import { Button } from "@/components/ui/Button";

type Step = "name" | "address" | "reference" | "review";

export function UserDetailsForm() {
  const { state, setUserDetails, setPhase } = useFlow();
  const [step, setStep] = useState<Step>("name");
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const animClass =
    direction === "forward" ? "animate-slide-in-right" : "animate-slide-in-left";

  function handleNext(nextStep: Step) {
    setDirection("forward");
    setStep(nextStep);
  }

  function handleBack(prevStep: Step) {
    setDirection("backward");
    setStep(prevStep);
  }

  function handleGenerate() {
    setPhase("document-preview");
  }

  return (
    <div className="max-w-lg mx-auto">
      {step === "name" && (
        <div key="name" className={animClass}>
          <p className="text-sm text-accent-teal font-medium mb-2">Step 1 of 3</p>
          <h2 className="text-2xl font-bold text-primary mb-2">
            What&apos;s your full name?
          </h2>
          <p className="text-text-secondary mb-6">
            This will appear on your document exactly as you type it.
          </p>
          <input
            type="text"
            value={state.userDetails.fullName}
            onChange={(e) => setUserDetails({ fullName: e.target.value })}
            placeholder="e.g. John David Smith"
            className="w-full rounded-xl border-2 border-border bg-surface p-4 text-lg text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors"
            autoFocus
          />
          <div className="mt-8">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={!state.userDetails.fullName.trim()}
              onClick={() => handleNext("address")}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === "address" && (
        <div key="address" className={animClass}>
          <p className="text-sm text-accent-teal font-medium mb-2">Step 2 of 3</p>
          <h2 className="text-2xl font-bold text-primary mb-2">
            What&apos;s your address?
          </h2>
          <p className="text-text-secondary mb-6">
            This appears as the sender address on your document.
          </p>
          <textarea
            value={state.userDetails.address}
            onChange={(e) => setUserDetails({ address: e.target.value })}
            placeholder={"123 Example Street\nTown\nCounty\nAB1 2CD"}
            rows={4}
            className="w-full rounded-xl border-2 border-border bg-surface p-4 text-lg text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors resize-none"
            autoFocus
          />
          <div className="mt-8 flex gap-3">
            <Button variant="outline" size="lg" onClick={() => handleBack("name")}>
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              disabled={!state.userDetails.address.trim()}
              onClick={() => handleNext("reference")}
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === "reference" && (
        <div key="reference" className={animClass}>
          <p className="text-sm text-accent-teal font-medium mb-2">Step 3 of 3</p>
          <h2 className="text-2xl font-bold text-primary mb-2">
            Their reference or account number?
          </h2>
          <p className="text-text-secondary mb-6">
            If they included a reference number on their letter, enter it here.
            This is optional — you can skip if you don&apos;t have one.
          </p>
          <input
            type="text"
            value={state.userDetails.referenceNumber || ""}
            onChange={(e) => setUserDetails({ referenceNumber: e.target.value })}
            placeholder="e.g. ACC-123456789"
            className="w-full rounded-xl border-2 border-border bg-surface p-4 text-lg text-text-primary placeholder:text-text-secondary/50 focus:border-primary focus:outline-none transition-colors"
            autoFocus
          />
          <div className="mt-8 flex gap-3">
            <Button variant="outline" size="lg" onClick={() => handleBack("address")}>
              Back
            </Button>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => handleNext("review")}
            >
              {state.userDetails.referenceNumber?.trim()
                ? "Continue"
                : "Skip & Continue"}
            </Button>
          </div>
        </div>
      )}

      {step === "review" && (
        <div key="review" className={animClass}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-accent-teal/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-accent-teal"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-primary">
              Review Your Details
            </h2>
          </div>

          <div className="space-y-4 bg-surface rounded-xl border border-border p-6">
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">
                Full Name
              </p>
              <p className="text-lg font-medium text-text-primary">
                {state.userDetails.fullName}
              </p>
            </div>
            <div className="border-t border-border pt-4">
              <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">
                Address
              </p>
              <p className="text-text-primary whitespace-pre-line">
                {state.userDetails.address}
              </p>
            </div>
            {state.userDetails.referenceNumber && (
              <div className="border-t border-border pt-4">
                <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">
                  Their Reference
                </p>
                <p className="text-text-primary">
                  {state.userDetails.referenceNumber}
                </p>
              </div>
            )}
            {state.entity && (
              <div className="border-t border-border pt-4">
                <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">
                  Sending To
                </p>
                <p className="text-lg font-medium text-text-primary">
                  {state.entity.name}
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleBack("reference")}
            >
              Edit
            </Button>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleGenerate}
            >
              Generate Document
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
