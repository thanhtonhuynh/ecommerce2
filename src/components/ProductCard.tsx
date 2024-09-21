"use client";

import { ProductWithReviews } from "@/_types";
import { formatPrice } from "@/_utils/formatters";
import { truncateText } from "@/_utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from 'next/navigation';

type ProductCardProps = {
  product: ProductWithReviews;
};

export function ProductCard({ product }: ProductCardProps) {
  // const router = useRouter();

  const productRating =
    product.reviews.reduce(
      (acc: number, review: any) => review.rating + acc,
      0,
    ) / product.reviews.length;

  return (
    <Link href={`/product/${product.id}`}>
      <div
        // onClick={() => router.push(`/product/${product.id}`)}
        className="col-span-1 cursor-pointer rounded-sm border border-slate-200 bg-slate-50 p-2 text-center text-sm transition hover:scale-105"
      >
        <div className="flex w-full flex-col items-center gap-1">
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              fill
              className="h-full w-full object-contain"
              src={product.images[0].image}
              alt={product.name}
            />
          </div>

          <div className="mt-4">{truncateText(product.name)}</div>

          <div>
            <Rating value={productRating} readOnly />
          </div>

          <div>{product.reviews.length} reviews</div>

          <div className="font-semibold">
            {formatPrice(product.price / 100)}
          </div>
        </div>
      </div>
    </Link>
  );
}
