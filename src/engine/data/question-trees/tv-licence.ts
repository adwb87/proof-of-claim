import type { QuestionTree } from "@/engine/types";

export const tvLicenceQuestionTree: QuestionTree = {
  categoryId: "tv-licence",
  questions: [
    {
      id: "tv-licence-q1",
      text: "What have you received?",
      helpText:
        "TV Licensing sends millions of letters every year, many of which use intimidating language. These letters are generated automatically and are not evidence of any investigation. TV Licensing enforcement officers have NO right of entry to your home. They are not police officers and cannot force entry.",
      options: [
        {
          id: "tv-licence-q1-letter",
          label: "Threatening letter",
          description: "A letter warning of consequences or demanding payment",
          next: "tv-licence-q2",
        },
        {
          id: "tv-licence-q1-investigation",
          label: "Investigation notice",
          description: "A letter claiming an investigation has been opened",
          next: "tv-licence-q2",
        },
        {
          id: "tv-licence-q1-visit",
          label: "Visit scheduled or someone came to door",
          description: "An enforcement officer visited or a visit has been scheduled",
          next: "tv-licence-q2",
        },
        {
          id: "tv-licence-q1-court",
          label: "Court summons",
          description: "You've received a summons to appear in court",
          next: null,
          recommendedDocument: "conditional-acceptance",
        },
      ],
    },
    {
      id: "tv-licence-q2",
      text: "What do you want to do?",
      helpText:
        "TV Licensing is operated by Capita, a private company. Their 'enforcement officers' have NO special powers. They cannot enter your home without your permission. They cannot force you to answer questions. The threatening letters are automated scare tactics sent to every unlicensed address.",
      options: [
        {
          id: "tv-licence-q2-declare",
          label: "Declare no licence needed",
          description: "You want to formally declare you don't need a TV licence",
          next: null,
          recommendedDocument: "conditional-acceptance",
        },
        {
          id: "tv-licence-q2-door-script",
          label: "Get a door response script",
          description: "You want guidance on what to say if they come to your door",
          next: null,
          recommendedDocument: "conditional-acceptance",
        },
        {
          id: "tv-licence-q2-court-response",
          label: "I need a court summons response",
          description: "You need to respond to a court summons",
          next: null,
          recommendedDocument: "conditional-acceptance",
        },
      ],
    },
  ],
  startQuestionId: "tv-licence-q1",
};

export default tvLicenceQuestionTree;
