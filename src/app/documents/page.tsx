import { PageContainer } from "@/components/layout/PageContainer";
import { DocumentCard } from "@/components/documents/DocumentCard";
import { getAllTemplates } from "@/engine/data/document-templates";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document Library — Proof of Claim",
  description:
    "Browse all 14 legal document templates. Download professional letters for energy disputes, council tax challenges, debt collectors, bailiffs, and more.",
};

export default function DocumentsPage() {
  const templates = getAllTemplates();

  return (
    <PageContainer>
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3">
          Document Library
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          Browse all available legal documents. Each is professionally drafted,
          grounded in established law, and ready to customise with your details.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <DocumentCard
            key={template.id}
            id={template.id}
            name={template.name}
            shortDescription={template.shortDescription}
          />
        ))}
      </div>

      <div className="mt-12 bg-accent-teal/5 border border-accent-teal/10 rounded-xl p-6">
        <h2 className="font-semibold text-primary mb-2">
          Not sure which document you need?
        </h2>
        <p className="text-text-secondary mb-4">
          Our guided flow asks you a few simple questions about your situation
          and recommends the right document automatically.
        </p>
        <a
          href="/start"
          className="inline-flex items-center gap-2 text-accent-teal font-semibold hover:underline"
        >
          Start the guided flow
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </PageContainer>
  );
}
