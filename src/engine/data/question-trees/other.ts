import type { QuestionTree } from "@/engine/types";

export const otherQuestionTree: QuestionTree = {
  categoryId: "other",
  questions: [
    {
      id: "other-q1",
      text: "What stage is this demand at?",
      helpText:
        "Understanding the stage helps determine the right approach. Earlier stages give you more options, but even late-stage demands can be challenged if proper process wasn't followed.",
      options: [
        {
          id: "other-q1-first",
          label: "First contact",
          description: "You've just received a demand for the first time",
          next: "other-q2",
        },
        {
          id: "other-q1-chasing",
          label: "They've been chasing",
          description: "You've received multiple letters or demands",
          next: "other-q2",
        },
        {
          id: "other-q1-debt-collector",
          label: "Debt collector involved",
          description: "A debt collection agency is now pursuing you",
          next: null,
          recommendedDocument: "prove-the-debt",
        },
        {
          id: "other-q1-legal",
          label: "Legal threats",
          description: "They're threatening legal or court action",
          next: null,
          recommendedDocument: "cease-and-desist",
        },
      ],
    },
    {
      id: "other-q2",
      text: "Did you sign a contract or agreement with them?",
      helpText:
        "A valid contract requires four elements: offer, acceptance, consideration, and consent. If any of these is missing, no contract exists. The burden of proof lies with the party making the claim \u2014 it is not your job to prove you don't owe; it is their job to prove you do.",
      options: [
        {
          id: "other-q2-signed",
          label: "Yes",
          description: "You signed a contract or agreement",
          next: "__consent_signed__",
          recommendedDocument: "conditional-acceptance",
        },
        {
          id: "other-q2-no",
          label: "No",
          description: "You never signed anything with them",
          next: "__consent_no__",
          recommendedDocument: "conditional-acceptance",
        },
        {
          id: "other-q2-unsure",
          label: "Not sure",
          description: "You can't remember or aren't certain",
          next: "__consent_unsure__",
          recommendedDocument: "conditional-acceptance",
        },
      ],
    },
  ],
  startQuestionId: "other-q1",
};

export default otherQuestionTree;
