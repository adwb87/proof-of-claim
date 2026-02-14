import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/cases - List cases for authenticated user
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cases = await prisma.case.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            documents: true,
            responses: true,
          },
        },
      },
    });

    return NextResponse.json(cases);
  } catch (error) {
    console.error("Failed to fetch cases:", error);
    return NextResponse.json(
      { error: "Failed to fetch cases" },
      { status: 500 }
    );
  }
}

// POST /api/cases - Create a new case
export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      category,
      entityName,
      entityAddress,
      referenceNumber,
      recommendedDocument,
      answers,
    } = body;

    if (!category || !entityName || !recommendedDocument || !answers) {
      return NextResponse.json(
        { error: "Missing required fields: category, entityName, recommendedDocument, answers" },
        { status: 400 }
      );
    }

    const newCase = await prisma.case.create({
      data: {
        userId: session.user.id,
        category,
        entityName,
        entityAddress: entityAddress ?? null,
        referenceNumber: referenceNumber ?? null,
        recommendedDocument,
        answers,
        timeline: {
          create: {
            eventType: "case_created",
            title: "Case created",
          },
        },
      },
      include: {
        timeline: true,
      },
    });

    return NextResponse.json(newCase, { status: 201 });
  } catch (error) {
    console.error("Failed to create case:", error);
    return NextResponse.json(
      { error: "Failed to create case" },
      { status: 500 }
    );
  }
}
