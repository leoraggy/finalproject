import Form from "next/form";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function page() {
  const accounts = await prisma.account.findMany();

  async function createTransaction(formData: FormData) {
    "use server";

    const transactionName = formData.get("transactionName") as string;
    const transaction_date_str = formData.get("transactionDate") as string;
    const transactionDate = new Date(transaction_date_str);
    const category = formData.get("category") as string;
    const amount = parseFloat(formData.get("amount") as string);
    const account_id = parseInt(formData.get("accountId") as string);

    await prisma.transaction.create({
      data: {
        transaction_name: transactionName,
        transaction_date: transactionDate,
        category: category,
        amount: amount,
        account_id: account_id,
      },
    });

    revalidatePath(`/account/${account_id}`);
    redirect(`/account/${account_id}`);
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add Transaction</h1>
      <Form action={createTransaction} className="space-y-6">
        <div>
          <label htmlFor="transactionName" className="block text-lg mb-2">
            Transaction Name
          </label>
          <input
            type="text"
            id="transactionName"
            name="transactionName"
            placeholder="Enter name"
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
            placeholder="Please enter amount."
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <label htmlFor="accountId" className="block text-lg mb-2">
          Select Account
        </label>
        <select name="accountId" id="accountId">
          {accounts.map((account) => (
            <option key={account.account_id} value={account.account_id}>
              Account: {account.account_name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Add Transaction
        </button>
      </Form>
    </div>
  );
}
