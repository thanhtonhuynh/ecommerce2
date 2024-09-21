import { Container } from "@/components/Container";
import { ProductDetails } from "./_components/ProductDetails";
import { ListRating } from "./_components/ListRating";
import db from "@/_db/prisma";
import { ErrorBox } from "@/components/ErrorBox";
import { GoBackButton } from "@/components/GoBackButton";
import { RatingForm } from "./_components/RatingForm";
import { getUser } from "@/_libs/dal";

type ProductProps = {
  params: {
    productId: string;
  };
};

export default async function ProductDetailsPage({
  params: { productId },
}: ProductProps) {
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      reviews: {
        include: {
          user: {
            select: { name: true, email: true, id: true, image: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!product) {
    return <ErrorBox title="ERROR!" message="Product not found." />;
  }

  const user = await getUser();

  return (
    <div className="px-8 py-4">
      <GoBackButton>Go back</GoBackButton>

      <Container>
        <ProductDetails product={product} />

        <div className="mt-20 flex flex-col gap-4">
          <RatingForm product={product} user={user} />

          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
}
