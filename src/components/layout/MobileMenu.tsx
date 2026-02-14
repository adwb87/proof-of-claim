"use client";

import { useEffect } from "react";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`absolute top-0 right-0 h-full w-72 bg-[var(--color-surface)] shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            aria-label="Close menu"
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
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col px-4 gap-1">
          <Link
            href="/how-it-works"
            onClick={onClose}
            className="flex items-center min-h-[48px] px-4 rounded-lg text-[var(--color-text-primary)] hover:bg-[var(--color-background)] transition-colors font-medium"
          >
            How It Works
          </Link>
          <Link
            href="/learn"
            onClick={onClose}
            className="flex items-center min-h-[48px] px-4 rounded-lg text-[var(--color-text-primary)] hover:bg-[var(--color-background)] transition-colors font-medium"
          >
            Learn
          </Link>
          <Link
            href="/documents"
            onClick={onClose}
            className="flex items-center min-h-[48px] px-4 rounded-lg text-[var(--color-text-primary)] hover:bg-[var(--color-background)] transition-colors font-medium"
          >
            Documents
          </Link>

          <div className="my-3 border-t border-[var(--color-border)]" />

          <Link
            href="/start"
            onClick={onClose}
            className="flex items-center justify-center min-h-[48px] px-4 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-primary-light)] transition-colors"
          >
            Start
          </Link>
        </nav>
      </div>
    </div>
  );
}
