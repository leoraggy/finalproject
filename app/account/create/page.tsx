import Form from "next/form";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function page() {
  async function createAccount(formData: FormData) {
    "use server";

    const account_name = formData.get("accountName") as string;
    const account_type = formData.get("accountType") as string;
    const balance = parseFloat(formData.get("balance") as string);

    await prisma.account.create({
      data: {
        account_name: account_name,
        account_type: account_type,
        balance: balance,
      },
    });

    revalidatePath("/account");
    redirect("/account");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Open New Account</h1>
      <Form action={createAccount} className="space-y-6">
        <div>
          <label htmlFor="accountName" className="block text-lg mb-2">
            Account Name
          </label>
          <input
            type="text"
            id="accountName"
            name="accountName"
            placeholder="Enter your account name"
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
        <div>
          <label htmlFor="depositAmount" className="block text-lg mb-2">
            Amount
          </label>
          <input
            type="number"
            id="balance"
            name="balance"
            placeholder="Please deposit an amount."
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Create Account
        </button>
      </Form>
    </div>
  );
}
