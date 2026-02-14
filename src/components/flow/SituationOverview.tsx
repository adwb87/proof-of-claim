"use client";

import { useFlow } from "@/engine/context/FlowContext";
import { Accordion } from "@/components/ui/Accordion";

export function SituationOverview() {
  const { state, setPhase } = useFlow();

  const accordionItems = [
    {
      title: "Why does consent matter?",
      content:
        "A valid contract requires four elements: offer, acceptance, consideration, and consent. If ANY of these is missing, no contract exists. The argument that 'you used the service' or 'you live at the property' does not constitute consent. A deemed contract is not a signed contract.",
    },
    {
      title: "Why is a bill just an assertion?",
      content:
        "A bill is a claim, not proof. What WOULD prove a debt: a signed contract, a court judgment, verified account records. What DOESN'T prove a debt: a bill, a statement, a threatening letter, a debt collector's letter. These are all assertions \u2014 claims without evidence.",
    },
    {
      title: "How did they get my details?",
      content:
        "Under GDPR, organisations must have a lawful basis to process your personal data. If your energy or water company obtained your details from a landlord, previous tenant, or property records without your knowledge, this raises serious data protection questions.",
    },
  ];

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
          Understanding Your Situation
        </h2>
        <p className="text-text-secondary">
          Before we generate your document, here is why this matters.
        </p>
      </div>

      {/* What They Claim vs The Reality */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Left column - What They Claim */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-red-600"
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
            <h3 className="font-bold text-red-800 text-lg">
              What They Claim
            </h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1 shrink-0">&bull;</span>
              <span className="text-red-900 text-sm leading-relaxed">
                &ldquo;You owe us money&rdquo;
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1 shrink-0">&bull;</span>
              <span className="text-red-900 text-sm leading-relaxed">
                &ldquo;You have an account with us&rdquo;
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1 shrink-0">&bull;</span>
              <span className="text-red-900 text-sm leading-relaxed">
                &ldquo;We have the right to collect&rdquo;
              </span>
            </li>
          </ul>
        </div>

        {/* Right column - The Reality */}
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-accent-teal"
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
            <h3 className="font-bold text-teal-800 text-lg">The Reality</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-1 shrink-0">&bull;</span>
              <span className="text-teal-900 text-sm leading-relaxed">
                No signed contract exists
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-1 shrink-0">&bull;</span>
              <span className="text-teal-900 text-sm leading-relaxed">
                No proof of your consent
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 mt-1 shrink-0">&bull;</span>
              <span className="text-teal-900 text-sm leading-relaxed">
                No verified obligation
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Not-sure additional text */}
      {state.consentStatus === "not-sure" && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-amber-900 leading-relaxed">
            If you are unsure whether you signed up, the Conditional Acceptance
            will require them to produce the contract. If they cannot, none
            exists.
          </p>
        </div>
      )}

      {/* Educational expandables */}
      <div className="mb-8">
        <Accordion items={accordionItems} />
      </div>

      {/* CTA button */}
      <button
        onClick={() => setPhase("result")}
        className="w-full min-h-[56px] rounded-xl p-4 px-6 bg-primary text-white text-lg font-semibold hover:bg-primary-light transition-colors"
      >
        Continue
      </button>
    </div>
  );
}
