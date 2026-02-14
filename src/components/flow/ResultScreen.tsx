"use client";

import { useFlow } from "@/engine/context/FlowContext";
import type { DocumentTemplateId } from "@/engine/types";

/** Basic document info lookup — will be replaced with full template data later */
const DOCUMENT_INFO: Record<
  DocumentTemplateId,
  { name: string; description: string; reason: string }
> = {
  "conditional-acceptance": {
    name: "Conditional Acceptance",
    description:
      "States a fact: you will honour any proven obligation. Requires them to provide evidence of the claim — signed contract, verified accounts, lawful authority — within 14 days.",
    reason:
      "They've made a claim. This puts it back on them: prove it, or the matter is closed.",
  },
  "notice-of-default": {
    name: "Notice of Default",
    description:
      "Records that they failed to respond to your requirements within the deadline. Their silence is now on record.",
    reason:
      "They were given a clear, reasonable opportunity to prove their claim. They didn't. This formally records that failure.",
  },
  "affidavit-of-truth": {
    name: "Affidavit of Truth",
    description:
      "A sworn statement of the facts of your case, signed under penalty of perjury. Creates an unrebutted record on the public record.",
    reason:
      "An unrebutted affidavit stands as truth in law. This establishes the facts of your case formally and permanently.",
  },
  "gdpr-account-dispute": {
    name: "GDPR Account Dispute",
    description:
      "Challenges an account opened without your consent using UK GDPR and Data Protection Act 2018. Requires them to prove lawful basis for processing your data.",
    reason:
      "No consent means no lawful basis. This forces them to either produce the evidence of consent or delete your data.",
  },
  "subject-access-request": {
    name: "Subject Access Request",
    description:
      "Compels them to disclose all personal data they hold on you within 30 days. Legally binding under UK GDPR.",
    reason:
      "Forces transparency. When they have to show you everything they hold, the gaps in their evidence become obvious.",
  },
  "council-tax-dsar": {
    name: "Council Tax DSAR",
    description:
      "A data subject access request specifically tailored to council tax records and liability orders. Requires disclosure of the full evidence chain.",
    reason:
      "Councils must disclose the full chain of evidence including the original liability order and how it was obtained.",
  },
  "pre-warrant-challenge": {
    name: "Pre-Warrant Challenge",
    description:
      "A letter sent before a warrant of entry or commitment warrant is executed. Requires them to prove the warrant is lawful and the process was followed correctly.",
    reason:
      "This requires proof that the warrant is lawful and the process that led to it was followed correctly. Procedural errors invalidate enforcement.",
  },
  "bailiff-non-entry": {
    name: "Bailiff Non-Entry Notice",
    description:
      "Formally refuses entry to your property. For most debts, bailiffs cannot force entry. This makes your rights clear.",
    reason:
      "The golden rule: don't let them in. This puts them on formal notice.",
  },
  "warrant-verification": {
    name: "Warrant Verification Request",
    description:
      "Requires the bailiff to produce the original warrant and verify its validity before any enforcement action. You are entitled to see it.",
    reason:
      "You have the right to see and verify any warrant. Many warrants contain errors that invalidate them entirely.",
  },
  "prove-the-debt": {
    name: "Prove the Debt Letter",
    description:
      "Requires the debt collector to produce the full chain of evidence — original agreement, deed of assignment, verified statement, authority to collect.",
    reason:
      "Most debt collectors are chasing claims they can't prove. This calls their bluff with a legally-grounded demand for evidence.",
  },
  "cease-and-desist": {
    name: "Cease and Desist",
    description:
      "A formal demand to stop all contact and collection activity immediately. Continued contact without proof constitutes harassment.",
    reason:
      "Puts them on notice: prove your claim or stop contacting. There is no third option.",
  },
  "nip-response": {
    name: "NIP Response",
    description:
      "A response to a Notice of Intended Prosecution requiring proof that every statutory requirement has been met. NIPs have strict legal requirements.",
    reason:
      "NIPs must comply with strict legal requirements. If any element is defective, the prosecution fails.",
  },
  "parking-defence": {
    name: "Parking Defence Letter",
    description:
      "A defence letter requiring a private parking company to prove their claim on legal and procedural grounds. Private parking charges are invoices, not fines.",
    reason:
      "A private parking company has no more authority than any business sending an invoice. This requires them to prove their claim stands up.",
  },
  "hmrc-conditional-acceptance": {
    name: "HMRC Conditional Acceptance",
    description:
      "A conditional acceptance of HMRC's demand, requiring verified proof of the assessment, the full calculation, and the legal basis.",
    reason:
      "HMRC has broad powers but must still demonstrate a lawful assessment. This requires them to prove it.",
  },
};

export function ResultScreen() {
  const { state, setPhase, resetFlow } = useFlow();

  const docId = state.recommendedDocument;
  const docInfo = docId ? DOCUMENT_INFO[docId] : null;

  return (
    <div className="animate-fade-in-up">
      {/* Celebration icon */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-accent-teal/10 flex items-center justify-center mx-auto mb-6 animate-celebration">
          <svg
            className="w-10 h-10 text-accent-teal"
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
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-primary">
          Here&apos;s Your Document
        </h2>
      </div>

      {/* Document recommendation card */}
      {docInfo ? (
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent-teal/10 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-accent-teal"
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
              <h3 className="text-xl font-bold text-primary">{docInfo.name}</h3>
            </div>
          </div>

          <p className="text-text-primary leading-relaxed mb-4">
            {docInfo.description}
          </p>

          <div className="bg-accent-teal/5 border border-accent-teal/20 rounded-xl p-4">
            <p className="text-sm font-semibold text-accent-teal mb-1">
              Why this document?
            </p>
            <p className="text-sm text-text-primary leading-relaxed">
              {docInfo.reason}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-2xl p-6 sm:p-8 mb-8">
          <p className="text-text-primary text-center">
            We couldn&apos;t match a specific document to your situation. You may
            want to start the process again or consult a legal professional for
            tailored advice.
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="space-y-3">
        {docInfo && (
          <button
            onClick={() => setPhase("user-details")}
            className="w-full min-h-[56px] rounded-xl p-4 px-6 bg-primary text-white text-lg font-semibold hover:bg-primary-light transition-colors"
          >
            Generate Document
          </button>
        )}

        <button
          onClick={resetFlow}
          className="w-full min-h-[56px] rounded-xl p-4 px-6 bg-surface border-2 border-border text-text-secondary text-lg font-medium hover:border-primary hover:text-primary transition-all duration-200"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
