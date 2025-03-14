// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const transaction = await prisma.transaction.findUnique({
      where: { transaction_id: parseInt(id, 10) },
    });
    return NextResponse.json(transaction);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 404 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updates = await request.json();
    const post = await prisma.transaction.update({
      where: { transaction_id: parseInt(id) },
      data: {
        transaction_name: updates.transaction_name,
        transaction_date: updates.transaction_date,
        category: updates.category,
        amount: updates.amount,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 404 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    // Delete the post with the specified ID
    const deleteUser = await prisma.transaction.delete({
      where: {
        transaction_id: parseInt(id),
      },
    });
    // Return success message (no content to return since it's deleted)
    return NextResponse.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 404 }
    );
  }
}
