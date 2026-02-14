import { DocumentTemplate } from "@/engine/types";

export const bailiffNonEntry: DocumentTemplate = {
  id: "bailiff-non-entry",
  name: "Bailiff Non-Entry Notice",
  shortDescription: "Formal notice denying bailiffs permission to enter your property",
  longDescription:
    "A formal non-entry notice that removes any implied right of access to your property. Enforcement agents (bailiffs) have limited powers of entry and in most cases cannot force entry on a first visit. This notice clearly states that permission to enter is not granted, that peaceful entry has not been achieved, and that any attempt to gain entry without lawful authority constitutes trespass.",
  applicableCategories: ["council-tax", "bailiff", "debt-collector"],
  requiredFields: [
    {
      id: "claimReference",
      label: "Account or Reference Number",
      placeholder: "e.g. ENF-123456",
      type: "text",
      required: true,
    },
    {
      id: "enforcementCompany",
      label: "Enforcement Agent/Bailiff Company",
      placeholder: "e.g. Bristow & Sutor, Marston Holdings",
      type: "text",
      required: true,
    },
    {
      id: "originalCreditor",
      label: "Original Creditor (if different from bailiff company)",
      placeholder: "e.g. Local Council name",
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
        "FORMAL NOTICE OF NON-ENTRY — Reference: {{claimReference}} — Enforcement Company: {{enforcementCompany}}",
    },
    {
      type: "acknowledgment",
      content:
        "I am writing to formally place you on notice regarding any intended visit or enforcement action at my property in connection with reference {{claimReference}}.",
    },
    {
      type: "position",
      content:
        "I DO NOT GRANT PERMISSION TO ENTER MY PROPERTY.\n\nNo implied right of access exists to my property. I hereby withdraw any implied licence to enter my premises under common law. This notice applies to all agents, employees, contractors, and representatives of {{enforcementCompany}} and any associated parties.\n\nI am aware of my rights under the following legislation:\n\n- The Taking Control of Goods Regulations 2013\n- The Tribunals, Courts and Enforcement Act 2007, Part 3\n- The Criminal Law Act 1977, Section 6\n\nEnforcement agents may only enter a property through a door or other usual means of entry, and may not use force on a first visit. Peaceful entry means entering through a door that the occupant has voluntarily opened. Looking through a window, entering through a window, or pushing past an occupant does not constitute peaceful entry.\n\nI have not opened my door to any enforcement agent. Peaceful entry has not been gained. No Controlled Goods Agreement is in place.",
    },
    {
      type: "requirements",
      content:
        "I require the following:\n\n1. Confirmation that this notice has been recorded on your files and that all agents assigned to this case have been informed.\n\n2. No visits to my property without a minimum of seven (7) days' written notice, specifying the name of the enforcement agent, their individual authorisation certificate number, the date and time of the proposed visit, and the specific legal power under which they claim the right to enter.\n\n3. A certified copy of any warrant, writ, or order that you claim authorises entry to my property, together with the name of the issuing court and the date of issue.\n\n4. A full breakdown of all fees being charged, with the statutory authority for each fee, in accordance with the Taking Control of Goods (Fees) Regulations 2014.\n\n5. Confirmation of the original creditor and the amount of the original debt, separate from any enforcement fees.",
    },
    {
      type: "timeframe",
      content:
        "I require your written acknowledgment of this notice within fourteen (14) days.",
    },
    {
      type: "consequences",
      content:
        "I formally place on record the following:\n\n- Any attempt to gain entry to my property without my express consent and without lawful authority constitutes trespass and will be reported to the police.\n- Any attempt to force entry will be treated as a criminal offence under Section 6 of the Criminal Law Act 1977.\n- Any enforcement agent who attends my property without providing the information requested above will be reported to the court that issued their certificate and to their professional body.\n- I will record any interaction with enforcement agents at my property for evidential purposes. This is my right under the Human Rights Act 1998, Article 8.\n- I reserve the right to file formal complaints with the Local Government and Social Care Ombudsman, the relevant court, and any other regulatory body.\n- I reserve the right to seek damages for any unlawful entry, harassment, or distress caused.",
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
