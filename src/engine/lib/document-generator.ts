import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
} from "docx";
import type {
  DocumentTemplateId,
  DemandCategory,
  UserDetails,
  EntityInfo,
} from "@/engine/types";
import { getTemplate } from "@/engine/data/document-templates";

interface GenerateDocxParams {
  documentId: DocumentTemplateId;
  userDetails: UserDetails;
  entity: EntityInfo;
  answers: Record<string, string | string[]>;
  category: DemandCategory;
}

function replacePlaceholders(
  text: string,
  params: GenerateDocxParams
): string {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return text
    .replace(/\{\{date\}\}/g, today)
    .replace(/\{\{userName\}\}/g, params.userDetails.fullName)
    .replace(/\{\{userAddress\}\}/g, params.userDetails.address)
    .replace(/\{\{entityName\}\}/g, params.entity.name)
    .replace(/\{\{entityAddress\}\}/g, params.entity.address || "[Address to be confirmed]")
    .replace(/\{\{claimReference\}\}/g, params.userDetails.referenceNumber || "[Reference]")
    .replace(/\{\{claimAmount\}\}/g, "[Amount as stated]")
    .replace(/\{\{dateOfTheirLetter\}\}/g, "[Date of their correspondence]")
    .replace(/\{\{nipReference\}\}/g, params.userDetails.referenceNumber || "[NIP Reference]")
    .replace(/\{\{taxReference\}\}/g, params.userDetails.referenceNumber || "[Tax Reference]")
    .replace(/\{\{chargeReference\}\}/g, params.userDetails.referenceNumber || "[Charge Reference]")
    .replace(/\{\{bailiffCompany\}\}/g, params.entity.name)
    .replace(/\{\{dateOfVisitOrLetter\}\}/g, "[Date]")
    .replace(/\{\{allegedDate\}\}/g, "[Date of alleged offence]")
    .replace(/\{\{allegedLocation\}\}/g, "[Location]")
    .replace(/\{\{dateNipReceived\}\}/g, "[Date received]")
    .replace(/\{\{dateOfAllegedContravention\}\}/g, "[Date]")
    .replace(/\{\{locationOfParking\}\}/g, "[Location]")
    .replace(/\{\{reasonForChallenge\}\}/g, "[As detailed below]")
    .replace(/\{\{taxYear\}\}/g, "[Tax Year]")
    .replace(/\{\{dateOfDemand\}\}/g, "[Date of demand]")
    .replace(/\{\{originalCreditor\}\}/g, "[Original creditor]")
    .replace(/\{\{dateOfOriginalLetter\}\}/g, "[Date of first letter]")
    .replace(/\{\{previousLettersSummary\}\}/g, "[Summary of previous correspondence]")
    .replace(/\{\{additionalContext\}\}/g, "")
    .replace(/\{\{\w+\}\}/g, "[To be completed]");
}

function textToParagraphs(text: string, params: GenerateDocxParams): Paragraph[] {
  const resolved = replacePlaceholders(text, params);
  const lines = resolved.split("\n");
  const paragraphs: Paragraph[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      paragraphs.push(new Paragraph({ spacing: { after: 120 } }));
      continue;
    }

    // Numbered list items
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
    if (numberedMatch) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${numberedMatch[1]}. `, bold: true, font: "Times New Roman", size: 24 }),
            new TextRun({ text: numberedMatch[2], font: "Times New Roman", size: 24 }),
          ],
          spacing: { after: 120, before: 60 },
          indent: { left: 360 },
        })
      );
      continue;
    }

    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({ text: trimmed, font: "Times New Roman", size: 24 }),
        ],
        spacing: { after: 200 },
      })
    );
  }

  return paragraphs;
}

export async function generateDocx(params: GenerateDocxParams): Promise<Blob> {
  const template = getTemplate(params.documentId);
  const sections: Paragraph[] = [];

  for (const section of template.sections) {
    switch (section.type) {
      case "header": {
        const headerText = replacePlaceholders(section.content, params);
        const headerLines = headerText.split("\n");
        for (const line of headerLines) {
          if (!line.trim()) {
            sections.push(new Paragraph({ spacing: { after: 120 } }));
          } else {
            sections.push(
              new Paragraph({
                children: [
                  new TextRun({ text: line.trim(), font: "Times New Roman", size: 24 }),
                ],
                alignment: line.includes(params.userDetails.fullName) || line.includes(params.userDetails.address.split("\n")[0])
                  ? AlignmentType.RIGHT
                  : AlignmentType.LEFT,
                spacing: { after: 40 },
              })
            );
          }
        }
        sections.push(new Paragraph({ spacing: { after: 200 } }));
        break;
      }

      case "subject":
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: replacePlaceholders(section.content, params),
                bold: true,
                font: "Times New Roman",
                size: 24,
                underline: {},
              }),
            ],
            spacing: { after: 300, before: 200 },
          })
        );
        break;

      case "signature": {
        const sigText = replacePlaceholders(section.content, params);
        const sigLines = sigText.split("\n");
        for (const line of sigLines) {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line.trim(),
                  font: "Times New Roman",
                  size: 24,
                  italics: line.includes("Without prejudice"),
                }),
              ],
              spacing: { after: line.trim() === "" ? 200 : 80 },
            })
          );
        }
        break;
      }

      case "rights-reservation":
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: section.content,
                font: "Times New Roman",
                size: 20,
                italics: true,
              }),
            ],
            spacing: { before: 400 },
            border: {
              top: { style: BorderStyle.SINGLE, size: 1, space: 8, color: "999999" },
            },
          })
        );
        break;

      default:
        sections.push(...textToParagraphs(section.content, params));
        break;
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: sections,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  return blob;
}

export function downloadDocx(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
