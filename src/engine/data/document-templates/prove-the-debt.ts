import { DocumentTemplate } from "@/engine/types";

export const proveTheDebt: DocumentTemplate = {
  id: "prove-the-debt",
  name: "Prove the Debt",
  shortDescription: "Demand the debt collector provide full evidence of the debt and their authority to collect",
  longDescription:
    "When a debt collector contacts you, they are making a claim that you owe money. This document requires them to prove the entire chain: the original agreement, how the debt was assigned to them, and their legal authority to pursue you. Many debts are sold in bulk with minimal documentation, and collectors frequently cannot provide adequate proof.",
  applicableCategories: ["debt-collector", "energy", "water", "other"],
  requiredFields: [
    { id: "claimReference", label: "Their Reference Number", placeholder: "e.g. DC-123456", type: "text", required: true },
    { id: "claimAmount", label: "Amount They Are Claiming", placeholder: "e.g. £1,234.56", type: "text", required: true },
    { id: "originalCreditor", label: "Original Creditor (if known)", placeholder: "e.g. British Gas", type: "optional-text", required: false },
    { id: "dateOfTheirLetter", label: "Date of Their Letter", placeholder: "DD/MM/YYYY", type: "date", required: true },
  ],
  sections: [
    {
      type: "header",
      content: "{{date}}\n\n{{userName}}\n{{userAddress}}\n\n{{entityName}}\n{{entityAddress}}",
    },
    {
      type: "subject",
      content: "PROVE THE DEBT — Reference: {{claimReference}}",
    },
    {
      type: "acknowledgment",
      content:
        "I acknowledge receipt of your correspondence dated {{dateOfTheirLetter}} in which you claim I owe the sum of {{claimAmount}} under reference {{claimReference}}.",
    },
    {
      type: "position",
      content:
        "I do not recognise this alleged debt. Before I can consider any payment, you must prove that a valid, enforceable debt exists and that you have lawful authority to collect it. The burden of proof rests with you as the party making the claim.",
    },
    {
      type: "requirements",
      content:
        "I require you to provide the following within the specified timeframe:\n\n1. A true copy of the original signed credit agreement or contract between myself and the original creditor, bearing my signature, which gives rise to the alleged debt.\n\n2. A complete statement of account from inception to the current date, verified as accurate by a named individual with personal knowledge, showing all transactions, payments, interest, charges, and the methodology used to arrive at {{claimAmount}}.\n\n3. If the debt has been assigned or sold, a complete chain of assignment documentation showing each transfer from the original creditor to your organisation, including notices of assignment as required under the Law of Property Act 1925, Section 136.\n\n4. A copy of any default notice served in accordance with Section 87(1) of the Consumer Credit Act 1974, and proof of service.\n\n5. Evidence that the alleged debt is not statute-barred under the Limitation Act 1980 (i.e., that the limitation period has not expired).\n\n6. Confirmation of the lawful basis under which you are processing my personal data for this purpose, as required by UK GDPR Article 6.\n\n7. A copy of your authorisation from the Financial Conduct Authority (FCA) to carry out debt collection activities.",
    },
    {
      type: "timeframe",
      content:
        "I require your substantive response within fourteen (14) days of the date of this letter. During this period, I require you to cease all collection activity, including telephone calls, letters, home visits, and any reporting to credit reference agencies.",
    },
    {
      type: "consequences",
      content:
        "Should you fail to provide the requested evidence within the specified timeframe, I will consider the alleged debt unsubstantiated and expect all collection activity to cease permanently. Continued pursuit of an unproven debt may constitute harassment under the Protection from Harassment Act 1997 and unfair practices under the Consumer Rights Act 2015. I reserve the right to file complaints with the Financial Ombudsman Service, the Financial Conduct Authority, the Information Commissioner's Office, and Trading Standards.",
    },
    {
      type: "signature",
      content: "Without prejudice to any and all of my rights and remedies at law or in equity.\n\nSigned,\n\n\n{{userName}}",
    },
    {
      type: "rights-reservation",
      content: "All rights reserved. Errors and omissions excepted.",
    },
  ],
};
