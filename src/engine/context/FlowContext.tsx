"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react";
import type {
  FlowState,
  FlowAction,
  FlowPhase,
  DemandCategory,
  EntityInfo,
  UserDetails,
  DocumentTemplateId,
} from "@/engine/types";

// ============================================================
// Initial State
// ============================================================

const initialState: FlowState = {
  phase: "entry-filter",
  category: null,
  entity: null,
  currentQuestionId: null,
  answers: {},
  answerHistory: [],
  recommendedDocument: null,
  userDetails: {
    fullName: "",
    address: "",
    referenceNumber: "",
  },
  direction: "forward",
  consentStatus: null,
  demandStage: null,
};

// ============================================================
// Reducer
// ============================================================

function flowReducer(state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case "SET_PHASE":
      return {
        ...state,
        phase: action.phase,
        direction: "forward",
      };

    case "SELECT_CATEGORY":
      return {
        ...state,
        category: action.category,
        phase: "entity-select",
        direction: "forward",
      };

    case "SET_ENTITY":
      return {
        ...state,
        entity: action.entity,
        phase: "questions",
        direction: "forward",
      };

    case "ANSWER_QUESTION": {
      const newAnswers = {
        ...state.answers,
        [action.questionId]: action.answerId,
      };
      const newHistory = [...state.answerHistory, action.questionId];

      if (action.nextQuestionId === null) {
        // End of questions — move to result
        return {
          ...state,
          answers: newAnswers,
          answerHistory: newHistory,
          currentQuestionId: null,
          phase: "result",
          direction: "forward",
        };
      }

      return {
        ...state,
        answers: newAnswers,
        answerHistory: newHistory,
        currentQuestionId: action.nextQuestionId,
        direction: "forward",
      };
    }

    case "GO_BACK": {
      // Navigate backwards through the flow
      if (state.phase === "questions" && state.answerHistory.length > 0) {
        const newHistory = [...state.answerHistory];
        const previousQuestionId = newHistory.pop()!;
        const newAnswers = { ...state.answers };
        delete newAnswers[previousQuestionId];

        if (newHistory.length === 0 && !state.currentQuestionId) {
          // Was at first question, go back to entity select
          return {
            ...state,
            answers: newAnswers,
            answerHistory: [],
            currentQuestionId: null,
            phase: "entity-select",
            direction: "backward",
          };
        }

        return {
          ...state,
          answers: newAnswers,
          answerHistory: newHistory,
          currentQuestionId: previousQuestionId,
          direction: "backward",
        };
      }

      // Phase-level back navigation
      const phaseOrder: FlowPhase[] = [
        "entry-filter",
        "category-select",
        "entity-select",
        "questions",
        "situation-overview",
        "result",
        "user-details",
        "document-preview",
      ];
      const currentIndex = phaseOrder.indexOf(state.phase);
      if (currentIndex > 0) {
        return {
          ...state,
          phase: phaseOrder[currentIndex - 1],
          direction: "backward",
        };
      }

      return state;
    }

    case "SET_USER_DETAILS":
      return {
        ...state,
        userDetails: { ...state.userDetails, ...action.details },
      };

    case "SET_RECOMMENDED_DOCUMENT":
      return {
        ...state,
        recommendedDocument: action.documentId,
      };

    case "SET_CONSENT_STATUS": {
      const consentStatus = action.status;
      if (consentStatus === "signed") {
        // Signed contract — go directly to result with special guidance
        return {
          ...state,
          consentStatus,
          phase: "result",
          direction: "forward",
        };
      }
      // no-consent or not-sure — go to situation overview
      return {
        ...state,
        consentStatus,
        phase: "situation-overview",
        direction: "forward",
      };
    }

    case "SET_DEMAND_STAGE":
      return {
        ...state,
        demandStage: action.stage,
      };

    case "RESET_FLOW":
      return { ...initialState };

    default:
      return state;
  }
}

// ============================================================
// Context
// ============================================================

interface FlowContextValue {
  state: FlowState;
  dispatch: React.Dispatch<FlowAction>;
  // Convenience actions
  setPhase: (phase: FlowPhase) => void;
  selectCategory: (category: DemandCategory) => void;
  setEntity: (entity: EntityInfo) => void;
  answerQuestion: (
    questionId: string,
    answerId: string | string[],
    nextQuestionId: string | null
  ) => void;
  goBack: () => void;
  setUserDetails: (details: Partial<UserDetails>) => void;
  setRecommendedDocument: (documentId: DocumentTemplateId) => void;
  setConsentStatus: (status: "signed" | "no-consent" | "not-sure") => void;
  setDemandStage: (stage: string) => void;
  resetFlow: () => void;
  /** Progress percentage through the current question tree */
  progress: number;
}

const FlowContext = createContext<FlowContextValue | null>(null);

export function FlowProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(flowReducer, initialState);

  const setPhase = useCallback(
    (phase: FlowPhase) => dispatch({ type: "SET_PHASE", phase }),
    []
  );

  const selectCategory = useCallback(
    (category: DemandCategory) =>
      dispatch({ type: "SELECT_CATEGORY", category }),
    []
  );

  const setEntity = useCallback(
    (entity: EntityInfo) => dispatch({ type: "SET_ENTITY", entity }),
    []
  );

  const answerQuestion = useCallback(
    (
      questionId: string,
      answerId: string | string[],
      nextQuestionId: string | null
    ) =>
      dispatch({
        type: "ANSWER_QUESTION",
        questionId,
        answerId,
        nextQuestionId,
      }),
    []
  );

  const goBack = useCallback(() => dispatch({ type: "GO_BACK" }), []);

  const setUserDetails = useCallback(
    (details: Partial<UserDetails>) =>
      dispatch({ type: "SET_USER_DETAILS", details }),
    []
  );

  const setRecommendedDocument = useCallback(
    (documentId: DocumentTemplateId) =>
      dispatch({ type: "SET_RECOMMENDED_DOCUMENT", documentId }),
    []
  );

  const setConsentStatus = useCallback(
    (status: "signed" | "no-consent" | "not-sure") =>
      dispatch({ type: "SET_CONSENT_STATUS", status }),
    []
  );

  const setDemandStage = useCallback(
    (stage: string) => dispatch({ type: "SET_DEMAND_STAGE", stage }),
    []
  );

  const resetFlow = useCallback(() => dispatch({ type: "RESET_FLOW" }), []);

  // Calculate progress through phases
  const phaseWeights: Record<FlowPhase, number> = {
    "entry-filter": 0,
    "category-select": 10,
    "entity-select": 20,
    questions: 30, // 30-70 based on questions answered
    "situation-overview": 75,
    result: 85,
    "user-details": 90,
    "document-preview": 95,
    complete: 100,
  };

  let progress = phaseWeights[state.phase] || 0;
  if (state.phase === "questions" && state.answerHistory.length > 0) {
    // Estimate progress within questions (assume ~5 questions average)
    const questionProgress = Math.min(
      state.answerHistory.length / 5,
      1
    );
    progress = 30 + questionProgress * 50;
  }

  return (
    <FlowContext.Provider
      value={{
        state,
        dispatch,
        setPhase,
        selectCategory,
        setEntity,
        answerQuestion,
        goBack,
        setUserDetails,
        setRecommendedDocument,
        setConsentStatus,
        setDemandStage,
        resetFlow,
        progress,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow(): FlowContextValue {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useFlow must be used within a FlowProvider");
  }
  return context;
}
