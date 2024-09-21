"use client";

import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { useShoppingCart } from "@/_hooks/useShoppingCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { ItemContent } from "./ItemContent";
import { formatPrice } from "@/_utils/formatters";
import { useRouter } from "next/navigation";
import { User } from "next-auth";

type CartClientProps = {
  user: User | undefined;
};

export function CartClient({ user }: CartClientProps) {
  const { cartProducts, clearCart, cartTotalAmount } = useShoppingCart();
  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is empty</div>
        <div>
          <Link
            href={"/"}
            className="mt-2 flex items-center gap-1 text-slate-500"
          >
            <MdArrowBack />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="mt-4 grid grid-cols-5 items-center gap-4 pb-2 text-xs">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>

      <div>
        {cartProducts &&
          cartProducts.map((item) => <ItemContent key={item.id} item={item} />)}
      </div>

      <div className="flex justify-between gap-4 border-t-[1.5px] border-slate-200 py-4">
        <div className="w-[90px]">
          <Button onClick={clearCart} small outline>
            Clear Cart
          </Button>
        </div>

        <div className="flex flex-col items-start gap-1 text-sm">
          <div className="flex w-full justify-between text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount / 100)}</span>
          </div>

          <p className="text-slate-500">
            Taxes and shipping calculate at checkout
          </p>

          <Button
            outline={!user}
            onClick={() =>
              user ? router.push("/checkout") : router.push("/login")
            }
          >
            {user ? "Checkout" : "Login to Checkout"}
          </Button>

          {/* <Link href={user ? "/checkout" : "/login"}>
            {user ? "Checkout" : "Login to Checkout"}
          </Link> */}

          <Link
            href={"/"}
            className="mt-2 flex items-center gap-1 text-slate-500"
          >
            <MdArrowBack />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
