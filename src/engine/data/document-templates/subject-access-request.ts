import { DocumentTemplate } from "@/engine/types";

export const subjectAccessRequest: DocumentTemplate = {
  id: "subject-access-request",
  name: "Subject Access Request (SAR)",
  shortDescription: "Full data disclosure request under UK GDPR Article 15",
  longDescription:
    "A comprehensive Subject Access Request under Article 15 of the UK GDPR. This demands full disclosure of all personal data held, all correspondence, all recordings, any data shared with third parties, and the lawful basis for each processing activity. The entity is legally required to respond within 30 calendar days.",
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
      id: "accountReference",
      label: "Account or Reference Number (if known)",
      placeholder: "e.g. ACC-123456",
      type: "optional-text",
      required: false,
    },
    {
      id: "identityDetails",
      label: "Identity Information They May Hold",
      placeholder: "e.g. Date of birth, previous addresses, or other identifying details they may use",
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
        "SUBJECT ACCESS REQUEST — UK GDPR Article 15 / Data Protection Act 2018 Section 45",
    },
    {
      type: "acknowledgment",
      content:
        "I am writing to make a Subject Access Request under Article 15 of the UK General Data Protection Regulation (UK GDPR) and Section 45 of the Data Protection Act 2018.",
    },
    {
      type: "position",
      content:
        "I am the data subject. My details are as set out in the header of this letter. For the purposes of locating my records, the following additional information may assist: account reference {{accountReference}}; additional identifying details: {{identityDetails}}.\n\nThis is a formal request. You are legally obligated to respond within one calendar month of receipt.",
    },
    {
      type: "requirements",
      content:
        "I require you to provide the following information:\n\n1. A copy of all personal data you hold relating to me, in any format, including but not limited to: electronic records, paper files, database entries, notes, annotations, and metadata.\n\n2. All correspondence relating to me or my account, including internal correspondence, emails, letters, notes of telephone calls, and any communications with third parties about me.\n\n3. All recordings of telephone calls made to or from me, or in which I am discussed, in a commonly used electronic format.\n\n4. The purposes of all processing of my personal data.\n\n5. The categories of personal data concerned.\n\n6. The recipients or categories of recipients to whom my personal data has been or will be disclosed, particularly any recipients in third countries or international organisations.\n\n7. Where possible, the envisaged period for which my personal data will be stored, or, if not possible, the criteria used to determine that period.\n\n8. The existence of the right to request rectification or erasure of personal data, restriction of processing, or to object to such processing.\n\n9. The right to lodge a complaint with the Information Commissioner's Office.\n\n10. Where the personal data is not collected from me directly, any available information as to its source.\n\n11. The existence of any automated decision-making, including profiling, referred to in Article 22(1) and (4), and meaningful information about the logic involved, as well as the significance and envisaged consequences of such processing.\n\n12. The specific lawful basis relied upon under Article 6(1) for each processing activity.\n\n13. Details of any data breaches affecting my personal data, including dates, nature of the breach, and remedial action taken.",
    },
    {
      type: "timeframe",
      content:
        "You are required to respond to this request within thirty (30) calendar days of receipt, as mandated by Article 12(3) of the UK GDPR. This timeframe is not discretionary.",
    },
    {
      type: "consequences",
      content:
        "Should you fail to respond within the statutory timeframe, or should you provide an incomplete response, I will file a formal complaint with the Information Commissioner's Office (ICO). The ICO has the power to issue enforcement notices and administrative fines of up to £17.5 million or 4% of annual global turnover for serious infringements of the UK GDPR.\n\nI also reserve the right to apply to the court for an order under Section 167 of the Data Protection Act 2018 compelling compliance, and to seek compensation under Article 82 of the UK GDPR for any damage or distress caused by non-compliance.",
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
