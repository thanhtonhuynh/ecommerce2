"use server";

import db from "@/_db/prisma";
import { AddProductSchema } from "@/_schemas";
import { Product } from "@prisma/client";
import { ImageType } from "@/_types";
import { deleteImage, uploadImage } from "@/_utils/firebaseImages";
import { revalidatePath } from "next/cache";
import { getUser } from "@/_libs/dal";
import { ImageType as UploadedImageType } from "@prisma/client";

export async function addProduct(
  prevState: unknown,
  formData: FormData,
): Promise<{
  success?: boolean;
  error?: string;
  product?: Product;
  fieldErrors?: { [key: string]: string[] };
}> {
  const user = await getUser();
  if (!user || user.role !== "ADMIN")
    return { error: "You are not authorized to perform this action" };

  const imagesData = JSON.parse(
    formData.get("images") as string,
  ) as ImageType[];

  imagesData.forEach((image) => {
    image.image = formData.get(`productImage_${image.color}`) as File;
  });

  const result = AddProductSchema.safeParse({
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    price: Number(formData.get("price")),
    brand: formData.get("brand") as string,
    category: formData.get("category") as string,
    inStock: formData.get("inStock") === "on",
    images: imagesData,
  });

  if (!result.success)
    return { fieldErrors: result.error.formErrors.fieldErrors };

  const { name, description, price, brand, category, inStock, images } =
    result.data;

  try {
    let uploadedImages = await uploadImage(images);

    const product = await db.product.create({
      data: {
        name,
        description,
        price,
        brand,
        category,
        inStock,
        images: uploadedImages,
      },
    });

    revalidatePath("/admin/manage-products");
    return { product, success: true };
  } catch (error) {
    return { error: "Error adding product" };
  }
}

export async function toggleProductStock(id: string, inStock: boolean) {
  const user = await getUser();
  if (!user || user.role !== "ADMIN") return null;

  await db.product.update({ where: { id }, data: { inStock: !inStock } });

  revalidatePath("/admin/manage-products");
}

export async function deleteProduct(id: string, images: UploadedImageType[]) {
  const user = await getUser();
  if (!user || user.role !== "ADMIN") throw new Error("Unauthorized");

  await deleteImage(images);

  await db.product.delete({ where: { id } });

  revalidatePath("/admin/manage-products");
}
