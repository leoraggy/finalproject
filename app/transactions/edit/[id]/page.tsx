import Form from "next/form";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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
import { Button } from "@/components/ui/button";

export default async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const transactionId = parseInt(params.id);

  const transaction = await prisma.transaction.findUnique({
    where: { transaction_id: transactionId },
  });
  async function updateTransaction(formData: FormData) {
    "use server";

    const transactionName = formData.get("transactionName") as string;
    const transaction_date_str = formData.get("transactionDate") as string;
    const transactionDate = new Date(transaction_date_str);
    const category = formData.get("category") as string;
    const amount = parseFloat(formData.get("amount") as string);

    await prisma.transaction.update({
      where: {
        transaction_id: transactionId,
      },
      data: {
        transaction_name: transactionName,
        transaction_date: transactionDate,
        category: category,
        amount: amount,
      },
    });

    revalidatePath(`/account/${transaction?.account_id}`);
    redirect(`/account/${transaction?.account_id}`);
  }

  async function deleteTransaction() {
    "use server";
    await prisma.transaction.delete({
      where: {
        transaction_id: transactionId,
      },
    });
    revalidatePath(`/account/${transaction?.account_id}`);
    redirect(`/account/${transaction?.account_id}`);
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add Transaction</h1>
      <Form action={updateTransaction} className="space-y-6">
        <div>
          <label htmlFor="transactionName" className="block text-lg mb-2">
            Transaction Name
          </label>
          <input
            type="text"
            id="transactionName"
            name="transactionName"
            placeholder={transaction?.transaction_name}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <label htmlFor="transactionDate" className="block text-lg mb-2">
          Transaction Date
        </label>
        <input type="date" id="transactionDate" name="transactionDate"></input>
        <div>
          <label htmlFor="category" className="block text-lg mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="Merchandise">Merchandise</option>
            <option value="Entertainment">Entertainment </option>
            <option value="Restaurants">Restaurants </option>
            <option value="Gasoline">Gasoline </option>
            <option value="Supermarket">Supermarket </option>
            <option value="Other">Other </option>
          </select>
        </div>
        <div>
          <label htmlFor="amount" className="block text-lg mb-2">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder={transaction?.amount.toString()}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
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
                This action is irreversible. Deleting this transaction will
                permanently be deleted from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button onClick={deleteTransaction}>Delete</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Form>
    </div>
  );
}
