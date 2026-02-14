import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-primary)] text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-3">Proof of Claim</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Built for the people. Requiring proof before payment.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/learn"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Learn
                </Link>
              </li>
              <li>
                <Link
                  href="/documents"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Documents
                </Link>
              </li>
              <li>
                <Link
                  href="/start"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Start
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-white/50">
            <p>&copy; {currentYear} Proof of Claim. All rights reserved.</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <p>This tool does not constitute legal advice.</p>
              <p>Your data is processed locally and never stored.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
