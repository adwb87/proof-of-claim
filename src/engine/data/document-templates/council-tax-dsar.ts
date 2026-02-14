import { DocumentTemplate } from "@/engine/types";

export const councilTaxDsar: DocumentTemplate = {
  id: "council-tax-dsar",
  name: "Council Tax Data Subject Access Request",
  shortDescription: "Council-specific DSAR targeting liability orders and compliance",
  longDescription:
    "A targeted Subject Access Request designed specifically for council tax disputes. This goes beyond a standard SAR by demanding documentation that councils are often unable to produce: the original liability order, court hearing transcripts, evidence of Regulation 34(6) compliance, proof of valid assessment, and full council tax calculations. Many liability orders are obtained in bulk without proper individual consideration.",
  applicableCategories: ["council-tax"],
  requiredFields: [
    {
      id: "councilTaxReference",
      label: "Council Tax Account Reference",
      placeholder: "e.g. CT-12345678",
      type: "text",
      required: true,
    },
    {
      id: "propertyAddress",
      label: "Property Address on the Account",
      placeholder: "The address the council tax relates to",
      type: "text",
      required: true,
    },
    {
      id: "liabilityOrderDate",
      label: "Date of Liability Order (if known)",
      placeholder: "DD/MM/YYYY",
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
        "SUBJECT ACCESS REQUEST AND DISCLOSURE REQUEST — Council Tax Account: {{councilTaxReference}} — Property: {{propertyAddress}}",
    },
    {
      type: "acknowledgment",
      content:
        "I am writing to make a formal Subject Access Request under Article 15 of the UK General Data Protection Regulation (UK GDPR) and Section 45 of the Data Protection Act 2018, specifically in relation to my council tax account referenced above.",
    },
    {
      type: "position",
      content:
        "I am exercising my lawful right to obtain copies of all personal data and associated documentation relating to the above council tax account. This request is made in connection with an ongoing dispute regarding the validity of the assessment and/or any enforcement action taken.\n\nLocal authorities are data controllers and are subject to the same data protection obligations as any other organisation. This includes the obligation to respond fully and within the statutory timeframe.",
    },
    {
      type: "requirements",
      content:
        "I require you to provide the following documentation and information:\n\nACCOUNT AND ASSESSMENT\n\n1. A complete copy of the council tax account from inception to the present date, showing all charges, payments, credits, adjustments, and the current balance.\n\n2. The council tax band assessment for the property at {{propertyAddress}}, together with evidence of how this assessment was determined and by whom.\n\n3. The calculation methodology used to determine the council tax amount for each financial year in which a charge has been levied.\n\n4. Evidence of valid statutory demand notices issued for each financial year, including proof of posting and delivery.\n\nLIABILITY ORDER\n\n5. A certified copy of the liability order(s) obtained in relation to this account, including the court case number, date of hearing, and name of the presiding magistrate or district judge.\n\n6. A transcript or record of the court hearing at which the liability order was granted, confirming that the matter was given individual consideration and was not part of a bulk hearing without proper scrutiny.\n\n7. Evidence of compliance with Regulation 34(6) of the Council Tax (Administration and Enforcement) Regulations 1992, specifically: proof that a summons was issued, proof of service of the summons, and proof that the correct statutory procedures were followed prior to the liability order application.\n\n8. A copy of the original complaint to the magistrates' court under Regulation 34(2).\n\nENFORCEMENT AND THIRD PARTIES\n\n9. Details of any enforcement agents or bailiffs instructed in relation to this account, including: company name, date of instruction, fees charged, and the authority under which they were instructed.\n\n10. All correspondence relating to this account, including internal notes, emails, and communications with third parties.\n\n11. Details of any personal data shared with credit reference agencies, enforcement agents, or other third parties, together with the lawful basis for each disclosure.\n\n12. All recordings of telephone calls relating to this account.",
    },
    {
      type: "timeframe",
      content:
        "You are required to respond to this Subject Access Request within thirty (30) calendar days of receipt, as mandated by Article 12(3) of the UK GDPR.",
    },
    {
      type: "consequences",
      content:
        "Should you fail to respond within the statutory timeframe, or should you provide an incomplete response, I will file a formal complaint with the Information Commissioner's Office (ICO).\n\nI will also consider making a formal complaint to the Local Government and Social Care Ombudsman regarding any maladministration in the handling of this council tax account.\n\nI reserve the right to apply to the court under Section 167 of the Data Protection Act 2018 for an order compelling compliance, and to seek compensation under Article 82 of the UK GDPR for any damage or distress caused.",
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
