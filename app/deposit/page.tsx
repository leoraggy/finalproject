import Form from "next/form";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
export default async function page() {
  const accounts = await prisma.account.findMany();

  async function deposit(formData: FormData) {
    "use server";

    const id = parseInt(formData.get("accounts") as string);
    const deposit_amount = parseFloat(formData.get("depositAmount") as string);

    await prisma.account.update({
      where: {
        account_id: id,
      },
      data: {
        balance: {
          increment: deposit_amount,
        },
      },
    });

    revalidatePath("/account");
    redirect("/account");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Deposit</h1>
      <Form action={deposit} className="space-y-6">
        <div>
          <label htmlFor="accounts" className="block text-lg mb-2">
            Select Account
          </label>
          <select
            name="accounts"
            id="accounts"
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value=""> Select Account</option>
            {accounts.map((account) => (
              <option key={account.account_id} value={account.account_id}>
                {account.account_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="depositAmount" className="block text-lg mb-2">
            Amount
          </label>
          <input
            type="number"
            id="depositAmount"
            name="depositAmount"
            placeholder="Please deposit an amount."
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Deposit
        </button>
      </Form>
    </div>
  );
}
