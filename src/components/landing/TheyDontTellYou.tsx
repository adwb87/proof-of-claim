import Link from "next/link";

const cards = [
  {
    title: "No Proof, No Debt",
    body: "A bill is not a debt. A demand is not an obligation. Under common law, he who asserts must prove. If they can\u2019t prove you owe it, you don\u2019t owe it.",
    accent: "bg-accent-teal",
  },
  {
    title: "Statutes Need Consent",
    body: "Acts of Parliament are rules for corporations and those who consent to them. You weren\u2019t asked. You didn\u2019t sign. Consent is not automatic.",
    accent: "bg-accent",
  },
  {
    title: "No Victim, No Crime",
    body: "Common law \u2014 the foundation of all law in this land \u2014 requires an injured party. If no one was harmed by your actions, no offence exists.",
    accent: "bg-primary",
  },
];

export function TheyDontTellYou() {
  return (
    <section className="bg-background px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
          Here&rsquo;s What They Don&rsquo;t Tell&nbsp;You
        </h2>
        <p className="mx-auto mb-14 max-w-xl text-center text-lg text-text-secondary">
          Three principles they hope you never discover.
        </p>

        <div className="grid gap-8 sm:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Left accent bar */}
              <div
                className={`absolute left-0 top-0 h-full w-1.5 ${card.accent}`}
              />
              <h3 className="mb-4 text-xl font-extrabold text-primary">
                {card.title}
              </h3>
              <p className="text-base leading-relaxed text-text-secondary">
                {card.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-14 text-center text-lg leading-relaxed text-text-secondary">
          These aren&rsquo;t theories. These are principles established in
          English law for centuries. Every document this tool generates cites
          real legislation and established legal standards.{" "}
          <Link
            href="/learn"
            className="font-bold text-accent-teal underline decoration-accent-teal/30 underline-offset-4 transition-colors hover:decoration-accent-teal"
          >
            See the evidence &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
