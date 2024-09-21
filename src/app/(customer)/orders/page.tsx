import { Container } from "@/components/Container";
import { OrdersClient } from "./_components/OrdersClient";
import db from "@/_db/prisma";
import { auth } from "@/auth";
import { ErrorBox } from "@/components/ErrorBox";

async function getOrdersByUserId(userId: string | undefined) {
  try {
    return await db.order.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    return null;
  }
}

export default async function OrdersPage() {
  const user = (await auth())?.user;
  const orders = await getOrdersByUserId(user?.id);

  if (orders === null) {
    return (
      <ErrorBox
        title="ERROR!"
        message="An error occurred while fetching your orders."
      />
    );
  }

  return (
    <div className="pt-8">
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
}
