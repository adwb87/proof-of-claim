import type { QuestionTree } from "@/engine/types";

export const councilTaxQuestionTree: QuestionTree = {
  categoryId: "council-tax",
  questions: [
    {
      id: "council-tax-q1",
      text: "What stage is the council tax demand?",
      helpText:
        "A liability order is a court order that says you owe council tax. However, many are obtained in bulk without proper verification. Councils often apply for hundreds of liability orders in a single hearing, sometimes lasting only minutes \u2014 meaning individual cases may not have been properly considered.",
      options: [
        {
          id: "council-tax-q1-bill",
          label: "Bill received, haven't paid",
          description: "A regular council tax bill or annual demand",
          next: "council-tax-q2",
        },
        {
          id: "council-tax-q1-reminder",
          label: "Reminder or final notice",
          description: "A reminder or final notice for payment",
          next: "council-tax-q2",
        },
        {
          id: "council-tax-q1-summons",
          label: "Court summons received",
          description: "You've received a summons to the Magistrates' Court",
          next: null,
          recommendedDocument: "pre-warrant-challenge",
        },
        {
          id: "council-tax-q1-liability-order",
          label: "They claim a liability order exists",
          description: "The council says a liability order has been granted against you",
          next: null,
          recommendedDocument: "council-tax-dsar",
        },
        {
          id: "council-tax-q1-bailiff",
          label: "Bailiff involvement",
          description: "Bailiffs or enforcement agents have been instructed",
          next: null,
          recommendedDocument: "bailiff-non-entry",
        },
        {
          id: "council-tax-q1-attachment",
          label: "Attachment of earnings or charging order threat",
          description: "They're threatening to deduct from wages or charge your property",
          next: null,
          recommendedDocument: "pre-warrant-challenge",
        },
      ],
    },
    {
      id: "council-tax-q2",
      text: "Has the council proved you're the liable person?",
      helpText:
        "Council tax liability is determined by who occupies a property, not necessarily the owner. The hierarchy of liability is set out in Section 6 of the Local Government Finance Act 1992. If you're not the liable person, you should not be paying.",
      options: [
        {
          id: "council-tax-q2-no-proof",
          label: "No / They haven't proved it",
          description: "They haven't demonstrated you are the liable person",
          next: null,
          recommendedDocument: "council-tax-dsar",
        },
        {
          id: "council-tax-q2-banding",
          label: "I want them to prove the banding is correct",
          description: "You believe the banding or calculations are incorrect",
          next: null,
          recommendedDocument: "conditional-acceptance",
        },
        {
          id: "council-tax-q2-see-order",
          label: "I want to see the liability order",
          description: "You want proof that a valid liability order exists",
          next: null,
          recommendedDocument: "council-tax-dsar",
        },
      ],
    },
  ],
  startQuestionId: "council-tax-q1",
};

export default councilTaxQuestionTree;
