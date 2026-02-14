import { DocumentTemplate } from "@/engine/types";

export const warrantVerification: DocumentTemplate = {
  id: "warrant-verification",
  name: "Warrant Verification Demand",
  shortDescription: "Require the bailiff to prove their warrant is valid, properly signed, and within scope",
  longDescription:
    "When a bailiff claims to hold a warrant, you have the right to verify its authenticity and scope before allowing any enforcement action. This document formally demands sight of the original warrant, confirmation of the issuing court, verification that it is within date, and confirmation the amount matches what is claimed. Many warrants are improperly issued, expired, or do not cover the amount being demanded.",
  applicableCategories: ["bailiff", "council-tax"],
  requiredFields: [
    { id: "claimReference", label: "Their Reference Number", placeholder: "e.g. ENF-123456", type: "text", required: true },
    { id: "claimAmount", label: "Amount They Are Claiming", placeholder: "e.g. £1,234.56", type: "text", required: true },
    { id: "bailiffCompany", label: "Bailiff/Enforcement Company Name", placeholder: "e.g. Marston Holdings", type: "text", required: true },
    { id: "dateOfVisitOrLetter", label: "Date of Visit or Letter", placeholder: "DD/MM/YYYY", type: "date", required: true },
  ],
  sections: [
    {
      type: "header",
      content: "{{date}}\n\n{{userName}}\n{{userAddress}}\n\n{{entityName}}\n{{entityAddress}}",
    },
    {
      type: "subject",
      content: "WARRANT VERIFICATION DEMAND — Reference: {{claimReference}}",
    },
    {
      type: "acknowledgment",
      content:
        "I acknowledge that an enforcement agent acting on behalf of {{bailiffCompany}} has claimed to hold a warrant in relation to the above reference, dated {{dateOfVisitOrLetter}}, for the sum of {{claimAmount}}.",
    },
    {
      type: "position",
      content:
        "Before any enforcement action may lawfully proceed, I require verification that a valid warrant exists and that it has been properly issued. I am exercising my right to inspect the warrant, as provided for under the Taking Control of Goods Regulations 2013.",
    },
    {
      type: "requirements",
      content:
        "I require the following to be provided within seven (7) days:\n\n1. A certified copy of the original warrant, showing the court seal, the date of issue, and the signature of the issuing authority.\n\n2. Confirmation of the court that issued the warrant, including the court address and case number.\n\n3. Verification that the warrant is within its valid date range and has not expired.\n\n4. A breakdown showing how the amount of {{claimAmount}} was calculated, including the original debt, any fees lawfully added under the Taking Control of Goods (Fees) Regulations 2014, and the statutory basis for each charge.\n\n5. Confirmation that the warrant relates specifically to me at this address and not to a previous occupier or another individual.\n\n6. Evidence that the underlying liability order (if council tax) was lawfully obtained, with notice properly served under the Council Tax (Administration and Enforcement) Regulations 1992.",
    },
    {
      type: "timeframe",
      content:
        "Given the urgency of enforcement proceedings, I require your response within seven (7) days of the date of this letter. No enforcement action should be taken until this verification is complete.",
    },
    {
      type: "consequences",
      content:
        "Any attempt to enforce a warrant that cannot be verified as valid may constitute trespass and/or an offence under the Criminal Law Act 1977. Should enforcement proceed without proper verification, I will seek all available remedies including formal complaints to the court, the enforcement company, and relevant regulatory bodies.",
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
