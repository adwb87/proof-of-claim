import type { QuestionTree } from "@/engine/types";

export const councilParkingQuestionTree: QuestionTree = {
  categoryId: "council-parking",
  questions: [
    {
      id: "council-parking-q1",
      text: "What stage is this at?",
      helpText:
        "Council parking PCNs follow strict statutory procedures under the Traffic Management Act 2004. You have rights to challenge at each stage, including a free independent tribunal appeal. Unlike private parking, councils DO have statutory authority \u2014 but they must follow the rules.",
      options: [
        {
          id: "council-parking-q1-14days",
          label: "Within 14 days of receiving PCN",
          description: "You received the PCN recently and are within the 14-day discount window",
          next: "council-parking-q2",
        },
        {
          id: "council-parking-q1-14-28",
          label: "14\u201328 days",
          description: "Past the discount window but before Notice to Owner stage",
          next: "council-parking-q2",
        },
        {
          id: "council-parking-q1-nto",
          label: "Notice to Owner received",
          description: "A formal Notice to Owner has been sent to the registered keeper",
          next: "council-parking-q2",
        },
        {
          id: "council-parking-q1-charge-cert",
          label: "Charge Certificate issued",
          description: "A charge certificate has been issued, increasing the amount by 50%",
          next: null,
          recommendedDocument: "conditional-acceptance",
        },
        {
          id: "council-parking-q1-bailiff",
          label: "Debt recovery / bailiff stage",
          description: "Bailiffs or enforcement agents have been instructed",
          next: null,
          recommendedDocument: "bailiff-non-entry",
        },
      ],
    },
    {
      id: "council-parking-q2",
      text: "What are your grounds for challenge?",
      helpText:
        "Civil enforcement officers must follow strict procedures when issuing PCNs. Common grounds for challenge include incorrect signage, unclear road markings, observation period not met, or the contravention code not matching the actual situation. Photographic evidence is key.",
      options: [
        {
          id: "council-parking-q2-signage",
          label: "Signage was inadequate or missing",
          description: "The parking restrictions weren't properly signed or marked",
          next: null,
          recommendedDocument: "parking-defence",
        },
        {
          id: "council-parking-q2-no-contravention",
          label: "The contravention didn't occur",
          description: "You believe you were parked lawfully",
          next: null,
          recommendedDocument: "parking-defence",
        },
        {
          id: "council-parking-q2-procedural",
          label: "Procedural errors by the council",
          description: "The council didn't follow proper procedures",
          next: null,
          recommendedDocument: "parking-defence",
        },
        {
          id: "council-parking-q2-mitigating",
          label: "Mitigating circumstances",
          description: "There were circumstances beyond your control",
          next: null,
          recommendedDocument: "parking-defence",
        },
      ],
    },
  ],
  startQuestionId: "council-parking-q1",
};

export default councilParkingQuestionTree;
