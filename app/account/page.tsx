import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export default async function page() {
  const session = await getServerSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  async function deleteAccount(id: number) {
    "use server";
    await prisma.account.delete({
      where: {
        account_id: id,
      },
    });
    redirect(`/account/${id}`);
  }

  const accounts = await prisma.account.findMany();
  return (
    <div>
      <h1 className="text-3xl max-w-2xl mx-auto">Account Summary</h1>
      {accounts.map((account) => (
        <div className="max-w-2xl mx-auto" key={account.account_id}>
          <Table>
            <TableBody>
              <TableRow className="border-2">
                <TableCell className="border-l-2 border-b-2 border-t-2">
                  <Link
                    className="hover:underline text-xl"
                    key={account.account_id}
                    href={`/account/${account.account_id}`}
                  >
                    {account.account_name}'s {account.account_type}
                  </Link>
                </TableCell>
                <TableCell className="text-right border-b-2 border-t-2 text-xl">
                  ${account.balance.toString()}
                </TableCell>
                <td className="border-r-2 border-b-2 border-t-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Link href={`/account/edit/${account.account_id}`}>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ))}
      <div className="max-w-2xl mx-auto">
        <Link
          className={buttonVariants({ variant: "outline" })}
          href="/account/create"
        >
          Open a new account
        </Link>
      </div>
    </div>
  );
}
