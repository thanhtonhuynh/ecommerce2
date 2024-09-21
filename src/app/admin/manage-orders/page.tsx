import { Container } from "@/components/Container";
import { ManageOrdersClient } from "./_components/ManageOrdersClient";
import { getOrders } from "@/_data/orders";

export default async function ManageOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="pt-8">
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
}
