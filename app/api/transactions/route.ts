import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany();
    return NextResponse.json(transactions);
  } catch (error) {
    // Return error message
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
  } catch (error: any) {
    console.error("Error creating transaction:", error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
