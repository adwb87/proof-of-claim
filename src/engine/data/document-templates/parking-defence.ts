import { DocumentTemplate } from "@/engine/types";

export const parkingDefence: DocumentTemplate = {
  id: "parking-defence",
  name: "Parking Defence",
  shortDescription: "Dispute a private parking charge, challenging their contractual standing and evidence",
  longDescription:
    "Private parking companies issue parking charge notices (not fines — only councils can issue fines). These charges are essentially invoices claiming breach of contract. This document challenges the company's contractual standing, the adequacy of signage, the accuracy of ANPR evidence, and their compliance with the Protection of Freedoms Act 2012 Schedule 4. The burden is on them to prove a contract existed and was breached.",
  applicableCategories: ["private-parking", "council-parking"],
  requiredFields: [
    { id: "chargeReference", label: "Charge/PCN Reference Number", placeholder: "e.g. PCN-123456", type: "text", required: true },
    { id: "chargeAmount", label: "Amount Claimed", placeholder: "e.g. £100", type: "text", required: true },
    { id: "dateOfAllegedContravention", label: "Date of Alleged Contravention", placeholder: "DD/MM/YYYY", type: "date", required: true },
    { id: "locationOfParking", label: "Location Where You Were Parked", placeholder: "e.g. Tesco car park, High Street", type: "text", required: true },
    { id: "reasonForChallenge", label: "Main Reason for Challenging", placeholder: "e.g. signage was not visible, I was loading", type: "textarea", required: true },
  ],
  sections: [
    {
      type: "header",
      content: "{{date}}\n\n{{userName}}\n{{userAddress}}\n\n{{entityName}}\n{{entityAddress}}",
    },
    {
      type: "subject",
      content: "FORMAL CHALLENGE TO PARKING CHARGE NOTICE — Reference: {{chargeReference}}",
    },
    {
      type: "acknowledgment",
      content:
        "I acknowledge receipt of your parking charge notice reference {{chargeReference}}, dated {{dateOfAllegedContravention}}, claiming the sum of {{chargeAmount}} in relation to a vehicle parked at {{locationOfParking}}.",
    },
    {
      type: "position",
      content:
        "I dispute this charge in its entirety. A parking charge notice issued by a private company is not a fine — it is an invoice alleging breach of contract. As the party making this claim, the burden of proof falls on you to demonstrate that a binding contract existed and was breached.\n\nMy specific grounds for challenging are as follows: {{reasonForChallenge}}",
    },
    {
      type: "requirements",
      content:
        "I require you to provide the following evidence to substantiate your claim:\n\n1. Evidence that a binding contract existed between the driver and your company at the time of the alleged contravention. This requires proof of clear, visible signage at the point of entry setting out the terms, and that by parking, the driver had reasonable opportunity to read and accept those terms.\n\n2. Photographic evidence of the signage at the location on the date in question, demonstrating it was clearly visible, legible, and compliant with the requirements of the British Parking Association (BPA) or International Parking Community (IPC) code of practice.\n\n3. Full ANPR evidence including entry and exit images with timestamps, demonstrating the accuracy of the time period alleged.\n\n4. Evidence of your compliance with the Protection of Freedoms Act 2012, Schedule 4, including proof that a Notice to Keeper was served within the statutory timeframe on the registered keeper.\n\n5. Evidence of your authority to manage parking at this location, including any contract with the landowner.\n\n6. A breakdown of how the charge of {{chargeAmount}} was calculated and evidence that it represents a genuine pre-estimate of loss, as required to avoid the charge being deemed a penalty (unenforceable under common law).",
    },
    {
      type: "timeframe",
      content:
        "I require your substantive response within twenty-eight (28) days of the date of this letter.",
    },
    {
      type: "consequences",
      content:
        "Should you fail to provide the requested evidence, I will consider this charge unsubstantiated and expect it to be cancelled. Should you proceed to court without providing this evidence, I will rely on your failure in my defence and seek costs.\n\nI also note that any misrepresentation of this charge as a 'fine' or suggestion that failure to pay will result in criminal prosecution, bailiff action, or county court judgments (without actually issuing proceedings) may constitute unfair commercial practice under the Consumer Protection from Unfair Trading Regulations 2008.",
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
