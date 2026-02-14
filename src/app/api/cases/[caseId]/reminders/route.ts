import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/cases/[caseId]/reminders - Create a reminder
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
    const { dueDate, title } = body;

    if (!dueDate || !title) {
      return NextResponse.json(
        { error: "Missing required fields: dueDate, title" },
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

    // Create reminder and timeline event in a transaction
    const [reminder] = await prisma.$transaction([
      prisma.reminder.create({
        data: {
          caseId,
          dueDate: new Date(dueDate),
          title,
        },
      }),
      prisma.timelineEvent.create({
        data: {
          caseId,
          eventType: "reminder_set",
          title: `Reminder set: ${title}`,
          detail: `Due: ${new Date(dueDate).toLocaleDateString("en-GB")}`,
        },
      }),
    ]);

    return NextResponse.json(reminder, { status: 201 });
  } catch (error) {
    console.error("Failed to create reminder:", error);
    return NextResponse.json(
      { error: "Failed to create reminder" },
      { status: 500 }
    );
  }
}
