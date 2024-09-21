import { Container } from "@/components/Container";
import { CartClient } from "./_components/CartClient";
import { auth } from "@/auth";

export default async function Cart() {
  const user = (await auth())?.user;

  return (
    <div className="pt-8">
      <Container>
        <CartClient user={user} />
      </Container>
    </div>
  );
}
