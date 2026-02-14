"use client";

interface OptionButtonProps {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionButton({
  label,
  description,
  selected,
  onClick,
}: OptionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full min-h-[56px] rounded-xl p-4 px-6 text-left text-lg
        border-2 transition-all duration-200
        ${
          selected
            ? "bg-primary text-white border-primary scale-[1.02]"
            : "bg-surface border-border text-text-primary hover:border-primary hover:bg-primary/5"
        }
      `}
    >
      <span className="font-medium">{label}</span>
      {description && (
        <span
          className={`block text-sm mt-1 ${
            selected ? "text-white/80" : "text-text-secondary"
          }`}
        >
          {description}
        </span>
      )}
    </button>
  );
}
