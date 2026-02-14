import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/cases/[caseId]/responses - Log a response
export async function POST(
  request: Request,
  { params }: { params: Promise<{ caseId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { caseId } = await params;
    const body = await request.json();
    const { responseType, summary, nextAction } = body;

    if (!responseType || !summary) {
      return NextResponse.json(
        { error: "Missing required fields: responseType, summary" },
        { status: 400 }
      );
    }

    // Verify case exists and belongs to user
    const existingCase = await prisma.case.findUnique({
      where: { id: caseId },
    });

    if (!existingCase) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    if (existingCase.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Create response, update case status, and create timeline event in a transaction
    const [caseResponse] = await prisma.$transaction([
      prisma.caseResponse.create({
        data: {
          caseId,
          responseType,
          summary,
          nextAction: nextAction ?? null,
        },
      }),
      prisma.case.update({
        where: { id: caseId },
        data: { status: "RESPONSE_RECEIVED" },
      }),
      prisma.timelineEvent.create({
        data: {
          caseId,
          eventType: "response_received",
          title: `Response received: ${responseType}`,
          detail: summary,
        },
      }),
    ]);

    return NextResponse.json(caseResponse, { status: 201 });
  } catch (error) {
    console.error("Failed to log response:", error);
    return NextResponse.json(
      { error: "Failed to log response" },
      { status: 500 }
    );
  }
}
