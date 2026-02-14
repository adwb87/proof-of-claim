"use client";

import { useFlow } from "@/engine/context/FlowContext";
import { Button } from "@/components/ui/Button";
import { DownloadButton } from "./DownloadButton";
import { CopyEmailButton } from "./CopyEmailButton";

export function DocumentPreview() {
  const { state, setPhase } = useFlow();
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-primary">Your Document</h2>
          <p className="text-sm text-text-secondary">
            Review before downloading
          </p>
        </div>
      </div>

      {/* Letter preview */}
      <div className="bg-white rounded-xl border border-border shadow-sm p-8 sm:p-10 space-y-6 font-serif text-[15px] leading-relaxed text-text-primary">
        {/* Date */}
        <p className="text-right text-sm text-text-secondary">{today}</p>

        {/* Sender */}
        <div className="text-right text-sm">
          <p className="font-semibold">{state.userDetails.fullName}</p>
          <p className="whitespace-pre-line text-text-secondary">
            {state.userDetails.address}
          </p>
        </div>

        {/* Recipient */}
        {state.entity && (
          <div className="text-sm">
            <p className="font-semibold">{state.entity.name}</p>
            {state.entity.address && (
              <p className="text-text-secondary whitespace-pre-line">
                {state.entity.address}
              </p>
            )}
          </div>
        )}

        {/* Reference */}
        {state.userDetails.referenceNumber && (
          <p className="text-sm">
            <span className="text-text-secondary">Reference: </span>
            <span className="font-medium">
              {state.userDetails.referenceNumber}
            </span>
          </p>
        )}

        {/* Subject */}
        <p className="font-bold text-primary border-b border-border pb-2">
          Subject: Conditional Acceptance — Proof of Claim Required
        </p>

        {/* Body preview */}
        <div className="space-y-4">
          <p>Dear Sir/Madam,</p>

          <p>
            I acknowledge receipt of your correspondence regarding the above
            reference. I am willing to settle any verified, proven obligation.
          </p>

          <p>
            Before any payment can be made, the following evidence is required
            within{" "}
            <strong>fourteen (14) days</strong> of the date of this letter:
          </p>

          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>
              A verified, wet-ink signed contract or agreement between myself
              and your organisation, demonstrating my informed consent to the
              terms under which you are claiming payment.
            </li>
            <li>
              A full and complete statement of account from inception,
              verified by a named individual with personal knowledge of its
              accuracy, under penalty of perjury.
            </li>
            <li>
              Evidence of your lawful authority to make this claim and to
              process my personal data for this purpose, in compliance with
              the UK General Data Protection Regulation (UK GDPR) Article 6.
            </li>
          </ol>

          <p>
            I conditionally accept your claim. Provide the above evidence
            within the stated timeframe. Failure to do so will be treated as an
            admission that no valid claim exists.
          </p>

          <p className="text-sm text-text-secondary italic">
            [Full document content will appear in the downloaded .docx file]
          </p>

          <p>Yours faithfully,</p>

          <div className="pt-4">
            <p className="font-semibold">{state.userDetails.fullName}</p>
            <p className="text-xs text-text-secondary mt-2">
              Without prejudice to my rights. All rights reserved. Errors and
              omissions excepted.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 space-y-3">
        <DownloadButton />
        <CopyEmailButton />
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            size="md"
            onClick={() => setPhase("user-details")}
          >
            Edit Details
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={() => setPhase("complete")}
          >
            Done
          </Button>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-accent-teal/5 border border-accent-teal/10 rounded-xl p-5">
        <h3 className="font-semibold text-primary text-sm mb-2">
          What to do next
        </h3>
        <ul className="text-sm text-text-secondary space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="text-accent-teal mt-0.5">1.</span>
            Download the .docx file and review it carefully
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-teal mt-0.5">2.</span>
            Print and sign it, or send via email (copy the email version)
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-teal mt-0.5">3.</span>
            Send by recorded delivery if posting — keep the proof of postage
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-teal mt-0.5">4.</span>
            Mark the date on your calendar — they have 14 days to respond
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-teal mt-0.5">5.</span>
            If they fail to respond within the deadline, come back for a Notice
            of Default
          </li>
        </ul>
      </div>
    </div>
  );
}
