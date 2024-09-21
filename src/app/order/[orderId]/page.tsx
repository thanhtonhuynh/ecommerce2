import { Container } from "@/components/Container";
import db from "@/_db/prisma";
import { OrderDetails } from "./_components/OrderDetails";
import { ErrorBox } from "@/components/ErrorBox";
import { GoBackButton } from "@/components/GoBackButton";

async function getOrder(orderId: string) {
  try {
    return await db.order.findUnique({
      where: { id: orderId },
    });
  } catch (error) {
    return null;
  }
}

type OrderDetailsPageProps = {
  params: {
    orderId: string;
  };
};

export default async function OrderDetailsPage({
  params: { orderId },
}: OrderDetailsPageProps) {
  const order = await getOrder(orderId);

  if (!order) {
    return (
      <div className="m-auto flex flex-col items-center">
        <ErrorBox
          title="ORDER NOT FOUND!"
          message="The order you are looking for does not exist."
        />
        <GoBackButton>Go back</GoBackButton>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
}
