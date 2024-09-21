"use client";

import { User } from "@/_types";
import { formatNumber, formatPrice } from "@/_utils/formatters";
import { Order, Product } from "@prisma/client";
import { useEffect, useState } from "react";
import { Heading } from "../ui/Heading";

type SummaryProps = {
  orders: Order[];
  products: Product[];
  users: User[];
};

type SummaryData = {
  [key: string]: { label: string; value: number };
};

export function Summary({ orders, products, users }: SummaryProps) {
  const [summaryData, setSummaryData] = useState<SummaryData>({
    sale: { label: "Total Sale", value: 0 },
    products: { label: "Total Products", value: 0 },
    orders: { label: "Total Orders", value: 0 },
    paidOrders: { label: "Paid Orders", value: 0 },
    pendingOrders: { label: "Pending Orders", value: 0 },
    users: { label: "Total Users", value: 0 },
  });

  useEffect(() => {
    const paidOrders = orders.filter((order) => order.status === "complete");
    const pendingOrders = orders.filter((order) => order.status === "pending");
    const totalSale = orders.reduce((acc, order) => {
      return order.status === "complete" ? acc + order.amount : acc;
    }, 0);

    setSummaryData((prev) => ({
      ...prev,
      sale: { ...prev.sale, value: totalSale },
      products: { ...prev.products, value: products.length },
      orders: { ...prev.orders, value: orders.length },
      paidOrders: { ...prev.paidOrders, value: paidOrders.length },
      pendingOrders: { ...prev.pendingOrders, value: pendingOrders.length },
      users: { ...prev.users, value: users.length },
    }));
  }, [users, products, orders]);

  return (
    <div className="m-auto max-w-[1150px]">
      <div className="mb-4 mt-8">
        <Heading title="Stats" center />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(summaryData).map(([key, { label, value }]) => (
          <div
            key={key}
            className="flex flex-col items-center gap-2 rounded-xl p-4 shadow-md transition"
          >
            <div className="text-xl font-bold md:text-4xl">
              {key === "sale" ? formatPrice(value / 100) : formatNumber(value)}
            </div>
            <div className="text-sm text-gray-600">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
