"use client";

import { useState } from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-surface)]/95 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[var(--color-accent)]"
              aria-hidden="true"
            >
              {/* Scale of Justice */}
              <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 6 L2 14 Q2 17 6 17 Q10 17 10 14 L8 6" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M16 6 L14 14 Q14 17 18 17 Q22 17 22 14 L20 6" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="12" cy="2" r="1.5" fill="currentColor" />
              <line x1="9" y1="22" x2="15" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="font-bold text-lg text-[var(--color-primary)]">
              Proof of Claim
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/how-it-works"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors text-sm font-medium"
            >
              How It Works
            </Link>
            <Link
              href="/learn"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors text-sm font-medium"
            >
              Learn
            </Link>
            <Link
              href="/documents"
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors text-sm font-medium"
            >
              Documents
            </Link>
            <Link
              href="/start"
              className="inline-flex items-center justify-center px-5 py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--color-primary-light)] transition-colors"
            >
              Start
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors"
            aria-label="Open menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16" />

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
