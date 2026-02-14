import { NextResponse } from "next/server";
import { generateDocx } from "@/engine/lib/document-generator";
import type { DocumentTemplateId, DemandCategory } from "@/engine/types";

// POST /api/generate-document - Server-side document generation fallback
// No auth required — document generation works for guests too
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { templateId, userDetails, entityName, entityAddress, category } = body;

    if (!templateId || !userDetails?.fullName || !userDetails?.address || !entityName) {
      return NextResponse.json(
        { error: "Missing required fields: templateId, userDetails (fullName, address), entityName" },
        { status: 400 }
      );
    }

    const blob = await generateDocx({
      documentId: templateId as DocumentTemplateId,
      userDetails: {
        fullName: userDetails.fullName,
        address: userDetails.address,
        referenceNumber: userDetails.referenceNumber ?? "",
      },
      entity: {
        name: entityName,
        address: entityAddress,
      },
      answers: body.answers || {},
      category: (category || "other") as DemandCategory,
    });

    const arrayBuffer = await blob.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${templateId}.docx"`,
      },
    });
  } catch (error) {
    console.error("Failed to generate document:", error);
    return NextResponse.json(
      { error: "Failed to generate document" },
      { status: 500 }
    );
  }
}
