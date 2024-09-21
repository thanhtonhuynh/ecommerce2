import "server-only";

import { auth } from "@/auth";
import db from "@/_db/prisma";

export async function getUser() {
  const session = await auth();
  if (!session || !session.user) return null;

  try {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        image: true,
        orders: true,
      },
    });

    return user;
  } catch (error) {
    console.log("Failed to fetch user", error);
    return null;
  }
}
