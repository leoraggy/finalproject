import Form from "next/form";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alertdialog";
export default async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const accountId = parseInt(params.id);

  const account = await prisma.account.findUnique({
    where: {
      account_id: accountId,
    },
  });

  async function editAccount(formData: FormData) {
    "use server";

    const account_name = formData.get("accountName") as string;
    const account_type = formData.get("accountType") as string;

    await prisma.account.update({
      where: {
        account_id: accountId,
      },
      data: {
        account_name: account_name,
        account_type: account_type,
      },
    });

    revalidatePath("/account");
    redirect("/account");
  }

  async function deleteAccount() {
    "use server";
    const deleteTransactions = prisma.transaction.deleteMany({
      where: {
        account_id: accountId,
      },
    });

    const deleteA = prisma.account.delete({
      where: {
        account_id: accountId,
      },
    });
    await prisma.$transaction([deleteTransactions, deleteA]);
    revalidatePath("/account");
    redirect("/account");
  }
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit</h1>
      <Form action={editAccount} className="space-y-6">
        <div>
          <label htmlFor="accountName" className="block text-lg mb-2">
            Account Name
          </label>
          <input
            type="text"
            id="accountName"
            name="accountName"
            placeholder={account?.account_name}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="accountType" className="block text-lg mb-2">
            Account Type
          </label>
          <select
            id="accountType"
            name="accountType"
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="Checking">Checking</option>
            <option value="Savings">Saving </option>
          </select>
        </div>
        <div></div>
        <button
          type="submit"
          className="h-9 px-4 has-[>svg]:px-3  bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save
        </button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action is irreversible. Deleting your account will
                permanently remove all associated transactions and data from our
                servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button onClick={deleteAccount}>Delete</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Form>
    </div>
  );
}
