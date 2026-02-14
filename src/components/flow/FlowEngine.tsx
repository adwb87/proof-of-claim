"use client";

import { useFlow } from "@/engine/context/FlowContext";
import { ProgressBar } from "./ProgressBar";
import { EntryFilter } from "./EntryFilter";
import { CategorySelector } from "./CategorySelector";
import { EntitySelector } from "./EntitySelector";
import { QuestionCard } from "./QuestionCard";
import { SituationOverview } from "./SituationOverview";
import { ResultScreen } from "./ResultScreen";
import { UserDetailsForm } from "@/components/documents/UserDetailsForm";
import { DocumentPreview } from "@/components/documents/DocumentPreview";
import type { QuestionTree } from "@/engine/types";

import { energyQuestionTree } from "@/engine/data/question-trees/energy";
import { waterQuestionTree } from "@/engine/data/question-trees/water";
import { councilTaxQuestionTree } from "@/engine/data/question-trees/council-tax";
import { privateParkingQuestionTree } from "@/engine/data/question-trees/private-parking";
import { councilParkingQuestionTree } from "@/engine/data/question-trees/council-parking";
import { speedingQuestionTree } from "@/engine/data/question-trees/speeding";
import { tvLicenceQuestionTree } from "@/engine/data/question-trees/tv-licence";
import { debtCollectorQuestionTree } from "@/engine/data/question-trees/debt-collector";
import { bailiffQuestionTree } from "@/engine/data/question-trees/bailiff";
import { hmrcQuestionTree } from "@/engine/data/question-trees/hmrc";
import { otherQuestionTree } from "@/engine/data/question-trees/other";

const questionTreeRegistry: Record<string, QuestionTree> = {
  energy: energyQuestionTree,
  water: waterQuestionTree,
  "council-tax": councilTaxQuestionTree,
  "private-parking": privateParkingQuestionTree,
  "council-parking": councilParkingQuestionTree,
  speeding: speedingQuestionTree,
  "tv-licence": tvLicenceQuestionTree,
  "debt-collector": debtCollectorQuestionTree,
  bailiff: bailiffQuestionTree,
  hmrc: hmrcQuestionTree,
  other: otherQuestionTree,
};

function getQuestionTree(categoryId: string | null): QuestionTree | null {
  if (!categoryId) return null;
  return questionTreeRegistry[categoryId] || null;
}

export function FlowEngine() {
  const { state, goBack, resetFlow, progress } = useFlow();

  const showBackButton = state.phase !== "entry-filter";

  // Resolve current question for the questions phase
  let currentQuestion = null;
  let questionTree: QuestionTree | null = null;

  if (state.phase === "questions") {
    questionTree = getQuestionTree(state.category);
    if (questionTree) {
      const qId = state.currentQuestionId || questionTree.startQuestionId;
      currentQuestion =
        questionTree.questions.find((q) => q.id === qId) || null;
    }
  }

  const renderPhase = () => {
    switch (state.phase) {
      case "entry-filter":
        return <EntryFilter />;
      case "category-select":
        return <CategorySelector />;
      case "entity-select":
        return <EntitySelector />;
      case "questions":
        if (currentQuestion) {
          return (
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
            />
          );
        }
        return (
          <div className="text-center text-text-secondary py-12">
            <p>No questions available for this category yet.</p>
            <button
              onClick={goBack}
              className="mt-4 text-primary font-medium hover:underline"
            >
              Go back
            </button>
          </div>
        );
      case "situation-overview":
        return <SituationOverview />;
      case "result":
        return <ResultScreen />;
      case "user-details":
        return <UserDetailsForm />;
      case "document-preview":
        return <DocumentPreview />;
      case "complete":
        return (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-primary mb-3">All Done</h2>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              Your document has been generated. Follow the steps provided to send it and protect your rights.
            </p>
            <button
              onClick={resetFlow}
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-colors"
            >
              Start a New Case
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Progress bar — fixed at top of flow area */}
      <div className="sticky top-0 z-30 bg-background pt-4 pb-2 px-4">
        <div className="max-w-2xl mx-auto">
          <ProgressBar progress={progress} />
        </div>
      </div>

      {/* Back button */}
      <div className="max-w-2xl mx-auto px-4">
        {showBackButton && (
          <button
            onClick={goBack}
            className="inline-flex items-center gap-1.5 text-text-secondary hover:text-primary font-medium text-sm transition-colors py-2 mt-1 mb-2"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        )}
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 py-4 pb-16">
        {renderPhase()}
      </div>
    </div>
  );
}
