import { getProducts } from "@/_data/products";
import { Container } from "@/components/Container";
import { HomeBanner } from "@/components/HomeBanner";
import { HomepageRedirect } from "@/components/HomepageRedirect";
import { ProductCard } from "@/components/ProductCard";

type HomeProps = {
  searchParams: {
    category: string;
    searchTerm: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts({
    ...searchParams,
    searchTerm: searchParams.searchTerm || "",
  });

  if (products.length === 0) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center font-medium">
        No products found. Click "All" to clear filters.
      </div>
    );
  }

  function shuffleProducts(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  const shuffledProducts = shuffleProducts(products);

  return (
    <>
      <HomepageRedirect />

      <div className="p-8">
        <Container>
          <div>
            <HomeBanner />
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {shuffledProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
