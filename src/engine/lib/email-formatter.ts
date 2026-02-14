import type {
  DocumentTemplateId,
  DemandCategory,
  UserDetails,
  EntityInfo,
} from "@/engine/types";
import { getTemplate } from "@/engine/data/document-templates";

interface FormatEmailParams {
  documentId: DocumentTemplateId;
  userDetails: UserDetails;
  entity: EntityInfo;
  answers: Record<string, string | string[]>;
  category: DemandCategory;
}

function replacePlaceholders(text: string, params: FormatEmailParams): string {
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
    .replace(/\{\{entityAddress\}\}/g, params.entity.address || "[Address]")
    .replace(/\{\{claimReference\}\}/g, params.userDetails.referenceNumber || "[Reference]")
    .replace(/\{\{claimAmount\}\}/g, "[Amount as stated]")
    .replace(/\{\{dateOfTheirLetter\}\}/g, "[Date of their correspondence]")
    .replace(/\{\{bailiffCompany\}\}/g, params.entity.name)
    .replace(/\{\{nipReference\}\}/g, params.userDetails.referenceNumber || "[NIP Reference]")
    .replace(/\{\{taxReference\}\}/g, params.userDetails.referenceNumber || "[Tax Reference]")
    .replace(/\{\{chargeReference\}\}/g, params.userDetails.referenceNumber || "[Charge Reference]")
    .replace(/\{\{\w+\}\}/g, "[To be completed]");
}

export function formatAsEmail(params: FormatEmailParams): {
  subject: string;
  body: string;
} {
  const template = getTemplate(params.documentId);

  let subject = "";
  const bodyParts: string[] = [];

  for (const section of template.sections) {
    const content = replacePlaceholders(section.content, params);

    switch (section.type) {
      case "header":
        bodyParts.push(content);
        bodyParts.push(""); // blank line
        break;

      case "subject":
        subject = content;
        bodyParts.push(`RE: ${content}`);
        bodyParts.push("");
        break;

      case "signature":
      case "rights-reservation":
        bodyParts.push(content);
        break;

      default:
        bodyParts.push(content);
        bodyParts.push("");
        break;
    }
  }

  return {
    subject: subject || `Formal Correspondence — ${template.name}`,
    body: bodyParts.join("\n"),
  };
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return success;
  }
}
