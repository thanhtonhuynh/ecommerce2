"use server";

import { auth } from "@/auth";
import db from "@/_db/prisma";
import { AddReviewSchema } from "@/_schemas";
import { revalidatePath } from "next/cache";

export async function addReview(
  productId: string,
  prevState: unknown,
  formData: FormData,
): Promise<{
  success?: boolean;
  error?: string;
  fieldErrors?: { [key: string]: string[] };
}> {
  const session = await auth();

  if (!session?.user) return { error: "Please log in to add a review." };

  // Check if product exists
  const product = await db.product.findUnique({ where: { id: productId } });
  if (!product) return { error: "Product not found" };

  // Check if product has been delivered to the user
  const deliveredOrder = await db.order.findFirst({
    where: {
      userId: session.user.id,
      deliveryStatus: "delivered",
      products: {
        some: { id: productId },
      },
    },
  });
  if (!deliveredOrder)
    return {
      error:
        "You need to purchase this product and have it delivered to review it.",
    };

  // Check if user has already reviewed this product
  const existingReview = await db.review.findFirst({
    where: {
      userId: session.user.id,
      productId,
    },
  });
  if (existingReview)
    return { error: "You have already reviewed this product." };

  // Validate form data
  const result = AddReviewSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!result.success)
    return { fieldErrors: result.error.formErrors.fieldErrors };

  // Create review
  const { rating, comment } = result.data;

  try {
    await db.review.create({
      data: {
        rating,
        comment,
        userId: session.user.id!,
        productId,
      },
    });

    revalidatePath(`/product/${productId}`);
    return { success: true };
  } catch (error) {
    return { error: "Something went wrong. Please try again." };
  }
}
