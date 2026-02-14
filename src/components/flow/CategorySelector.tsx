"use client";

import { useFlow } from "@/engine/context/FlowContext";
import { CATEGORIES } from "@/engine/data/categories";
import type { DemandCategory } from "@/engine/types";

export function CategorySelector() {
  const { selectCategory } = useFlow();

  return (
    <div className="animate-fade-in-up">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
          What type of demand did you receive?
        </h2>
        <p className="text-text-secondary">
          Select the category that best matches your situation.
        </p>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CATEGORIES.map((category, index) => (
          <button
            key={category.id}
            onClick={() => selectCategory(category.id as DemandCategory)}
            className="opacity-0 animate-fade-in-up bg-surface rounded-xl border border-border p-5 flex flex-col items-start text-left hover:border-primary hover:shadow-md hover:scale-[1.02] transition-all duration-200 group"
            style={{ animationDelay: `${index * 60}ms`, animationFillMode: "forwards" }}
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              style={{ backgroundColor: `${category.color}15` }}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: category.color }}
              >
                <path d={category.icon} />
              </svg>
            </div>

            {/* Label */}
            <p className="font-bold text-text-primary group-hover:text-primary transition-colors">
              {category.label}
            </p>

            {/* Description */}
            <p className="text-sm text-text-secondary mt-1 leading-snug">
              {category.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
