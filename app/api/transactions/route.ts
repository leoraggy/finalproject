import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany();
    return NextResponse.json(transactions);
  } catch (error: unknown) {
    // Type guard to ensure error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body) {
    return NextResponse.json({ error: "Body is required" }, { status: 400 });
  }
  try {
    const newTransactions = await prisma.transaction.create({
      data: body,
    });
    return NextResponse.json(newTransactions, { status: 201 });
  } catch (error: unknown) {
    // Type guard to ensure error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Unknown error occurred" },
      { status: 400 }
    );
  }
}
