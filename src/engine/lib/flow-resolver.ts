import type { DemandCategory, DocumentTemplateId } from "@/engine/types";

/**
 * Document info for the result screen
 */
export interface DocumentRecommendation {
  id: DocumentTemplateId;
  name: string;
  shortDescription: string;
  whyRecommended: string;
}

const DOCUMENT_INFO: Record<DocumentTemplateId, { name: string; shortDescription: string }> = {
  "conditional-acceptance": {
    name: "Conditional Acceptance",
    shortDescription: "Your first response to any demand. States you'll gladly pay — once they prove you owe it.",
  },
  "notice-of-default": {
    name: "Notice of Default",
    shortDescription: "They failed to provide evidence within the deadline. This formally records their default.",
  },
  "affidavit-of-truth": {
    name: "Affidavit of Truth",
    shortDescription: "A sworn statement of fact after they've continued pursuing without evidence. Carries legal weight.",
  },
  "gdpr-account-dispute": {
    name: "GDPR + Account Dispute",
    shortDescription: "Challenges accounts opened without your explicit consent using data protection law.",
  },
  "subject-access-request": {
    name: "Subject Access Request (Full)",
    shortDescription: "Requires them to disclose all personal data they hold on you within 30 days. A powerful tool.",
  },
  "council-tax-dsar": {
    name: "Council Tax DSAR",
    shortDescription: "Specifically demands evidence of a valid liability order and the council's authority to collect.",
  },
  "pre-warrant-challenge": {
    name: "Pre-Warrant Challenge Notice",
    shortDescription: "Challenges the validity of a warrant before it can be enforced. Must be sent promptly.",
  },
  "bailiff-non-entry": {
    name: "Bailiff Non-Entry Notice",
    shortDescription: "Formally refuses entry to your property. Bailiffs cannot force entry for most debts.",
  },
  "warrant-verification": {
    name: "Warrant Verification Demand",
    shortDescription: "Requires the bailiff to prove their warrant is valid, properly signed, and within scope.",
  },
  "prove-the-debt": {
    name: "Prove the Debt",
    shortDescription: "Demands the debt collector provide full evidence of the debt and their authority to collect it.",
  },
  "cease-and-desist": {
    name: "Cease and Desist",
    shortDescription: "Orders them to stop all contact after they've failed to prove their claim. Final warning before escalation.",
  },
  "nip-response": {
    name: "NIP Response",
    shortDescription: "Challenges a Notice of Intended Prosecution, requesting full evidence and questioning procedure.",
  },
  "parking-defence": {
    name: "Parking Defence",
    shortDescription: "Disputes a private parking charge, challenging their contractual standing and evidence.",
  },
  "hmrc-conditional-acceptance": {
    name: "HMRC Conditional Acceptance",
    shortDescription: "Conditionally accepts an HMRC demand subject to them providing full verified assessment evidence.",
  },
};

/**
 * Resolves the recommended document based on category and answers.
 * The question trees set recommendedDocument on options that lead to null (end of tree).
 * This function provides the full recommendation info.
 */
export function getDocumentRecommendation(
  documentId: DocumentTemplateId,
  category: DemandCategory,
  answers: Record<string, string | string[]>
): DocumentRecommendation {
  const info = DOCUMENT_INFO[documentId];

  // Generate context-specific "why" text
  const whyRecommended = generateWhyText(documentId, category, answers);

  return {
    id: documentId,
    name: info.name,
    shortDescription: info.shortDescription,
    whyRecommended,
  };
}

function generateWhyText(
  documentId: DocumentTemplateId,
  category: DemandCategory,
  _answers: Record<string, string | string[]>
): string {
  const categoryLabels: Record<DemandCategory, string> = {
    energy: "energy company",
    water: "water company",
    "council-tax": "council",
    "private-parking": "parking company",
    "council-parking": "council",
    speeding: "prosecuting authority",
    "tv-licence": "TV Licensing",
    "debt-collector": "debt collector",
    bailiff: "bailiff/enforcement agent",
    hmrc: "HMRC",
    other: "claimant",
  };

  const entity = categoryLabels[category] || "claimant";

  const whyTexts: Record<DocumentTemplateId, string> = {
    "conditional-acceptance": `The ${entity} has made a claim. This document states a simple fact: you will honour any proven obligation. They must now provide evidence \u2014 a signed contract, verified account records, and lawful authority. If they can't, their claim fails.`,
    "notice-of-default": `You required the ${entity} to prove their claim. They failed. This Notice of Default formally records that failure. It's not a threat \u2014 it's a statement of fact that strengthens your position if this ever reaches court.`,
    "affidavit-of-truth": `Despite being given every opportunity, the ${entity} has continued to pursue you without evidence. This Affidavit of Truth is a sworn statement of fact. It carries legal weight and creates an unrebutted record.`,
    "gdpr-account-dispute": `The ${entity} appears to have created an account without your consent. This document challenges both the account and their data processing, citing UK GDPR and the Data Protection Act 2018. They must prove lawful basis or delete your data.`,
    "subject-access-request": `This compels the ${entity} to disclose every piece of personal data they hold on you within 30 days. It forces transparency and frequently reveals that the evidence they claim to have doesn't actually exist.`,
    "council-tax-dsar": `This targets the council's claim to a valid liability order. Many councils obtain liability orders in bulk hearings \u2014 hundreds in minutes \u2014 without individual verification. This demands they prove yours was lawfully obtained.`,
    "pre-warrant-challenge": `The council is threatening enforcement. This challenge requires them to evidence that proper legal process was followed at every stage \u2014 from the original bill through to the warrant application.`,
    "bailiff-non-entry": `This formally refuses entry to your property. For most debts, bailiffs cannot force entry on a first visit. This document makes your position clear and puts them on notice of the consequences if they attempt unlawful entry.`,
    "warrant-verification": `The bailiff claims authority to act. This demands they produce the original warrant, verify it's properly signed and sealed, confirm it's within scope and date, and demonstrate they have followed correct procedure.`,
    "prove-the-debt": `A debt collector is pursuing a claim they haven't proven. This requires the full chain of evidence: original signed agreement, deed of assignment, verified statement of account, and authority to collect. Most can't produce it.`,
    "cease-and-desist": `They've been given the opportunity to prove their claim and failed. This formally orders them to cease all contact. Continued pursuit without evidence may constitute harassment under the Protection from Harassment Act 1997.`,
    "nip-response": `This challenges the Notice of Intended Prosecution on procedural and evidential grounds. NIPs must comply with strict requirements \u2014 the 14-day rule, proper service, and full evidence disclosure.`,
    "parking-defence": `Private parking charges are invoices, not fines. This defence challenges their contractual standing, the adequacy of their evidence, and their compliance with POFA 2012. The burden of proof is entirely on them.`,
    "hmrc-conditional-acceptance": `HMRC has broad powers, but they must still demonstrate a lawful assessment. This conditionally accepts their demand subject to them providing the full calculation, legal basis, and evidence supporting every figure.`,
  };

  return whyTexts[documentId] || `Based on your answers, this is the most appropriate document for your situation with the ${entity}.`;
}

/**
 * Get all document info (for the Document Library page)
 */
export function getAllDocuments(): Array<{ id: DocumentTemplateId; name: string; shortDescription: string }> {
  return Object.entries(DOCUMENT_INFO).map(([id, info]) => ({
    id: id as DocumentTemplateId,
    ...info,
  }));
}
