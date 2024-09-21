"use client";

import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { useShoppingCart } from "@/_hooks/useShoppingCart";
import { formatPrice } from "@/_utils/formatters";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

type CheckoutFormProps = {
  clientSecret: string;
  setPaymentSuccess: (value: boolean) => void;
};

export function CheckoutForm({
  clientSecret,
  setPaymentSuccess,
}: CheckoutFormProps) {
  const { cartTotalAmount, clearCart, setPaymentIntent } = useShoppingCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const formattedPrice = formatPrice(cartTotalAmount / 100);

  useEffect(() => {
    if (!stripe) return;
    if (!clientSecret) return;
    setPaymentSuccess(false);
  }, [stripe, clientSecret, setPaymentSuccess]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout Success");

          clearCart();
          setPaymentSuccess(true);
          setPaymentIntent("");
        } else {
          setErrorMessage(result.error.message);
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      {errorMessage && (
        <div className="mb-4 text-sm text-red-500">{errorMessage}</div>
      )}

      <div className="mb-6">
        <Heading title="Enter your details to complete checkout" />
      </div>

      <h2 className="mb-2 mt-4 font-semibold">Address Information</h2>
      <AddressElement
        options={{ mode: "shipping", allowedCountries: ["US", "CA", "VN"] }}
      />

      <h2 className="mb-2 mt-4 font-semibold">Payment Information</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

      <div className="py-4 text-center text-xl font-bold text-slate-700">
        Total: {formattedPrice}
      </div>

      <Button disabled={isLoading || !stripe || !elements} type="submit">
        {isLoading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
}
