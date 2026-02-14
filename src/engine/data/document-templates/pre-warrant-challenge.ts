import { DocumentTemplate } from "@/engine/types";

export const preWarrantChallenge: DocumentTemplate = {
  id: "pre-warrant-challenge",
  name: "Pre-Warrant Challenge",
  shortDescription: "Challenge the validity of a warrant before execution",
  longDescription:
    "When a warrant of entry or enforcement warrant has been obtained against you, this letter challenges its validity before it can be executed. It requires proof that the liability order was lawfully obtained, that correct procedure was followed at every stage, and that the amount being enforced is accurate. Many warrants are obtained through procedural shortcuts that can be challenged.",
  applicableCategories: ["council-tax", "bailiff"],
  requiredFields: [
    {
      id: "claimReference",
      label: "Account or Reference Number",
      placeholder: "e.g. CT-12345678",
      type: "text",
      required: true,
    },
    {
      id: "warrantType",
      label: "Type of Warrant",
      placeholder: "e.g. Warrant of Entry, Warrant of Control, Commitment Warrant",
      type: "text",
      required: true,
    },
    {
      id: "amountClaimed",
      label: "Amount Being Enforced",
      placeholder: "e.g. £2,500.00",
      type: "text",
      required: true,
    },
    {
      id: "enforcementAgentName",
      label: "Enforcement Agent/Bailiff Company (if known)",
      placeholder: "e.g. Bristow & Sutor, Marston Holdings",
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
        "PRE-WARRANT CHALLENGE — Reference: {{claimReference}} — {{warrantType}}",
    },
    {
      type: "acknowledgment",
      content:
        "I am writing in advance of any attempt to execute a {{warrantType}} in relation to account reference {{claimReference}}, in which an amount of {{amountClaimed}} is being pursued.",
    },
    {
      type: "position",
      content:
        "I formally challenge the validity of this warrant and the enforcement action associated with it. Before any warrant is executed against my property or person, I am entitled to verify that it was lawfully obtained and that correct procedure was followed at every stage.\n\nI do not accept that a valid, enforceable obligation has been established. The burden of proof lies with the enforcing party to demonstrate that all statutory requirements have been met.",
    },
    {
      type: "requirements",
      content:
        "I require the following to be provided before any enforcement action is taken:\n\n1. A certified copy of the original liability order, including the court case number, date of hearing, and name of the presiding judicial officer.\n\n2. Evidence that the liability order was obtained following a hearing at which my case was given individual judicial consideration — not a bulk hearing at which hundreds of cases were rubber-stamped without scrutiny.\n\n3. Proof that a valid summons was issued and served upon me in accordance with the statutory requirements, including evidence of the method and date of service.\n\n4. Confirmation that all statutory pre-conditions were satisfied before the warrant was applied for, including proper demand notices and reminders.\n\n5. A detailed breakdown of the amount of {{amountClaimed}}, showing the original sum, any interest, court costs, and enforcement fees, with the statutory authority for each charge.\n\n6. The original warrant document for inspection, confirming the issuing court, the date of issue, the expiry date, and the specific powers it grants.\n\n7. If an enforcement agent has been instructed, confirmation of their individual authorisation certificate number and the civil enforcement company they represent.\n\n8. Confirmation that the warrant relates to the correct individual and the correct address — specifically, that I am the named debtor and that the property at which enforcement is being attempted is correctly identified on the warrant.",
    },
    {
      type: "timeframe",
      content:
        "I require this information within fourteen (14) days of the date of this letter. No enforcement action should be taken pending the provision of this information.",
    },
    {
      type: "consequences",
      content:
        "Should any attempt be made to enforce this warrant without first providing the information requested above, I will:\n\n1. Report the matter to the relevant court as an unlawful execution.\n2. File a formal complaint with the Local Government and Social Care Ombudsman.\n3. Report any enforcement agent to the relevant professional body and to the court that certified them.\n4. Seek an injunction to prevent further enforcement action pending judicial review.\n5. Reserve my right to claim damages for trespass, harassment, and breach of the Protection from Harassment Act 1997.\n\nI also place on record that no implied right of access exists to my property. Any entry without my express permission and without a valid, verified warrant constitutes trespass.",
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
