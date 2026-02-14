import type { QuestionTree } from "@/engine/types";

export const debtCollectorQuestionTree: QuestionTree = {
  categoryId: "debt-collector",
  questions: [
    {
      id: "debt-collector-q1",
      text: "What is the debt collector claiming?",
      helpText:
        "Knowing the original type of debt helps determine which regulations apply. Debt collectors act on behalf of or purchase debts from original creditors. They must be able to prove the chain of assignment \u2014 meaning they need documentation showing the debt was lawfully transferred to them.",
      options: [
        {
          id: "debt-collector-q1-council-tax",
          label: "Council tax",
          description: "Council tax arrears",
          next: "debt-collector-q2",
        },
        {
          id: "debt-collector-q1-energy-water",
          label: "Energy or water",
          description: "Gas, electricity, or water bill",
          next: "debt-collector-q2",
        },
        {
          id: "debt-collector-q1-credit",
          label: "Credit card or loan",
          description: "A bank, credit card, or personal loan",
          next: "debt-collector-q2",
        },
        {
          id: "debt-collector-q1-unknown",
          label: "Don't know / other",
          description: "You're not sure what the debt is for or it's a different type",
          next: "debt-collector-q2",
        },
      ],
    },
    {
      id: "debt-collector-q2",
      text: "Do you accept this debt is valid?",
      helpText:
        "Debt collectors rely on fear and urgency. Their actual power is limited. They cannot add charges without a court order. They cannot affect your credit file without a court judgment. They cannot visit your home with any special powers. The key question: can they prove the debt? Most can't.",
      options: [
        {
          id: "debt-collector-q2-dispute",
          label: "No \u2014 I dispute it",
          description: "You don't believe this debt is valid",
          next: null,
          recommendedDocument: "prove-the-debt",
        },
        {
          id: "debt-collector-q2-never-heard",
          label: "No \u2014 never heard of it",
          description: "This is the first you've heard of this debt",
          next: null,
          recommendedDocument: "prove-the-debt",
        },
        {
          id: "debt-collector-q2-dealt-with",
          label: "No \u2014 already dealt with",
          description: "You've already resolved this matter",
          next: null,
          recommendedDocument: "cease-and-desist",
        },
        {
          id: "debt-collector-q2-not-sure",
          label: "Not sure",
          description: "You're unsure whether this debt is valid",
          next: null,
          recommendedDocument: "prove-the-debt",
        },
      ],
    },
  ],
  startQuestionId: "debt-collector-q1",
};

export default debtCollectorQuestionTree;
