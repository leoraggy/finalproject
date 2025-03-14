// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const account = await prisma.account.findUnique({
      where: { account_id: parseInt(id, 10) },
    });
    return NextResponse.json(account);
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
    const post = await prisma.account.update({
      where: { account_id: parseInt(id) },
      data: {
        account_name: updates.account_name,
        account_type: updates.account_type,
        balance: updates.balance,
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
    const { id } = params;

    // Delete the post with the specified ID
    const deleteUser = await prisma.account.delete({
      where: {
        account_id: parseInt(id),
      },
    });
    // Return success message (no content to return since it's deleted)
    return NextResponse.json({ message: "Account deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 404 }
    );
  }
}
