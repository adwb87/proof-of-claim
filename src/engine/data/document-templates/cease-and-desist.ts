import { DocumentTemplate } from "@/engine/types";

export const ceaseAndDesist: DocumentTemplate = {
  id: "cease-and-desist",
  name: "Cease and Desist",
  shortDescription: "Order them to stop all contact after they've failed to prove their claim",
  longDescription:
    "This is the final step when a company or collector has been given reasonable opportunity to substantiate their claim and has failed to do so. It formally demands that all communication cease immediately and warns of regulatory action if contact continues. This is appropriate when previous letters (Conditional Acceptance, Prove the Debt) have gone unanswered or inadequately responded to.",
  applicableCategories: [
    "energy", "water", "debt-collector", "private-parking", "tv-licence", "other",
  ],
  requiredFields: [
    { id: "claimReference", label: "Their Reference Number", placeholder: "e.g. ACC-123456", type: "text", required: true },
    { id: "dateOfOriginalLetter", label: "Date You First Wrote to Them", placeholder: "DD/MM/YYYY", type: "date", required: true },
    { id: "previousLettersSummary", label: "Brief Summary of Previous Letters Sent", placeholder: "e.g. Conditional Acceptance sent 1 Jan, Notice of Default sent 15 Jan", type: "textarea", required: true },
  ],
  sections: [
    {
      type: "header",
      content: "{{date}}\n\n{{userName}}\n{{userAddress}}\n\n{{entityName}}\n{{entityAddress}}",
    },
    {
      type: "subject",
      content: "CEASE AND DESIST — FINAL NOTICE — Reference: {{claimReference}}",
    },
    {
      type: "acknowledgment",
      content:
        "I refer to the ongoing correspondence regarding the above reference. I have previously written to you on the following occasions:\n\n{{previousLettersSummary}}\n\nIn each instance, I provided you with a reasonable opportunity to substantiate your claim with verifiable evidence.",
    },
    {
      type: "position",
      content:
        "You have failed to provide the evidence requested. Despite being given ample time and clear instructions on what was required, you have not produced a verified signed agreement, a substantiated statement of account, or evidence of your authority to pursue this claim.\n\nYour claim therefore remains entirely unsubstantiated. I have acted in good faith throughout this process, offering conditional acceptance and requesting only that you prove what you assert. You have not done so.",
    },
    {
      type: "requirements",
      content:
        "I now require you to:\n\n1. Cease all communication with me regarding this matter immediately, including letters, emails, telephone calls, text messages, and home visits.\n\n2. Remove any adverse entries relating to this matter from all credit reference agencies within fourteen (14) days.\n\n3. Delete or return all personal data held about me in connection with this matter, in accordance with my rights under UK GDPR Article 17 (Right to Erasure).\n\n4. Confirm in writing within fourteen (14) days that you have complied with items 1-3 above.",
    },
    {
      type: "timeframe",
      content:
        "I require written confirmation of compliance within fourteen (14) days of the date of this letter.",
    },
    {
      type: "consequences",
      content:
        "Should you fail to comply, or should you continue to contact me regarding this unsubstantiated claim, I will take the following steps without further notice:\n\n1. File a formal complaint with the Financial Ombudsman Service (if applicable)\n2. Report a data protection breach to the Information Commissioner's Office under UK GDPR\n3. Report unfair trading practices to Trading Standards\n4. Pursue a claim for harassment under the Protection from Harassment Act 1997\n5. Seek damages through the County Court for distress caused by the continued pursuit of an unsubstantiated claim\n\nThis letter serves as your final notice. Any further contact will be treated as evidence of harassment.",
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
