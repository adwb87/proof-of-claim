import type { QuestionTree } from "@/engine/types";

export const waterQuestionTree: QuestionTree = {
  categoryId: "water",
  questions: [
    {
      id: "water-q1",
      text: "What stage is this demand at?",
      helpText:
        "Water companies in England and Wales are regional monopolies \u2014 you cannot switch supplier. However, they still must prove their charges are lawful and accurate. Crucially, water companies CANNOT disconnect your domestic water supply, no matter what they threaten.",
      options: [
        {
          id: "water-q1-first",
          label: "First contact \u2014 just received a bill",
          description: "You've just received a bill or demand for the first time",
          next: "water-q2",
        },
        {
          id: "water-q1-chasing",
          label: "They've been chasing \u2014 multiple letters",
          description: "You've received several letters or bills",
          next: "water-q2",
        },
        {
          id: "water-q1-debt-collector",
          label: "Passed to a debt collector",
          description: "A debt collection agency is now chasing you",
          next: null,
          recommendedDocument: "prove-the-debt",
        },
        {
          id: "water-q1-bailiff",
          label: "Enforcement/bailiff threats",
          description: "They've mentioned bailiffs or enforcement agents",
          next: null,
          recommendedDocument: "bailiff-non-entry",
        },
      ],
    },
    {
      id: "water-q2",
      text: "Did you personally sign up with this company?",
      helpText:
        "Water companies often claim you owe simply because you live at a property. But living somewhere does not mean you consented to a contract. If they obtained your details from a landlord, previous tenant, or property records without your knowledge, this raises serious GDPR questions.",
      options: [
        {
          id: "water-q2-signed",
          label: "Yes, I signed a contract",
          description: "You actively signed up with this water company",
          next: "__consent_signed__",
          recommendedDocument: "conditional-acceptance",
        },
        {
          id: "water-q2-no",
          label: "No \u2014 they were assigned to me or I never agreed",
          description: "They became your supplier without you choosing them",
          next: "__consent_no__",
          recommendedDocument: "gdpr-account-dispute",
        },
        {
          id: "water-q2-unsure",
          label: "I'm not sure",
          description: "You don't know how they became your supplier",
          next: "__consent_unsure__",
          recommendedDocument: "conditional-acceptance",
        },
      ],
    },
  ],
  startQuestionId: "water-q1",
};

export default waterQuestionTree;
