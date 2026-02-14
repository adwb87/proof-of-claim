const legalPrinciples = [
  {
    title: "Burden of Proof",
    description:
      "He who asserts must prove. This is the foundation of English common law \u2014 unchanged for centuries. If they claim you owe it, they prove it.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" />
      </svg>
    ),
  },
  {
    title: "Right to Verification",
    description:
      "Under UK GDPR and the Consumer Rights Act 2015, you have the right to demand verification of any claim before parting with a penny.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Conditional Acceptance",
    description:
      "You\u2019re not refusing to pay. You\u2019re stating a fact: \u2018I will honour any proven obligation. Prove it.\u2019 This is the standard every court in this land expects.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
];

export function IsThisLegal() {
  return (
    <section className="bg-surface px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
          This Isn&rsquo;t Conspiracy.
          <br className="hidden sm:block" />
          This Is How Law Actually&nbsp;Works.
        </h2>
        <p className="mx-auto mb-6 max-w-xl text-center text-lg text-text-secondary">
          We know what you&rsquo;re thinking. Here&rsquo;s the straight answer.
        </p>

        {/* Bold statement block */}
        <div className="mx-auto mb-14 max-w-3xl rounded-2xl border-l-4 border-accent bg-accent/5 px-8 py-6">
          <p className="text-lg leading-relaxed text-text-primary sm:text-xl">
            This tool requires proof. If a valid obligation exists and can be
            demonstrated &mdash; a signed contract, an injured party, lawful
            authority &mdash; then that obligation stands. What we don&rsquo;t
            accept is demands without proof.
          </p>
        </div>

        {/* Three principle cards */}
        <div className="grid gap-8 sm:grid-cols-3">
          {legalPrinciples.map((principle) => (
            <div
              key={principle.title}
              className="rounded-2xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {principle.icon}
              </div>
              <h3 className="mb-3 text-xl font-extrabold text-primary">
                {principle.title}
              </h3>
              <p className="text-base leading-relaxed text-text-secondary">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <p className="mt-14 text-center text-lg font-semibold text-text-primary">
          Every document this tool generates could be read aloud in a courtroom.
        </p>
      </div>
    </section>
  );
}
