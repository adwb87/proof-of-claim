import type { LearnSection, LearnCallout } from "@/engine/types";

interface TopicContentProps {
  sections: LearnSection[];
  callouts: LearnCallout[];
}

function CalloutBox({ callout }: { callout: LearnCallout }) {
  const styles = {
    tip: "bg-accent-teal/5 border-accent-teal/20 text-accent-teal",
    warning: "bg-warning/5 border-warning/20 text-warning",
    "law-reference": "bg-primary/5 border-accent/30 text-primary",
    example: "bg-background border-border text-text-secondary",
  };

  const icons = {
    tip: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    warning: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
    "law-reference": "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    example: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  };

  return (
    <div className={`rounded-xl border p-5 my-4 ${styles[callout.type]}`}>
      <div className="flex items-start gap-3">
        <svg
          className="w-5 h-5 mt-0.5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={icons[callout.type]} />
        </svg>
        <div>
          <p className="font-semibold text-sm mb-1">{callout.title}</p>
          <p className="text-sm text-text-primary leading-relaxed">
            {callout.content}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders static, trusted content from learn-topics.ts.
 * Content is authored in code (not user-supplied), so we render
 * paragraphs by splitting on double newlines for safe rendering.
 */
function RenderContent({ content }: { content: string }) {
  // Split content into paragraphs on double newlines
  const paragraphs = content.split(/\n\n+/).filter(Boolean);

  return (
    <div className="space-y-4">
      {paragraphs.map((para, i) => {
        // Check if it's a list (lines starting with - or *)
        const lines = para.split("\n");
        const isList = lines.every((l) => /^\s*[-*•]\s/.test(l));
        if (isList) {
          return (
            <ul key={i} className="space-y-2 ml-1">
              {lines.map((line, li) => (
                <li key={li} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-teal mt-2.5 shrink-0" />
                  <span>{line.replace(/^\s*[-*•]\s*/, "")}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-text-primary leading-relaxed">
            {para}
          </p>
        );
      })}
    </div>
  );
}

export function TopicContent({ sections, callouts }: TopicContentProps) {
  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <div key={index}>
          <h2 className="text-xl font-bold text-primary mb-3">
            {section.heading}
          </h2>
          <RenderContent content={section.content} />
          {callouts
            .filter((c) => c.afterSection === index)
            .map((callout, cIdx) => (
              <CalloutBox key={cIdx} callout={callout} />
            ))}
        </div>
      ))}
    </div>
  );
}
