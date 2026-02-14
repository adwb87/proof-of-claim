import type { QuestionTree } from "@/engine/types";

export const privateParkingQuestionTree: QuestionTree = {
  categoryId: "private-parking",
  questions: [
    {
      id: "private-parking-q1",
      text: "What stage is this at?",
      helpText:
        "Private parking companies issue invoices, not fines. They have no special legal powers. The typical pattern: ticket \u2192 reminder \u2192 final notice \u2192 debt collection threat \u2192 legal warning \u2192 they give up. Most never actually go to court because they know they'd lose.",
      options: [
        {
          id: "private-parking-q1-just-received",
          label: "Just received the ticket",
          description: "You've just received a parking charge notice",
          next: "private-parking-q2",
        },
        {
          id: "private-parking-q1-reminders",
          label: "Reminder letters / chasers",
          description: "You've received follow-up letters demanding payment",
          next: "private-parking-q2",
        },
        {
          id: "private-parking-q1-debt-collection",
          label: "Debt collection threats",
          description: "A debt collection agency is now involved",
          next: "private-parking-q2",
        },
        {
          id: "private-parking-q1-court",
          label: "Actual court papers received",
          description: "You've received real court documents, not just letters threatening court",
          next: null,
          recommendedDocument: "parking-defence",
        },
      ],
    },
    {
      id: "private-parking-q2",
      text: "Recommended Response",
      helpText:
        "For most private parking charges, the recommended response is nothing. Don't appeal (it validates their process). Don't pay. Don't engage. They rely on intimidation. If actual court papers arrive \u2014 real ones from a court, not letters threatening court \u2014 that's when you respond.",
      options: [
        {
          id: "private-parking-q2-understood",
          label: "I understand \u2014 no document needed",
          description: "You'll ignore the parking charge as recommended",
          next: null,
        },
        {
          id: "private-parking-q2-want-document",
          label: "I want a document anyway",
          description: "You'd like to send a formal response regardless",
          next: null,
          recommendedDocument: "cease-and-desist",
        },
      ],
    },
  ],
  startQuestionId: "private-parking-q1",
};

export default privateParkingQuestionTree;
