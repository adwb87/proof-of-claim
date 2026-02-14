import { DocumentTemplate } from "@/engine/types";

export const nipResponse: DocumentTemplate = {
  id: "nip-response",
  name: "NIP Response",
  shortDescription: "Challenge a Notice of Intended Prosecution, requesting full evidence and questioning procedure",
  longDescription:
    "A Notice of Intended Prosecution (NIP) must comply with strict procedural requirements under the Road Traffic Offenders Act 1988. This document challenges the NIP by requesting full evidence including calibration certificates, operator credentials, photographic evidence, and questioning whether the 14-day service rule was met. Many NIPs contain procedural defects that invalidate the prosecution.",
  applicableCategories: ["speeding"],
  requiredFields: [
    { id: "nipReference", label: "NIP Reference Number", placeholder: "e.g. NIP/2024/123456", type: "text", required: true },
    { id: "allegedDate", label: "Date of Alleged Offence", placeholder: "DD/MM/YYYY", type: "date", required: true },
    { id: "allegedLocation", label: "Location of Alleged Offence", placeholder: "e.g. A40, near junction 3", type: "text", required: true },
    { id: "dateNipReceived", label: "Date NIP Was Received", placeholder: "DD/MM/YYYY", type: "date", required: true },
  ],
  sections: [
    {
      type: "header",
      content: "{{date}}\n\n{{userName}}\n{{userAddress}}\n\n{{entityName}}\n{{entityAddress}}",
    },
    {
      type: "subject",
      content: "RESPONSE TO NOTICE OF INTENDED PROSECUTION — Reference: {{nipReference}}",
    },
    {
      type: "acknowledgment",
      content:
        "I acknowledge receipt of the Notice of Intended Prosecution dated {{allegedDate}}, received by me on {{dateNipReceived}}, reference {{nipReference}}, relating to an alleged offence at {{allegedLocation}}.",
    },
    {
      type: "position",
      content:
        "Before I am able to respond substantively to this notice, I require you to provide evidence sufficient to substantiate the allegation. As the prosecuting authority, the burden of proof rests with you. I am exercising my right to review the evidence before making any admission or providing any statement.",
    },
    {
      type: "requirements",
      content:
        "I require the following within twenty-eight (28) days:\n\n1. Confirmation that the NIP was served within fourteen (14) days of the alleged offence, as required by Section 1(1) of the Road Traffic Offenders Act 1988. Please provide proof of postage with date.\n\n2. Full photographic evidence of the alleged offence, including all images captured and the original unedited files with EXIF data intact.\n\n3. The current calibration certificate for the detection device used, confirming it was calibrated and functioning correctly on the date of the alleged offence.\n\n4. The operator's credentials and certification for the device used, confirming they were trained and authorised to operate it.\n\n5. Evidence of a valid Type Approval certificate for the device under the relevant regulations.\n\n6. Evidence confirming the speed limit at the precise location and the Traffic Regulation Order establishing that limit.\n\n7. Evidence that any signage required by law was properly displayed at the location.",
    },
    {
      type: "timeframe",
      content:
        "I require your response within twenty-eight (28) days of the date of this letter. I reserve my right to respond to the NIP upon receipt and review of the requested evidence.",
    },
    {
      type: "consequences",
      content:
        "Should the evidence requested not be forthcoming, or should it reveal procedural deficiencies, I will challenge any prosecution and rely upon such deficiencies in my defence. I further reserve the right to raise these matters before the court should proceedings be commenced without proper disclosure.",
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
