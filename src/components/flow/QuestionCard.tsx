"use client";

import { useState } from "react";
import { useFlow } from "@/engine/context/FlowContext";
import { OptionButton } from "./OptionButton";
import { InfoPopup } from "./InfoPopup";
import type { Question } from "@/engine/types";

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const { state, answerQuestion, setRecommendedDocument, setConsentStatus } =
    useFlow();
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const animationClass =
    state.direction === "forward"
      ? "animate-slide-in-right"
      : "animate-slide-in-left";

  const handleOptionClick = (optionId: string) => {
    setSelectedOptionId(optionId);

    const option = question.options.find((o) => o.id === optionId);
    if (!option) return;

    // If the option recommends a document, set it before advancing
    if (option.recommendedDocument) {
      setRecommendedDocument(option.recommendedDocument);
    }

    // Small delay so the user sees their selection highlight
    setTimeout(() => {
      // Check for consent routing
      if (option.next === "__consent_no__") {
        answerQuestion(question.id, optionId, null);
        setConsentStatus("no-consent");
      } else if (option.next === "__consent_signed__") {
        answerQuestion(question.id, optionId, null);
        setConsentStatus("signed");
      } else if (option.next === "__consent_unsure__") {
        answerQuestion(question.id, optionId, null);
        setConsentStatus("not-sure");
      } else {
        answerQuestion(question.id, optionId, option.next);
      }
      setSelectedOptionId(null);
    }, 250);
  };

  return (
    <div key={question.id} className={animationClass}>
      {/* Question text */}
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-primary leading-snug">
          {question.text}
        </h2>
      </div>

      {/* Help text */}
      {question.helpText && (
        <div className="mb-6">
          <InfoPopup content={question.helpText} />
        </div>
      )}

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option) => (
          <OptionButton
            key={option.id}
            label={option.label}
            description={option.description}
            selected={selectedOptionId === option.id}
            onClick={() => handleOptionClick(option.id)}
          />
        ))}
      </div>
    </div>
  );
}
