import { DocumentTemplate } from "@/engine/types";

export const hmrcConditionalAcceptance: DocumentTemplate = {
  id: "hmrc-conditional-acceptance",
  name: "HMRC Conditional Acceptance",
  shortDescription: "Conditionally accept an HMRC demand subject to verified assessment evidence",
  longDescription:
    "While HMRC has broad powers, they must still follow due process and issue proper assessments. This document conditionally accepts their demand while requiring them to provide evidence of a formal assessment, the calculation methodology, and the statutory authority under which the amount is demanded. HMRC assessments can be challenged within specific timeframes, and this letter preserves your rights.",
  applicableCategories: ["hmrc"],
  requiredFields: [
    { id: "taxReference", label: "Tax Reference / UTR Number", placeholder: "e.g. 1234567890", type: "text", required: true },
    { id: "claimAmount", label: "Amount Demanded", placeholder: "e.g. £5,000", type: "text", required: true },
    { id: "taxYear", label: "Tax Year in Question", placeholder: "e.g. 2023/24", type: "text", required: true },
    { id: "dateOfDemand", label: "Date of Their Demand", placeholder: "DD/MM/YYYY", type: "date", required: true },
  ],
  sections: [
    {
      type: "header",
      content: "{{date}}\n\n{{userName}}\n{{userAddress}}\n\nHM Revenue and Customs\n{{entityAddress}}",
    },
    {
      type: "subject",
      content: "CONDITIONAL ACCEPTANCE — Tax Reference: {{taxReference}} — Tax Year: {{taxYear}}",
    },
    {
      type: "acknowledgment",
      content:
        "I acknowledge receipt of your demand dated {{dateOfDemand}} claiming the sum of {{claimAmount}} in relation to tax reference {{taxReference}} for the tax year {{taxYear}}.",
    },
    {
      type: "position",
      content:
        "I do not wish to be in dishonour. I conditionally accept this demand upon your provision of verifiable evidence that the amount claimed is correct, properly assessed, and lawfully due. HMRC, like all public bodies, is bound by its own statutory framework and must be able to demonstrate that assessments are made in accordance with the law.",
    },
    {
      type: "requirements",
      content:
        "I require you to provide the following within twenty-eight (28) days:\n\n1. A copy of the formal assessment notice issued under the relevant statutory provision (e.g., Section 29 of the Taxes Management Act 1970 for discovery assessments, or Section 9A for enquiry closure), confirming the amount of {{claimAmount}}.\n\n2. A full breakdown of how the amount of {{claimAmount}} has been calculated, including all income sources, allowable deductions, reliefs applied, and the tax rate(s) used.\n\n3. Identification of the specific statutory authority under which this demand is made, including the relevant section of the applicable Act.\n\n4. If this demand relates to a penalty, confirmation that the penalty has been properly notified in accordance with Schedule 55 or 56 of the Finance Act 2009 (as applicable), and evidence that a reasonable excuse assessment has been conducted.\n\n5. Confirmation of my appeal rights and the deadline for any appeal, as required by law.\n\n6. Any correspondence or documentation that was relied upon in making this assessment.",
    },
    {
      type: "timeframe",
      content:
        "I require your substantive response within twenty-eight (28) days of the date of this letter. I note that HMRC's internal guidance requires it to respond to taxpayer correspondence within 30 days.",
    },
    {
      type: "consequences",
      content:
        "I reserve all rights of appeal under the Taxes Management Act 1970 and the Finance Acts. Should the evidence provided reveal that this assessment was made incorrectly or without proper statutory basis, I will formally appeal through the relevant tribunal process. Nothing in this letter constitutes an admission of liability, and I expressly preserve all my rights and remedies.",
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
