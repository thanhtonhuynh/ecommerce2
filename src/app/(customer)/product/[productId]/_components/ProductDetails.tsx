"use client";

import {
  CartProductType,
  ProductImageType,
  ProductWithReviews,
} from "@/_types";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { ProductColor } from "./ProductColor";
import { ProductQuantity } from "./ProductQuantity";
import { Button } from "@/components/ui/Button";
import { ProductImage } from "./ProductImage";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useShoppingCart } from "@/_hooks/useShoppingCart";

type ProductDetailsProps = {
  product: ProductWithReviews;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  const { cartProducts, addProductToCart, getItemQuantity } = useShoppingCart();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });
  const router = useRouter();
  // const productQuantity = getItemQuantity(product.id);

  // console.log(cartProducts);

  useEffect(() => {
    if (cartProducts) {
      const productInCart = cartProducts.find(
        (cartProduct) => cartProduct.id === product.id,
      );

      if (productInCart) {
        setIsProductInCart(true);
      } else {
        setIsProductInCart(false);
      }
    }
  }, [cartProducts, product.id]);

  const productRating =
    product.reviews.reduce(
      (acc: number, review: any) => review.rating + acc,
      0,
    ) / product.reviews.length;

  const handleColorChange = (value: ProductImageType) => {
    setCartProduct((prev) => ({ ...prev, selectedImg: value }));
  };

  function handleQuantityIncrease() {
    if (cartProduct.quantity === 99) return;
    setCartProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  }

  function handleQuantityDecrease() {
    if (cartProduct.quantity === 1) return;
    setCartProduct((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
  }

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <ProductImage
        product={product}
        cartProduct={cartProduct}
        handleColorChange={handleColorChange}
      />

      <div className="flex flex-col gap-1 text-sm text-slate-500">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>

        <div className="flex items-center gap-2">
          <Rating value={productRating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>

        <Horizontal />

        <div className="text-justify">{product.description}</div>

        <Horizontal />

        <div>
          <span className="font-semibold">CATEGORY: </span>
          {product.category}
        </div>

        <div>
          <span className="font-semibold">BRAND: </span>
          {product.brand}
        </div>

        <div className={product.inStock ? "text-green-500" : "text-rose-500"}>
          {product.inStock ? "In stock" : "Out of stock"}
        </div>

        <Horizontal />

        {isProductInCart ? (
          <>
            <p className="mb-2 flex items-center gap-1 text-slate-500">
              <CheckCircle2 className="text-teal-400" size={20} />
              <span>Product added to cart</span>
            </p>

            <div className="max-w-80">
              <Button outline onClick={() => router.push("/cart")}>
                View Cart
              </Button>
            </div>
          </>
        ) : (
          <>
            <ProductColor
              cartProduct={cartProduct}
              images={product.images}
              handleColorChange={handleColorChange}
            />

            <Horizontal />

            <ProductQuantity
              cartProduct={cartProduct}
              handleQuantityIncrease={handleQuantityIncrease}
              handleQuantityDecrease={handleQuantityDecrease}
            />

            <Horizontal />

            <div className="max-w-80">
              <Button onClick={() => addProductToCart(cartProduct)}>
                Add to Cart
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Horizontal() {
  return <hr className="my-2 w-[30%]" />;
}
