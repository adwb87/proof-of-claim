export function LegalVsLawful() {
  return (
    <section className="bg-background px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-3xl font-extrabold leading-tight tracking-tight text-primary sm:text-4xl lg:text-5xl">
          Two Words. Two Very Different&nbsp;Meanings.
        </h2>
        <p className="mx-auto mb-14 max-w-xl text-center text-lg text-text-secondary">
          Understanding this distinction changes everything.
        </p>

        <div className="mb-14 grid gap-8 sm:grid-cols-2">
          {/* Lawful column */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-accent-teal/40 bg-surface p-8 sm:p-10">
            <div className="absolute right-4 top-4 text-[5rem] font-black leading-none text-accent-teal/[0.06]">
              L
            </div>
            <h3 className="mb-6 text-2xl font-extrabold text-accent-teal">
              Lawful
            </h3>
            <ul className="space-y-4 text-text-primary">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 block h-2 w-2 shrink-0 rounded-full bg-accent-teal" />
                <span>Natural / common law</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 block h-2 w-2 shrink-0 rounded-full bg-accent-teal" />
                <span>Do no harm, honour your word</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 block h-2 w-2 shrink-0 rounded-full bg-accent-teal" />
                <span>Applies to living men and women</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 block h-2 w-2 shrink-0 rounded-full bg-accent-teal" />
                <span>Cannot be overridden by any government</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 block h-2 w-2 shrink-0 rounded-full bg-accent-teal" />
                <span className="font-semibold">The foundation everything else sits on</span>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 sm:p-10">
            <div className="absolute right-4 top-4 text-[5rem] font-black leading-none text-primary/[0.06]">
              L
            </div>
            <h3 className="mb-6 text-2xl font-extrabold text-primary">
              Legal
            </h3>
            <ul className="space-y-4 text-text-primary">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 block h-2 w-2 shrink-0 rounded-full bg-primary/40" />
                <span>Statutes, acts, regulations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 block h-2 w-2 shrink-0 rounded-full bg-primary/40" />
                <span>Rules made by Parliament for corporations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 block h-2 w-2 shrink-0 rounded-full bg-primary/40" />
                <span>Applies to &ldquo;legal persons&rdquo; (the name on paper)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 block h-2 w-2 shrink-0 rounded-full bg-primary/40" />
                <span>Requires your consent to bind you</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 block h-2 w-2 shrink-0 rounded-full bg-primary/40" />
                <span>Administrative rules, not natural law</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Below columns text */}
        <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-text-secondary">
          When a company sends a bill, they&rsquo;re operating in the{" "}
          <strong className="font-bold text-primary">LEGAL</strong> world
          &mdash; treating you as a name, an account number, a legal fiction.
          But the{" "}
          <strong className="font-bold text-accent-teal">LAWFUL</strong>{" "}
          principle of burden of proof still applies. Before any legal process
          can compel you, they must first prove &mdash; lawfully &mdash; that a
          valid claim exists.
        </p>
      </div>
    </section>
  );
}
