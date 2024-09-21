"use server";

import db from "@/_db/prisma";
import { getUser } from "@/_libs/dal";
import { revalidatePath } from "next/cache";

export async function updateDeliveryStatus(id: string, deliveryStatus: string) {
  const user = await getUser();
  if (!user || user.role !== "ADMIN") return null;

  await db.order.update({
    where: { id },
    data: { deliveryStatus },
  });

  revalidatePath("/admin/manage-orders");
}
