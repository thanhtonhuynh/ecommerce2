import { Container } from "@/components/Container";
import { ManageProductsClient } from "./_components/ManageProductsClient";
import { getProducts } from "@/_data/products";

export default async function ManageProductsPage() {
  const products = await getProducts({ searchTerm: "" });

  return (
    <div className="pt-8">
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  );
}
