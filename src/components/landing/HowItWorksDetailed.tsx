const steps = [
  {
    number: 1,
    title: "Identify Who\u2019s Demanding",
    why: "Different entities have different weaknesses. A private parking company has no more power than any other business sending an invoice. A council must follow strict statutory procedures. We tailor your response.",
  },
  {
    number: 2,
    title: "Understand Your Situation",
    why: "Quick questions about the stage of the demand and whether you consented to anything. This determines which document you need \u2014 and we determine it, not you.",
  },
  {
    number: 3,
    title: "Get Your Document",
    why: "Professional, legally-grounded, citing specific legislation. Sets deadlines. States consequences of non-compliance. Ready to send.",
  },
  {
    number: 4,
    title: "Send It",
    why: "Download as a Word document or copy the email version. We tell you whether to use recorded delivery or email, and why.",
  },
  {
    number: 5,
    title: "Track & Follow Up",
    why: "Most companies either ignore your letter, back down quietly, or send a generic non-response that doesn\u2019t address your requirements. Come back for a Notice of Default if they fail to respond.",
  },
];

export function HowItWorksDetailed() {
  return (
    <section className="bg-background px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-center text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
          How It Works &mdash; And&nbsp;Why
        </h2>
        <p className="mx-auto mb-14 max-w-xl text-center text-lg text-text-secondary">
          Five minutes. No legal knowledge needed. We guide you through everything.
        </p>

        <div className="space-y-10">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-6">
              {/* Number + connector line */}
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-extrabold text-white">
                  {step.number}
                </div>
                {step.number < 5 && (
                  <div className="mt-2 h-full w-0.5 bg-border" />
                )}
              </div>

              <div className="pb-2">
                <h3 className="mb-2 text-xl font-extrabold text-primary">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-text-secondary">
                  {step.why}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
