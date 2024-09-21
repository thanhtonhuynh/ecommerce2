import db from "@/_db/prisma";

export async function getUsers() {
  try {
    return await db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        createdAt: true,
        _count: { select: { orders: true } },
      },
    });
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
}
