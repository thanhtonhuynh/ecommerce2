"use client";

import { CartProductType, ProductImageType } from "@/_types";
import Image from "next/image";

type ProductImageProps = {
  cartProduct: CartProductType;
  product: any;
  handleColorChange: (value: ProductImageType) => void;
};

export function ProductImage({
  cartProduct,
  product,
  handleColorChange,
}: ProductImageProps) {
  return (
    <div className="grid h-full max-h-[500px] min-h-[300px] grid-cols-6 gap-2 sm:min-h-[400px]">
      <div className="flex h-full max-h-[500px] min-h-[300px] cursor-pointer flex-col items-center justify-center gap-4 border sm:min-h-[400px]">
        {product.images.map((image: ProductImageType) => (
          <div
            key={image.color}
            onClick={() => handleColorChange(image)}
            className={`relative aspect-square w-[80%] rounded border-teal-300 ${
              cartProduct.selectedImg.color === image.color
                ? "border-[1.5px]"
                : "border-none"
            }`}
          >
            <Image
              src={image.image}
              alt={image.color}
              className="object-contain"
              fill
            />
          </div>
        ))}
      </div>

      <div className="relative col-span-5 aspect-square">
        <Image
          src={cartProduct.selectedImg.image}
          alt={cartProduct.selectedImg.color}
          className="h-full max-h-[500px] min-h-[300px] w-full object-contain sm:min-h-[400px]"
          fill
        />
      </div>
    </div>
  );
}
