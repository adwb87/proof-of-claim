import { DocumentTemplate } from "@/engine/types";

export const affidavitOfTruth: DocumentTemplate = {
  id: "affidavit-of-truth",
  name: "Affidavit of Truth",
  shortDescription: "Sworn statement of facts — a formal declaration of your position",
  longDescription:
    "A formal sworn declaration setting out the facts of your case. This document records your version of events under a declaration of truth, notes the claimant's failure to provide evidence when challenged, and can be used as supporting evidence in any subsequent dispute or proceedings. It carries significant weight because it is made under penalty of perjury.",
  applicableCategories: [
    "energy",
    "water",
    "council-tax",
    "tv-licence",
    "debt-collector",
    "bailiff",
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
      id: "originalLetterDate",
      label: "Date of Your First Letter (Conditional Acceptance)",
      placeholder: "DD/MM/YYYY",
      type: "date",
      required: true,
    },
    {
      id: "defaultNoticeDate",
      label: "Date of Your Notice of Default",
      placeholder: "DD/MM/YYYY",
      type: "date",
      required: true,
    },
    {
      id: "factsSummary",
      label: "Summary of Key Facts",
      placeholder: "Describe the key facts of your case — what happened, what they claimed, what you did",
      type: "textarea",
      required: true,
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
        "AFFIDAVIT OF TRUTH — Reference: {{claimReference}}",
    },
    {
      type: "acknowledgment",
      content:
        "I, {{userName}}, do solemnly and sincerely declare the following statements to be true and correct to the best of my knowledge, information, and belief.",
    },
    {
      type: "position",
      content:
        "STATEMENT OF FACTS\n\n1. I am the individual named above, residing at the address stated. I make this declaration of my own free will and in full capacity.\n\n2. {{entityName}} has asserted a claim against me in the amount of {{claimAmount}} under reference {{claimReference}}.\n\n3. On {{originalLetterDate}}, I issued a Conditional Acceptance for Value, requiring {{entityName}} to substantiate their claim by providing: (a) a verified signed contract, (b) a full statement of account from inception, and (c) evidence of authority to make the claim.\n\n4. {{entityName}} was given fourteen (14) days to respond with the requested evidence.\n\n5. On {{defaultNoticeDate}}, having received no substantive response, I issued a formal Notice of Default, recording their failure to substantiate the claim.\n\n6. As of the date of this affidavit, {{entityName}} has still failed to provide any verifiable evidence of a lawful obligation on my part.\n\n7. Additional facts: {{factsSummary}}\n\n8. I have at all times acted in good faith and provided {{entityName}} with reasonable opportunity to prove their claim. They have failed to do so.",
    },
    {
      type: "requirements",
      content:
        "I require {{entityName}} to acknowledge the facts set out in this affidavit by way of a point-by-point rebuttal under their own sworn declaration, if they dispute any of the above.\n\nAny fact not specifically rebutted under oath within the timeframe below shall be deemed admitted by acquiescence.",
    },
    {
      type: "timeframe",
      content:
        "I require any sworn rebuttal within twenty-eight (28) days of the date of this affidavit.",
    },
    {
      type: "consequences",
      content:
        "Should {{entityName}} fail to rebut the facts stated herein within the specified timeframe, this affidavit shall stand as an unrebutted statement of truth. I reserve the right to present this document as evidence in any court proceedings, regulatory complaint, or dispute resolution process.\n\nContinued pursuit of this unsubstantiated claim following failure to rebut will be treated as harassment and may result in formal complaints to all relevant regulatory bodies.",
    },
    {
      type: "signature",
      content:
        "DECLARATION\n\nI declare under penalty of perjury that the foregoing is true and correct.\n\nExecuted on this day, {{date}}.\n\nWithout prejudice to any and all of my rights and remedies at law or in equity.\n\nSigned,\n\n\n{{userName}}",
    },
    {
      type: "rights-reservation",
      content:
        "All rights reserved. Errors and omissions excepted.",
    },
  ],
};
