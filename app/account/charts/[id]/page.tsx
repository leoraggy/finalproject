import { MyComponent } from "@/components/charts/chart-pie-donut-text";
import prisma from "@/lib/prisma";
import { Component } from "@/components/charts/bar-chart";
export default async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const accountId = parseInt(params.id);

  const chartData = [];
  let amount = 0;

  const merchandise = await prisma.transaction.findMany({
    where: { account_id: accountId, category: "Merchandise" },
  });
  for (let i = 0; i < merchandise.length; i++) {
    amount += merchandise[i].amount.toNumber();
  }
  chartData.push({
    category: "Merchandise",
    amount: amount,
    fill: "var(--color-merchandise)",
  });
  amount = 0;
  const entertainment = await prisma.transaction.findMany({
    where: { account_id: accountId, category: "Entertainment" },
  });
  for (let i = 0; i < entertainment.length; i++) {
    amount += entertainment[i].amount.toNumber();
  }
  chartData.push({
    category: "Entertainment",
    amount: amount,
    fill: "var(--color-entertainment)",
  });
  amount = 0;

  const restaurants = await prisma.transaction.findMany({
    where: { account_id: accountId, category: "Restaurants" },
  });
  for (let i = 0; i < restaurants.length; i++) {
    amount += restaurants[i].amount.toNumber();
  }
  chartData.push({
    category: "Restaurants",
    amount: amount,
    fill: "var(--color-restaurants)",
  });
  amount = 0;

  const supermarket = await prisma.transaction.findMany({
    where: { account_id: accountId, category: "Supermarket" },
  });
  for (let i = 0; i < supermarket.length; i++) {
    amount += supermarket[i].amount.toNumber();
  }
  chartData.push({
    category: "Supermarket",
    amount: amount,
    fill: "var(--color-gasoline)",
  });
  amount = 0;
  const other = await prisma.transaction.findMany({
    where: { account_id: accountId, category: "Other" },
  });
  for (let i = 0; i < other.length; i++) {
    amount += other[i].amount.toNumber();
  }
  chartData.push({
    category: "Other",
    amount: amount,
    fill: "var(--color-other)",
  });
  console.log(chartData);
  return (
    <div>
      <Component chartData={chartData}></Component>
      <MyComponent chartData={chartData}></MyComponent>
    </div>
  );
}
