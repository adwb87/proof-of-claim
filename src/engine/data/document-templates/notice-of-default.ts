import { DocumentTemplate } from "@/engine/types";

export const noticeOfDefault: DocumentTemplate = {
  id: "notice-of-default",
  name: "Notice of Default",
  shortDescription: "Follow-up when they fail to respond to your conditional acceptance",
  longDescription:
    "When the claimant fails to provide the evidence requested in your Conditional Acceptance within the specified timeframe, this letter formally places them in default. It records their failure, reaffirms that the claim remains unsubstantiated, and puts them on notice that any further pursuit without evidence will be treated as harassment.",
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
      id: "originalLetterDate",
      label: "Date You Sent Your Conditional Acceptance",
      placeholder: "DD/MM/YYYY",
      type: "date",
      required: true,
    },
    {
      id: "deadlineDate",
      label: "Date the 14-Day Deadline Expired",
      placeholder: "DD/MM/YYYY",
      type: "date",
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
      id: "additionalContext",
      label: "Did They Respond at All? (Optional)",
      placeholder: "e.g. They sent a generic letter restating the amount but provided no evidence",
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
        "NOTICE OF DEFAULT — Reference: {{claimReference}}",
    },
    {
      type: "acknowledgment",
      content:
        "I refer to my letter dated {{originalLetterDate}} in which I conditionally accepted your claim under reference {{claimReference}} for the sum of {{claimAmount}}, subject to your provision of verifiable evidence substantiating the alleged obligation.",
    },
    {
      type: "position",
      content:
        "The fourteen-day deadline for your substantive response expired on {{deadlineDate}}. You have failed to provide the evidence requested, specifically: a verified signed contract, a full statement of account from inception, and evidence of your authority to make this claim.\n\nYour failure to substantiate this claim within the reasonable timeframe provided constitutes a default on your part. The claim remains unsubstantiated and unverified.\n\nI do not accept liability for any amount that has not been proven to be lawfully owed. An assertion of debt is not proof of debt.",
    },
    {
      type: "requirements",
      content:
        "I require you to take the following action immediately:\n\n1. Cease all collection activity relating to reference {{claimReference}} until such time as you can provide the evidence previously requested.\n\n2. Confirm in writing that you have placed a hold on this account and that no further demands, telephone calls, visits, or communications will be made pending resolution.\n\n3. Remove any adverse data reported to credit reference agencies in relation to this unsubstantiated claim, or confirm that no such data has been reported.\n\n4. If you have assigned or sold this alleged debt to a third party, provide full details of the assignee and the date of assignment.",
    },
    {
      type: "timeframe",
      content:
        "I require your response within fourteen (14) days of the date of this notice.",
    },
    {
      type: "consequences",
      content:
        "Should you continue to pursue this unsubstantiated claim, I will interpret such action as harassment and will file formal complaints with the relevant regulatory bodies. These may include, but are not limited to:\n\n- The Financial Ombudsman Service\n- The Information Commissioner's Office (for unlawful processing of personal data)\n- Trading Standards\n- The Financial Conduct Authority\n\nI will also seek to recover any costs incurred in defending against an unsubstantiated claim, including the cost of any legal advice obtained.",
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
