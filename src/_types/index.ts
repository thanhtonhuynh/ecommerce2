import { Prisma } from "@prisma/client";

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: ProductImageType;
  quantity: number;
  price: number;
};

export type ProductImageType = {
  color: string;
  colorCode: string;
  image: string;
};

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type OrderWithUser = Prisma.OrderGetPayload<{
  include: {
    user: {
      select: { id: true; name: true; email: true };
    };
  };
}>;

export type ProductWithReviews = Prisma.ProductGetPayload<{
  include: {
    reviews: {
      include: {
        user: {
          select: { name: true; email: true; id: true; image: true };
        };
      };
      orderBy: { createdAt: "desc" };
    };
  };
}>;

export type UserWithOrders = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    name: true;
    role: true;
    createdAt: true;
    image: true;
    orders: true;
  };
}>;

export type User = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    name: true;
    role: true;
    createdAt: true;
    image: true;
    _count: { select: { orders: true } };
  };
}>;
