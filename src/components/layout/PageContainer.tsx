interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export function PageContainer({
  children,
  className = "",
  narrow = false,
}: PageContainerProps) {
  return (
    <div
      className={`${narrow ? "max-w-3xl" : "max-w-6xl"} mx-auto px-4 sm:px-6 py-8 sm:py-12 ${className}`}
    >
      {children}
    </div>
  );
}
