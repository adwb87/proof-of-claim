"use client";

import { useState } from "react";

interface InfoPopupProps {
  title?: string;
  content: string;
}

export function InfoPopup({
  title = "Did you know?",
  content,
}: InfoPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 text-accent-teal hover:text-accent-teal/80 transition-colors text-sm font-medium"
        aria-expanded={isOpen}
      >
        <span className="w-6 h-6 rounded-full bg-accent-teal/10 flex items-center justify-center flex-shrink-0">
          <svg
            className="w-3.5 h-3.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        {title}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Expandable content */}
      {isOpen && (
        <div className="mt-3 animate-fade-in">
          <div className="bg-accent-teal/5 border border-accent-teal/20 rounded-xl p-4 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 w-6 h-6 rounded-full bg-accent-teal/10 flex items-center justify-center text-accent-teal hover:bg-accent-teal/20 transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <p className="text-text-primary text-sm leading-relaxed pr-8">
              {content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
