import type { DocumentTemplate, DocumentTemplateId } from "@/engine/types";
import { conditionalAcceptance } from "./conditional-acceptance";
import { noticeOfDefault } from "./notice-of-default";
import { affidavitOfTruth } from "./affidavit-of-truth";
import { gdprAccountDispute } from "./gdpr-account-dispute";
import { subjectAccessRequest } from "./subject-access-request";
import { councilTaxDsar } from "./council-tax-dsar";
import { preWarrantChallenge } from "./pre-warrant-challenge";
import { bailiffNonEntry } from "./bailiff-non-entry";
import { warrantVerification } from "./warrant-verification";
import { proveTheDebt } from "./prove-the-debt";
import { ceaseAndDesist } from "./cease-and-desist";
import { nipResponse } from "./nip-response";
import { parkingDefence } from "./parking-defence";
import { hmrcConditionalAcceptance } from "./hmrc-conditional-acceptance";

export const DOCUMENT_TEMPLATES: Record<DocumentTemplateId, DocumentTemplate> = {
  "conditional-acceptance": conditionalAcceptance,
  "notice-of-default": noticeOfDefault,
  "affidavit-of-truth": affidavitOfTruth,
  "gdpr-account-dispute": gdprAccountDispute,
  "subject-access-request": subjectAccessRequest,
  "council-tax-dsar": councilTaxDsar,
  "pre-warrant-challenge": preWarrantChallenge,
  "bailiff-non-entry": bailiffNonEntry,
  "warrant-verification": warrantVerification,
  "prove-the-debt": proveTheDebt,
  "cease-and-desist": ceaseAndDesist,
  "nip-response": nipResponse,
  "parking-defence": parkingDefence,
  "hmrc-conditional-acceptance": hmrcConditionalAcceptance,
};

export function getTemplate(id: DocumentTemplateId): DocumentTemplate {
  return DOCUMENT_TEMPLATES[id];
}

export function getAllTemplates(): DocumentTemplate[] {
  return Object.values(DOCUMENT_TEMPLATES);
}
