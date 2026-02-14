// ============================================================
// Proof of Claim — Core Types
// ============================================================

/** The 11 demand categories a user can select */
export type DemandCategory =
  | "energy"
  | "water"
  | "council-tax"
  | "private-parking"
  | "council-parking"
  | "speeding"
  | "tv-licence"
  | "debt-collector"
  | "bailiff"
  | "hmrc"
  | "other";

/** Category display info for the selector grid */
export interface CategoryInfo {
  id: DemandCategory;
  label: string;
  description: string;
  icon: string; // SVG path or icon name
  color: string; // Accent colour for the category card
}

/** A single question in a question tree */
export interface Question {
  id: string;
  text: string;
  helpText?: string; // "Did you know?" educational tooltip
  options: QuestionOption[];
  multiSelect?: boolean;
}

/** An answer option for a question */
export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  /** Next question ID, or null if this leads to a result */
  next: string | null;
  /** If this option directly maps to a document recommendation */
  recommendedDocument?: DocumentTemplateId;
}

/** A complete question tree for a category */
export interface QuestionTree {
  categoryId: DemandCategory;
  questions: Question[];
  /** The first question ID in this tree */
  startQuestionId: string;
}

// ============================================================
// Document Templates
// ============================================================

export type DocumentTemplateId =
  | "conditional-acceptance"
  | "notice-of-default"
  | "affidavit-of-truth"
  | "gdpr-account-dispute"
  | "subject-access-request"
  | "council-tax-dsar"
  | "pre-warrant-challenge"
  | "bailiff-non-entry"
  | "warrant-verification"
  | "prove-the-debt"
  | "cease-and-desist"
  | "nip-response"
  | "parking-defence"
  | "hmrc-conditional-acceptance";

export interface DocumentTemplate {
  id: DocumentTemplateId;
  name: string;
  shortDescription: string;
  longDescription: string;
  /** Which categories this document applies to */
  applicableCategories: DemandCategory[];
  /** Fields required from the user */
  requiredFields: DocumentField[];
  /** The template sections that get populated */
  sections: DocumentSection[];
}

export interface DocumentField {
  id: string;
  label: string;
  placeholder?: string;
  type: "text" | "textarea" | "date" | "optional-text";
  required: boolean;
}

export interface DocumentSection {
  type: "header" | "subject" | "acknowledgment" | "position" | "requirements" | "timeframe" | "consequences" | "signature" | "rights-reservation";
  content: string; // Template string with {{placeholders}}
}

// ============================================================
// Flow State
// ============================================================

export type FlowPhase =
  | "entry-filter"
  | "category-select"
  | "entity-select"
  | "questions"
  | "situation-overview"
  | "result"
  | "user-details"
  | "document-preview"
  | "complete";

export interface UserDetails {
  fullName: string;
  address: string;
  referenceNumber?: string;
}

export interface EntityInfo {
  name: string;
  address?: string;
  type?: string;
}

export interface FlowState {
  phase: FlowPhase;
  category: DemandCategory | null;
  entity: EntityInfo | null;
  currentQuestionId: string | null;
  answers: Record<string, string | string[]>;
  answerHistory: string[]; // Stack of question IDs for back navigation
  recommendedDocument: DocumentTemplateId | null;
  userDetails: UserDetails;
  direction: "forward" | "backward"; // For slide animation direction
  consentStatus: "signed" | "no-consent" | "not-sure" | null;
  demandStage: string | null;
}

export type FlowAction =
  | { type: "SET_PHASE"; phase: FlowPhase }
  | { type: "SELECT_CATEGORY"; category: DemandCategory }
  | { type: "SET_ENTITY"; entity: EntityInfo }
  | { type: "ANSWER_QUESTION"; questionId: string; answerId: string | string[]; nextQuestionId: string | null }
  | { type: "GO_BACK" }
  | { type: "SET_USER_DETAILS"; details: Partial<UserDetails> }
  | { type: "SET_RECOMMENDED_DOCUMENT"; documentId: DocumentTemplateId }
  | { type: "SET_CONSENT_STATUS"; status: "signed" | "no-consent" | "not-sure" }
  | { type: "SET_DEMAND_STAGE"; stage: string }
  | { type: "RESET_FLOW" };

// ============================================================
// Learn Section
// ============================================================

export interface LearnTopic {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  sections: LearnSection[];
  relatedTopicSlugs: string[];
  callouts: LearnCallout[];
}

export interface LearnSection {
  heading: string;
  content: string; // HTML-safe markdown content
}

export interface LearnCallout {
  type: "tip" | "warning" | "law-reference" | "example";
  title: string;
  content: string;
  /** Which section this callout appears after */
  afterSection: number;
}

// ============================================================
// Case Tracking (Phase 5)
// ============================================================

export type CaseStatus =
  | "awaiting-response"
  | "response-received"
  | "action-required"
  | "closed-default"
  | "resolved"
  | "escalated";

export interface CaseStatusInfo {
  id: CaseStatus;
  label: string;
  color: string;
  description: string;
}

export const CASE_STATUSES: CaseStatusInfo[] = [
  { id: "awaiting-response", label: "Awaiting Response", color: "#d97706", description: "Document sent, waiting for reply" },
  { id: "response-received", label: "Response Received", color: "#059669", description: "They replied — review needed" },
  { id: "action-required", label: "Action Required", color: "#2d5a8e", description: "Time to send the next document" },
  { id: "closed-default", label: "Closed — Default", color: "#64748b", description: "They failed to respond within deadline" },
  { id: "resolved", label: "Resolved", color: "#059669", description: "Matter concluded successfully" },
  { id: "escalated", label: "Escalated", color: "#dc2626", description: "Moved to court or enforcement stage" },
];
