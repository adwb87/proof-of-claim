"use client";

import { type HTMLAttributes, forwardRef } from "react";

type CardPadding = "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: CardPadding;
}

const paddingClasses: Record<CardPadding, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      hover = false,
      padding = "md",
      className = "",
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={[
          "rounded-2xl border border-border bg-surface shadow-sm",
          hover
            ? "cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            : "",
          paddingClasses[padding],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card, type CardProps, type CardPadding };
