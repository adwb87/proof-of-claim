import type { QuestionTree } from "@/engine/types";

export const hmrcQuestionTree: QuestionTree = {
  categoryId: "hmrc",
  questions: [
    {
      id: "hmrc-q1",
      text: "What have you received?",
      helpText:
        "HMRC has broader powers than most creditors, but they must still follow due process. They must issue proper assessments and give you the right to appeal. Different types of HMRC demands have different rules.",
      options: [
        {
          id: "hmrc-q1-tax-return",
          label: "Tax return notice",
          description: "A notice to file a self-assessment tax return",
          next: "hmrc-q2",
        },
        {
          id: "hmrc-q1-assessment",
          label: "Assessment or bill",
          description: "A tax assessment or demand for payment",
          next: "hmrc-q2",
        },
        {
          id: "hmrc-q1-penalty",
          label: "Penalty notice",
          description: "A penalty for late filing, late payment, or other issue",
          next: "hmrc-q2",
        },
        {
          id: "hmrc-q1-payment",
          label: "Payment demand",
          description: "A demand for payment of an outstanding amount",
          next: "hmrc-q2",
        },
        {
          id: "hmrc-q1-enforcement",
          label: "Enforcement warning",
          description: "A warning of enforcement or bailiff action",
          next: null,
          recommendedDocument: "conditional-acceptance",
        },
      ],
    },
    {
      id: "hmrc-q2",
      text: "Employed (PAYE) or self-employed?",
      helpText:
        "This matters because PAYE issues are usually resolved through your employer's payroll, while self-employed matters involve direct assessments from HMRC that can be challenged differently.",
      options: [
        {
          id: "hmrc-q2-paye",
          label: "Employed (PAYE)",
          description: "You are employed and taxed through PAYE",
          next: null,
          recommendedDocument: "conditional-acceptance",
        },
        {
          id: "hmrc-q2-self-employed",
          label: "Self-employed",
          description: "You are self-employed and file self-assessment",
          next: null,
          recommendedDocument: "hmrc-conditional-acceptance",
        },
        {
          id: "hmrc-q2-both",
          label: "Both",
          description: "You have both employed and self-employed income",
          next: null,
          recommendedDocument: "hmrc-conditional-acceptance",
        },
        {
          id: "hmrc-q2-neither",
          label: "Neither / not sure",
          description: "You're not currently employed or unsure of your status",
          next: null,
          recommendedDocument: "conditional-acceptance",
        },
      ],
    },
  ],
  startQuestionId: "hmrc-q1",
};

export default hmrcQuestionTree;
