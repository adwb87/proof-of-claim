import type { QuestionTree } from "@/engine/types";

export const bailiffQuestionTree: QuestionTree = {
  categoryId: "bailiff",
  questions: [
    {
      id: "bailiff-q1",
      text: "What's happening?",
      helpText:
        "Stay calm. The golden rule: DO NOT let them in. Bailiffs cannot force entry for most debts on a first visit. Even with a warrant, they must follow strict procedures under the Taking Control of Goods Regulations 2013.",
      options: [
        {
          id: "bailiff-q1-warning-letter",
          label: "Letter warning of bailiff visit",
          description: "You've received a written notice of enforcement",
          next: "bailiff-q2",
        },
        {
          id: "bailiff-q1-specific-date",
          label: "Letter with a specific date",
          description: "A letter stating when bailiffs will attend",
          next: "bailiff-q2",
        },
        {
          id: "bailiff-q1-at-door",
          label: "Bailiff has visited or is at the door",
          description: "Enforcement agents are currently at or have been to your property",
          next: null,
          recommendedDocument: "bailiff-non-entry",
        },
        {
          id: "bailiff-q1-warrant",
          label: "They're claiming they have a warrant",
          description: "The bailiff says they hold a warrant to enter",
          next: null,
          recommendedDocument: "warrant-verification",
        },
      ],
    },
    {
      id: "bailiff-q2",
      text: "What's the underlying debt for?",
      helpText:
        "The type of debt determines what powers bailiffs have. For council tax, they need a liability order AND a warrant. For magistrates' court fines, they have greater powers. The powers differ significantly between debt types.",
      options: [
        {
          id: "bailiff-q2-council-tax",
          label: "Council tax",
          description: "Council tax arrears with a liability order",
          next: null,
          recommendedDocument: "bailiff-non-entry",
        },
        {
          id: "bailiff-q2-court-fine",
          label: "Court fine",
          description: "A fine issued by the Magistrates' Court",
          next: null,
          recommendedDocument: "warrant-verification",
        },
        {
          id: "bailiff-q2-hmrc",
          label: "HMRC",
          description: "Tax debt being enforced by HMRC",
          next: null,
          recommendedDocument: "bailiff-non-entry",
        },
        {
          id: "bailiff-q2-private",
          label: "Private debt",
          description: "A private or commercial debt",
          next: null,
          recommendedDocument: "bailiff-non-entry",
        },
        {
          id: "bailiff-q2-not-sure",
          label: "Not sure",
          description: "You're unsure what the underlying debt is for",
          next: null,
          recommendedDocument: "bailiff-non-entry",
        },
      ],
    },
  ],
  startQuestionId: "bailiff-q1",
};

export default bailiffQuestionTree;
