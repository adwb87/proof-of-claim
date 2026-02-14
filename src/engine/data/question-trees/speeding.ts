import type { QuestionTree } from "@/engine/types";

export const speedingQuestionTree: QuestionTree = {
  categoryId: "speeding",
  questions: [
    {
      id: "speeding-q1",
      text: "When did you receive the NIP?",
      helpText:
        "Under Section 1 of the Road Traffic Offenders Act 1988, a Notice of Intended Prosecution (NIP) must be served within 14 days of the alleged offence. If not, the prosecution may be invalid. This is one of the most common procedural defences in speeding cases.",
      options: [
        {
          id: "speeding-q1-within-14",
          label: "Within 14 days of the alleged offence",
          description: "The NIP arrived within the statutory timeframe",
          next: "speeding-q3",
        },
        {
          id: "speeding-q1-over-14",
          label: "More than 14 days after",
          description: "The NIP arrived after the 14-day deadline",
          next: null,
          recommendedDocument: "nip-response",
        },
        {
          id: "speeding-q1-unsure",
          label: "I'm not sure when it was dated",
          description: "You can't confirm the exact timing",
          next: "speeding-q2",
        },
      ],
    },
    {
      id: "speeding-q2",
      text: "Was the NIP dated within 14 days of the alleged offence?",
      helpText:
        "The 14-day rule is strict. The NIP must be served on the registered keeper within 14 days of the alleged offence. 'Served' means it must arrive \u2014 not just be posted. If it arrived on day 15 or later, this is a valid procedural defence. Keep the envelope as evidence of the postmark date.",
      options: [
        {
          id: "speeding-q2-yes",
          label: "Yes",
          description: "The NIP was dated within 14 days",
          next: "speeding-q3",
        },
        {
          id: "speeding-q2-no",
          label: "No",
          description: "The NIP was dated after the 14-day window",
          next: null,
          recommendedDocument: "nip-response",
        },
        {
          id: "speeding-q2-not-sure",
          label: "Not sure",
          description: "You can't tell from the documents",
          next: "speeding-q3",
        },
      ],
    },
    {
      id: "speeding-q3",
      text: "What would you like to do?",
      helpText:
        "Under common law, an offence requires an injured party. Speeding with no victim is a statutory offence \u2014 rules of the road, not natural law. You can request full evidence including calibration records and operator certification, or challenge on procedural grounds.",
      options: [
        {
          id: "speeding-q3-evidence",
          label: "Request all evidence (calibration records, operator certification)",
          description: "Compel them to disclose every piece of evidence before deciding",
          next: null,
          recommendedDocument: "subject-access-request",
        },
        {
          id: "speeding-q3-challenge",
          label: "Challenge on procedural or common law grounds",
          description: "Challenge the NIP on legal and procedural defences",
          next: null,
          recommendedDocument: "nip-response",
        },
      ],
    },
  ],
  startQuestionId: "speeding-q1",
};

export default speedingQuestionTree;
