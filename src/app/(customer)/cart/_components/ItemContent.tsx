"use client";

import { ProductQuantity } from "@/app/(customer)/product/[productId]/_components/ProductQuantity";
import { useShoppingCart } from "@/_hooks/useShoppingCart";
import { CartProductType } from "@/_types";
import { formatPrice } from "@/_utils/formatters";
import { truncateText } from "@/_utils/truncateText";
import Image from "next/image";
import Link from "next/link";

type ItemContentProps = {
  item: CartProductType;
};

export function ItemContent({ item }: ItemContentProps) {
  const { removeProductFromCart, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();

  return (
    <div className="grid grid-cols-5 items-center gap-4 border-t-[1.5px] border-slate-200 py-4 text-xs md:text-sm">
      <div className="col-span-2 flex gap-2 justify-self-start md:gap-4">
        <Link href={`/products/${item.id}`}>
          <div className="relative aspect-square w-[70px]">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              className="object-contain"
              fill
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
          <div>{item.selectedImg.color}</div>
          <div className="w-[70px]">
            <button
              className="text-slate-500 underline"
              onClick={() => removeProductFromCart(item)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price / 100)}</div>
      <div className="justify-self-center">
        <ProductQuantity
          cartCounter
          cartProduct={item}
          handleQuantityIncrease={() => increaseCartQuantity(item.id)}
          handleQuantityDecrease={() => decreaseCartQuantity(item.id)}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatPrice((item.price * item.quantity) / 100)}
      </div>
    </div>
  );
}
