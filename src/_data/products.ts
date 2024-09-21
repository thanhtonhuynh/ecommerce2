import db from "@/_db/prisma";

export async function getProducts(params: {
  category?: string;
  searchTerm?: string;
}) {
  try {
    const { category, searchTerm } = params;

    const products = await db.product.findMany({
      where: {
        category,
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      include: {
        reviews: {
          include: { user: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return products;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
}
