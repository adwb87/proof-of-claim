import { DocumentTemplate } from "@/engine/types";

export const conditionalAcceptance: DocumentTemplate = {
  id: "conditional-acceptance",
  name: "Conditional Acceptance",
  shortDescription: "First response — accept their claim on condition they prove it",
  longDescription:
    "The foundational response to any demand for payment. Rather than refusing or ignoring the claim, you conditionally accept it — but only upon proof that the claim is valid. This puts the burden of proof squarely on the claimant. If they cannot provide a verified signed contract, a full statement of account, and evidence of authority, their claim remains unsubstantiated.",
  applicableCategories: [
    "energy",
    "water",
    "council-tax",
    "tv-licence",
    "debt-collector",
    "hmrc",
    "other",
  ],
  requiredFields: [
    {
      id: "claimReference",
      label: "Their Reference Number",
      placeholder: "e.g. ACC-123456",
      type: "text",
      required: true,
    },
    {
      id: "claimAmount",
      label: "Amount They Are Claiming",
      placeholder: "e.g. £1,234.56",
      type: "text",
      required: true,
    },
    {
      id: "dateOfTheirLetter",
      label: "Date of Their Letter/Communication",
      placeholder: "DD/MM/YYYY",
      type: "date",
      required: true,
    },
    {
      id: "additionalContext",
      label: "Any Additional Context",
      placeholder: "Optional — anything else relevant to your case",
      type: "optional-text",
      required: false,
    },
  ],
  sections: [
    {
      type: "header",
      content: "{{date}}\n\n{{userName}}\n{{userAddress}}\n\n{{entityName}}\n{{entityAddress}}",
    },
    {
      type: "subject",
      content:
        "CONDITIONAL ACCEPTANCE FOR VALUE — Reference: {{claimReference}}",
    },
    {
      type: "acknowledgment",
      content:
        "I acknowledge receipt of your communication dated {{dateOfTheirLetter}} in which you assert a claim in the amount of {{claimAmount}} under reference {{claimReference}}.",
    },
    {
      type: "position",
      content:
        "I do not dishonour your claim. I conditionally accept your claim for value, provided that you can substantiate it with the following verifiable evidence within the timeframe specified below.\n\nA conditional acceptance is not a refusal. It is a lawful and reasonable response that requires the claimant to demonstrate that a valid, enforceable obligation exists.",
    },
    {
      type: "requirements",
      content:
        "I require you to provide the following within the specified timeframe:\n\n1. A verified, signed copy of the original contract or agreement between myself and your organisation, bearing my wet-ink signature, which gives rise to the obligation you are asserting.\n\n2. A full and complete statement of account from inception to the present date, showing all charges, payments, adjustments, interest calculations, and the methodology used to arrive at the sum of {{claimAmount}}.\n\n3. Evidence of your authority to make this claim — specifically, confirmation of whether you are the original creditor, an assigned party, or an agent acting on behalf of another entity, together with any relevant assignment documentation.\n\n4. Confirmation of the lawful basis upon which you are processing my personal data for the purpose of this claim, as required under the UK General Data Protection Regulation (UK GDPR), Article 6.",
    },
    {
      type: "timeframe",
      content:
        "I require your substantive response within fourteen (14) days of the date of this letter. A substantive response means providing the specific documentation listed above — not a generic acknowledgment or a restatement of the amount claimed.",
    },
    {
      type: "consequences",
      content:
        "Should you fail to provide the requested evidence within the specified timeframe, your claim will be deemed unsubstantiated and I will treat the matter as resolved in my favour. Any continued pursuit of an unsubstantiated claim may constitute harassment, and I reserve the right to file formal complaints with the relevant regulatory bodies, including but not limited to the Financial Ombudsman Service, the Information Commissioner's Office, and Trading Standards.",
    },
    {
      type: "signature",
      content:
        "Without prejudice to any and all of my rights and remedies at law or in equity.\n\nSigned,\n\n\n{{userName}}",
    },
    {
      type: "rights-reservation",
      content:
        "All rights reserved. Errors and omissions excepted.",
    },
  ],
};
