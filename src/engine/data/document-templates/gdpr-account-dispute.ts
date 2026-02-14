import { DocumentTemplate } from "@/engine/types";

export const gdprAccountDispute: DocumentTemplate = {
  id: "gdpr-account-dispute",
  name: "GDPR Account Dispute",
  shortDescription: "Challenge the lawful basis for processing your data for billing",
  longDescription:
    "A data-protection-focused challenge that questions the lawful basis under which the entity is processing your personal data for billing purposes. This letter cites UK GDPR Article 6 (lawful basis), Article 5(1)(d) (accuracy), and Article 17 (right to erasure), and requires the entity to demonstrate their legal justification for holding and processing your data.",
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
      label: "Account or Reference Number",
      placeholder: "e.g. ACC-123456",
      type: "text",
      required: true,
    },
    {
      id: "claimAmount",
      label: "Amount Being Claimed (if applicable)",
      placeholder: "e.g. £1,234.56",
      type: "optional-text",
      required: false,
    },
    {
      id: "dateOfTheirLetter",
      label: "Date of Their Communication",
      placeholder: "DD/MM/YYYY",
      type: "date",
      required: true,
    },
    {
      id: "dataProcessingConcern",
      label: "Your Specific Data Concern",
      placeholder: "e.g. I never provided consent for them to process my data for billing, or they are sharing my data with third parties without my knowledge",
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
        "DISPUTE OF ACCOUNT AND DATA PROCESSING — Reference: {{claimReference}} — UK GDPR Articles 5, 6, and 17",
    },
    {
      type: "acknowledgment",
      content:
        "I acknowledge receipt of your communication dated {{dateOfTheirLetter}} concerning account reference {{claimReference}}.",
    },
    {
      type: "position",
      content:
        "I formally dispute the validity of this account and challenge the lawful basis upon which you are processing my personal data in connection with it.\n\nI have no recollection of providing informed consent for you to process my personal data for the purpose of billing or debt collection. Under the UK General Data Protection Regulation (UK GDPR), you are required to have a lawful basis for processing personal data. The six lawful bases are set out in Article 6(1).\n\nFurthermore, under Article 5(1)(d) of the UK GDPR, personal data must be accurate and, where necessary, kept up to date. Every reasonable step must be taken to ensure that personal data that is inaccurate, having regard to the purposes for which it is processed, is erased or rectified without delay.\n\nMy specific concern is as follows: {{dataProcessingConcern}}",
    },
    {
      type: "requirements",
      content:
        "I require you to provide the following:\n\n1. The specific lawful basis under UK GDPR Article 6(1) upon which you rely for processing my personal data in relation to this account. If you rely on consent (Article 6(1)(a)), provide a copy of the consent record. If you rely on contractual necessity (Article 6(1)(b)), provide a copy of the contract. If you rely on legitimate interest (Article 6(1)(f)), provide your documented Legitimate Interest Assessment.\n\n2. A complete list of all personal data you hold relating to me, including the source of that data and the date it was obtained.\n\n3. Details of any third parties with whom you have shared my personal data, together with the lawful basis for each disclosure.\n\n4. Confirmation of whether you have conducted a Data Protection Impact Assessment in relation to the processing activities connected with this account.\n\n5. If you are unable to demonstrate a lawful basis for processing, I formally invoke my right to erasure under Article 17 of the UK GDPR and require you to delete all personal data you hold relating to me, and to confirm deletion in writing.",
    },
    {
      type: "timeframe",
      content:
        "I require your substantive response within fourteen (14) days of the date of this letter, in accordance with the accountability principle under Article 5(2) of the UK GDPR.",
    },
    {
      type: "consequences",
      content:
        "Should you fail to demonstrate a lawful basis for processing my personal data within the specified timeframe, or should you continue to process my data without lawful basis, I will file a formal complaint with the Information Commissioner's Office (ICO) under Section 165 of the Data Protection Act 2018.\n\nI will also report any continued pursuit of an unsubstantiated claim to the relevant industry regulator, and reserve the right to seek compensation for any damage or distress caused by unlawful data processing under Article 82 of the UK GDPR.",
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
