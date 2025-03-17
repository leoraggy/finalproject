"use client";

import { useState, useEffect, use } from "react";
import { DataTable } from "@/components/transaction-table/data-table";
import { columns } from "@/components/transaction-table/column";
import { DTransaction } from "@/lib";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [transactions, setTransactions] = useState<DTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };
  useEffect(() => {
    fetchTransactions(id);
  }, [id, transactions]);

  const fetchTransactions = async (accountId: string) => {
    try {
      const response = await fetch(`/api/transactions/account/${accountId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to fetch transactions");
      }
      const formattedTransactions = data.map((transaction: DTransaction) => ({
        ...transaction,
        transaction_date: formatDate(transaction.transaction_date), // Assuming each transaction has a `date` field
      }));

      setTransactions(formattedTransactions);
    } catch (error) {
      setError("Failed to load transactions");
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DataTable columns={columns} data={transactions} />
      <Link className={buttonVariants({ variant: "outline" })} href="/account">
        Go Back
      </Link>
      <Link
        className={buttonVariants({ variant: "outline" })}
        href="/transactions/create"
      >
        Add a transaction
      </Link>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
