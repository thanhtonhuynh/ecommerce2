"use client";

import { useShoppingCart } from "@/_hooks/useShoppingCart";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

export function CartCount() {
  const { cartTotalQuantity } = useShoppingCart();

  return (
    <Link href={`/cart`} className="relative">
      <ShoppingCartIcon />
      <span className="absolute -right-5 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 text-sm font-bold text-white">
        {cartTotalQuantity}
      </span>
    </Link>
  );
}
