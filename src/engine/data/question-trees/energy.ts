import type { QuestionTree } from "@/engine/types";

export const energyQuestionTree: QuestionTree = {
  categoryId: "energy",
  questions: [
    {
      id: "energy-q1",
      text: "What stage is this demand at?",
      helpText:
        "Understanding the stage helps determine the right approach. Earlier stages give you more options, but even late-stage demands can be challenged if proper process wasn't followed.",
      options: [
        {
          id: "energy-q1-first",
          label: "First contact \u2014 just received a bill",
          description: "You've just received a bill or demand for the first time",
          next: "energy-q2",
        },
        {
          id: "energy-q1-chasing",
          label: "They've been chasing \u2014 multiple letters",
          description: "You've received several letters or bills",
          next: "energy-q2",
        },
        {
          id: "energy-q1-debt-collector",
          label: "Passed to a debt collector",
          description: "A debt collection agency is now chasing you",
          next: null,
          recommendedDocument: "prove-the-debt",
        },
        {
          id: "energy-q1-bailiff",
          label: "Enforcement/bailiff threats",
          description: "They've mentioned bailiffs or enforcement agents",
          next: null,
          recommendedDocument: "bailiff-non-entry",
        },
      ],
    },
    {
      id: "energy-q2",
      text: "Did you personally sign up with this company?",
      helpText:
        "Energy companies often supply properties under 'deemed contracts' \u2014 meaning you never actually agreed to their terms. A deemed contract is significantly weaker than a signed agreement and can be challenged.",
      options: [
        {
          id: "energy-q2-signed",
          label: "Yes, I signed a contract",
          description: "You actively chose this supplier and agreed to terms",
          next: "__consent_signed__",
          recommendedDocument: "conditional-acceptance",
        },
        {
          id: "energy-q2-no",
          label: "No \u2014 they were assigned to me or I never agreed",
          description: "They became your supplier without you choosing them",
          next: "__consent_no__",
          recommendedDocument: "gdpr-account-dispute",
        },
        {
          id: "energy-q2-unsure",
          label: "I'm not sure",
          description: "You don't know how they became your supplier",
          next: "__consent_unsure__",
          recommendedDocument: "conditional-acceptance",
        },
      ],
    },
  ],
  startQuestionId: "energy-q1",
};

export default energyQuestionTree;
