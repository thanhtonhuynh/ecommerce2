"use server";

import db from "@/_db/prisma";

export async function getProductById(id: string) {
  try {
    return await db.product.findUnique({ where: { id } });
  } catch (error) {
    return null;
  }
}
