import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function page() {
  const session = await getServerSession();
  if (!session) {
    redirect("/api/auth/signin");
  }

  const accounts = await prisma.account.findMany();
  return (
    <div>
      <h1>This is the account page.</h1>
      {accounts.map((account) => (
        <div key={account.account_id}>
          <Link
            className={buttonVariants({ variant: "outline" })}
            key={account.account_id}
            href={`/account/${account.account_id}`}
          >
            {account.account_name} {account.account_type}{" "}
            {account.balance.toString()}
          </Link>
        </div>
      ))}
      <Link
        className={buttonVariants({ variant: "outline" })}
        href="/account/create"
      >
        Open a new account
      </Link>
    </div>
  );
}
