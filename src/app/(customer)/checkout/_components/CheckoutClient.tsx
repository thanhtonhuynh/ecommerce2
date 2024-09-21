"use client";

import { useShoppingCart } from "@/_hooks/useShoppingCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { Button } from "@/components/ui/Button";
import { manageOrder } from "../_actions/create-order";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
);

export function CheckoutClient() {
  const { cartProducts, paymentIntent, setPaymentIntent } = useShoppingCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [orderId, setOrderId] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (cartProducts && cartProducts.length > 0) {
      setLoading(true);
      setError(false);

      const fetchPaymentIntent = async () => {
        const response = await manageOrder(cartProducts, paymentIntent);
        setLoading(false);

        if (response.error) {
          if (response.error === "Unauthorized") {
            return router.push("/login");
          }
          setError(true);
          toast.error(response.error);
          return;
        }

        if (response.paymentIntentId && response.clientSecret) {
          setClientSecret(response.clientSecret);
          setPaymentIntent(response.paymentIntentId);
          setOrderId(response.orderId);
        }
      };

      fetchPaymentIntent();
    }

    setPageLoaded(true);
  }, [cartProducts]);

  if (paymentSuccess) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-center text-teal-500">Payment Success</div>
        <div className="w-full max-w-[220px]">
          <Button onClick={() => router.push(`/order/${orderId}`)}>
            View Your Order
          </Button>
        </div>
      </div>
    );
  }

  if ((pageLoaded && !cartProducts) || cartProducts?.length === 0) {
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
    <div className="w-full">
      {loading && <div className="text-center">Loading Checkout...</div>}

      {error && (
        <div className="text-center text-rose-500">Something went wrong...</div>
      )}

      {clientSecret && cartProducts && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            clientSecret={clientSecret}
            setPaymentSuccess={setPaymentSuccess}
          />
        </Elements>
      )}

      {/* {paymentSuccess && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-center text-teal-500">Payment Success</div>
          <div className="w-full max-w-[220px]">
            <Button onClick={() => router.push("/orders")}>
              View Your Orders
            </Button>
          </div>
        </div>
      )} */}
    </div>
  );
}
