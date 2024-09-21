import db from "@/_db/prisma";

export async function getOrders() {
  try {
    const orders = await db.order.findMany({
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

    return orders;
  } catch (error) {
    throw new Error("Failed to fetch orders");
  }
}
