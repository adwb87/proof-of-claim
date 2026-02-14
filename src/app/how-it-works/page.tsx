import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works — Proof of Claim",
  description:
    "A step-by-step guide to requiring proof from anyone demanding money using Proof of Claim.",
};

const steps = [
  {
    number: "1",
    title: "Identify Who's Demanding",
    description:
      "Select the type of demand you've received — energy, council tax, parking, debt collector, bailiff, or other. Different entities have different weaknesses, different procedures they must follow, and different points of failure. We tailor your response accordingly.",
    detail:
      "A private parking company has no more power than any business sending you an invoice. A council must follow strict statutory procedures. HMRC has broad powers but still must demonstrate a lawful assessment. Knowing who you're dealing with is the first step.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Understand Your Situation",
    description:
      "Quick questions about the stage of the demand and whether you ever consented to anything. This determines which document you need — and we determine it, not you.",
    detail:
      "We ask about stage (first contact, chasing, debt collection, enforcement) and consent (did you sign anything?). The answers map to specific legal positions and document types. You don't need to know which document to pick — the system works it out.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Get Your Document",
    description:
      "A professional, legally-grounded document citing specific legislation. It sets deadlines, states consequences of non-compliance, and is ready to send.",
    detail:
      "Every document references the specific laws that apply to your situation. Conditional acceptances, GDPR disputes, prove-the-debt letters, bailiff non-entry notices — each one is precise, measured, and written in language any court would recognise.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    number: "4",
    title: "Send It",
    description:
      "Download as a Word document or copy the email version. We tell you whether to use recorded delivery or email, and why.",
    detail:
      "For most demands, recorded delivery provides proof of service. For urgent matters like bailiff notices, a combination of email and post covers all bases. We give you clear guidance on exactly how to send your document.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  },
  {
    number: "5",
    title: "Track & Follow Up",
    description:
      "Most companies either ignore your letter, back down quietly, or send a generic non-response that doesn't address your requirements. Come back for the next step.",
    detail:
      "Create a free account to track deadlines. If they fail to respond within the deadline, come back for a Notice of Default. If they respond but fail to provide proof, come back for the next escalation step. The process is designed to build an evidence trail.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const principles = [
  {
    title: "Burden of Proof",
    text: "The claimant must prove their claim. You do not need to disprove it. This is the foundation of both common law and statute.",
  },
  {
    title: "Conditional Acceptance",
    text: "You are not refusing to pay. You are requiring proof. 'I will honour any proven obligation. Prove it.' Every court in this land expects this standard.",
  },
  {
    title: "Data Protection",
    text: "Under UK GDPR, any organisation processing your data must demonstrate lawful basis. If they opened an account without your explicit consent, they are in breach.",
  },
  {
    title: "Due Process",
    text: "Every demand must follow correct legal process. Liability orders obtained in bulk hearings, warrants with procedural errors, debts without documentation — all can be required to provide proof.",
  },
];

export default function HowItWorksPage() {
  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            How Proof of Claim Works
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Five steps to require proof from anyone demanding money.
            No legal knowledge required — we guide you through everything.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12 mb-20">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-accent-teal flex items-center justify-center text-white font-bold text-xl">
                {step.number}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-accent-teal">{step.icon}</span>
                  <h2 className="text-xl font-bold text-primary">{step.title}</h2>
                </div>
                <p className="text-text-primary leading-relaxed mb-2">
                  {step.description}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Principles */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary text-center mb-8">
            The Legal Principles Behind It
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {principles.map((p) => (
              <Card key={p.title} padding="lg">
                <h3 className="font-bold text-primary mb-2">{p.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {p.text}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-primary rounded-2xl p-10 text-white">
          <h2 className="text-2xl font-bold mb-3">Ready to Start?</h2>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            It takes less than five minutes to require proof of a demand.
            Free, no signup required.
          </p>
          <Link
            href="/start"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors"
          >
            Require Proof — Start Here
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
