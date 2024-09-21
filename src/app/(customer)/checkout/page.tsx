import { Container } from "@/components/Container";
import { FormWrap } from "@/components/FormWrap";
import { CheckoutClient } from "./_components/CheckoutClient";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default function CheckoutPage() {
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <CheckoutClient />
        </FormWrap>
      </Container>
    </div>
  );
}
