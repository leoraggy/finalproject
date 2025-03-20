import { MyComponent } from "@/components/charts/chart-pie-donut-text";
import prisma from "@/lib/prisma";
import { Component } from "@/components/charts/bar-chart";
export default async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const accountId = parseInt(params.id);

  const chartData = [];

  const categories = [
    "Merchandise",
    "Entertainment",
    "Restaurants",
    "Supermarket",
    "Other",
  ];
  const categoryColors: Record<string, string> = {
    Merchandise: "var(--color-merchandise)",
    Entertainment: "var(--color-entertainment)",
    Restaurants: "var(--color-restaurants)",
    Supermarket: "var(--color-gasoline)",
    Other: "var(--color-other)",
  };

  const results = await Promise.all(
    categories.map((category) =>
      prisma.transaction
        .findMany({
          where: { account_id: accountId, category },
        })
        .then((transactions) => ({
          category,
          amount: transactions.reduce(
            (sum, tx) => sum + tx.amount.toNumber(),
            0
          ),
          fill: categoryColors[category],
        }))
    )
  );

  // Push all processed data to chartData
  chartData.push(...results);

  return (
    <div>
      <Component chartData={chartData}></Component>
      <MyComponent chartData={chartData}></MyComponent>
    </div>
  );
}
