import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.transaction.createMany({
    data: [
      {
        transaction_name: "T-Shirt Purchase",
        transaction_date: new Date(),
        category: "Merchandise",
        amount: 25.99,
        account_id: 1,
      },
      {
        transaction_name: "Concert Ticket",
        transaction_date: new Date(),
        category: "Entertainment",
        amount: 50.0,
        account_id: 1,
      },
      {
        transaction_name: "Fast Food Lunch",
        transaction_date: new Date(),
        category: "Restaurants",
        amount: 12.99,
        account_id: 1,
      },
      {
        transaction_name: "Grocery Shopping",
        transaction_date: new Date(),
        category: "Supermarket",
        amount: 85.75,
        account_id: 1,
      },
      {
        transaction_name: "Charity Donation",
        transaction_date: new Date(),
        category: "Other",
        amount: 100.0,
        account_id: 1,
      },
      {
        transaction_name: "Sneakers Purchase",
        transaction_date: new Date(),
        category: "Merchandise",
        amount: 120.0,
        account_id: 1,
      },
      {
        transaction_name: "Movie Night",
        transaction_date: new Date(),
        category: "Entertainment",
        amount: 30.0,
        account_id: 1,
      },
      {
        transaction_name: "Dinner at Steakhouse",
        transaction_date: new Date(),
        category: "Restaurants",
        amount: 75.5,
        account_id: 1,
      },
      {
        transaction_name: "Weekly Groceries",
        transaction_date: new Date(),
        category: "Supermarket",
        amount: 65.25,
        account_id: 1,
      },
      {
        transaction_name: "Gift Purchase",
        transaction_date: new Date(),
        category: "Other",
        amount: 45.99,
        account_id: 1,
      },
      {
        transaction_name: "Clothing Store",
        transaction_date: new Date(),
        category: "Merchandise",
        amount: 89.5,
        account_id: 1,
      },
      {
        transaction_name: "Theme Park Admission",
        transaction_date: new Date(),
        category: "Entertainment",
        amount: 120.0,
        account_id: 1,
      },
      {
        transaction_name: "Coffee Shop",
        transaction_date: new Date(),
        category: "Restaurants",
        amount: 8.25,
        account_id: 1,
      },
      {
        transaction_name: "Supermarket Essentials",
        transaction_date: new Date(),
        category: "Supermarket",
        amount: 40.0,
        account_id: 1,
      },
      {
        transaction_name: "Online Subscription",
        transaction_date: new Date(),
        category: "Other",
        amount: 9.99,
        account_id: 1,
      },
      {
        transaction_name: "Hoodie Purchase",
        transaction_date: new Date(),
        category: "Merchandise",
        amount: 55.99,
        account_id: 1,
      },
      {
        transaction_name: "Broadway Show",
        transaction_date: new Date(),
        category: "Entertainment",
        amount: 200.0,
        account_id: 1,
      },
      {
        transaction_name: "Sushi Dinner",
        transaction_date: new Date(),
        category: "Restaurants",
        amount: 90.0,
        account_id: 1,
      },
      {
        transaction_name: "Monthly Grocery Run",
        transaction_date: new Date(),
        category: "Supermarket",
        amount: 150.75,
        account_id: 1,
      },
      {
        transaction_name: "Car Wash",
        transaction_date: new Date(),
        category: "Other",
        amount: 20.0,
        account_id: 1,
      },
    ],
  });

  console.log("Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
