import db from "@/_db/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  );

  if (event.type === "charge.succeeded") {
    const charge: any = event.data.object;

    if (typeof charge.payment_intent === "string") {
      await db.order.update({
        where: { paymentIntentId: charge.payment_intent },
        data: { status: "complete", address: charge.shipping?.address },
      });
    }
  }

  return new NextResponse();
}
