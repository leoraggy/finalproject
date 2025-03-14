import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const accounts = await prisma.account.findMany();
    return NextResponse.json(accounts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch accounts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const newAccounts = await prisma.account.create({
      data: body,
    });
    return NextResponse.json(newAccounts, { status: 201 });
  } catch (error) {
    console.error("Error creating account:", error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
