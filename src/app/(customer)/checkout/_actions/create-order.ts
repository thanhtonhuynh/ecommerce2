"use server";

import { auth } from "@/auth";
import db from "@/_db/prisma";
import { CartProductType } from "@/_types";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  typescript: true,
  apiVersion: "2024-06-20",
});

function calculateOrderAmount(items: CartProductType[]) {
  const totalPrice = items.reduce((total, item) => {
    const itemTotal = item.price * item.quantity;
    return total + itemTotal;
  }, 0);

  return totalPrice;
}

export async function manageOrder(
  items: CartProductType[],
  payment_intent_id: string,
) {
  const session = await auth();
  if (!session?.user) return { error: "Please log in to place an order." };

  const total = calculateOrderAmount(items);

  const orderData = {
    user: { connect: { id: session.user.id } },
    amount: total,
    currency: "cad",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };

  if (payment_intent_id) {
    const currentPaymentIntent =
      await stripe.paymentIntents.retrieve(payment_intent_id);

    if (currentPaymentIntent) {
      const updatedPaymentIntent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total },
      );

      const existingOrder = await db.order.findUnique({
        where: { paymentIntentId: payment_intent_id },
      });

      if (!existingOrder) {
        return { error: "Can't find order with this payment intent." };
      }

      const order = await db.order.update({
        where: { paymentIntentId: payment_intent_id },
        data: { amount: total, products: items },
      });

      return {
        paymentIntentId: updatedPaymentIntent.id,
        clientSecret: updatedPaymentIntent.client_secret,
        orderId: order.id,
      };
    } else {
      return { error: "Invalid payment intent." };
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "cad",
    });

    orderData.paymentIntentId = paymentIntent.id;

    const order = await db.order.create({ data: orderData });

    return {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret!,
      orderId: order.id,
    };
  }
}
