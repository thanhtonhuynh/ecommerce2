import { getGraphData } from "@/_data/getGraphData";
import { getOrders } from "@/_data/orders";
import { getProducts } from "@/_data/products";
import { getUsers } from "@/_data/users";
import { BarGraph } from "@/components/admin/BarGraph";
import { Summary } from "@/components/admin/Summary";
import { Container } from "@/components/Container";

export default async function AdminPage() {
  const [products, orders, users, graphData] = await Promise.all([
    getProducts({ searchTerm: "" }),
    getOrders(),
    getUsers(),
    getGraphData(),
  ]);

  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} orders={orders} users={users} />

        <div className="mx-auto mt-4 max-w-[700px]">
          <BarGraph data={graphData} />
        </div>
      </Container>
    </div>
  );
}
