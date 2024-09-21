"use client";

import { CartProductType } from "@/_types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useLocalStorage } from "./useLocalStorage";
import { getProductById } from "@/app/(customer)/cart/_actions/products";

type CartContext = {
  cartTotalQuantity: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  addProductToCart: (product: CartProductType) => void;
  removeProductFromCart: (product: CartProductType) => void;
  getItemQuantity: (productId: string) => number;
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  clearCart: () => void;
  paymentIntent: string;
  setPaymentIntent: (value: string) => void;
};

type ShoppingCartProviderProps = {
  children: ReactNode;
};

const ShoppingCartContext = createContext<CartContext>({} as CartContext);

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useLocalStorage<
    CartProductType[] | null
  >("eshopCart", null);
  const [paymentIntent, setPaymentIntent] = useLocalStorage<string>(
    "eshopPaymentIntent",
    "",
  );

  useEffect(() => {
    async function getTotals() {
      if (!cartProducts) return;

      let totalQuantity = 0;
      let totalAmount = 0;
      for (const item of cartProducts) {
        // This function has to be in a 'use server' file
        const product = await getProductById(item.id);
        if (product) {
          totalQuantity += item.quantity;
          totalAmount += product.price * item.quantity;
        }
      }

      setCartTotalQuantity(totalQuantity);
      setCartTotalAmount(totalAmount);
    }

    getTotals();
  }, [cartProducts]);

  function addProductToCart(product: CartProductType) {
    toast.success("Product added to cart");

    setCartProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      return updatedCart;
    });
  }

  function removeProductFromCart(product: CartProductType) {
    setCartProducts((currItems) => {
      if (!currItems) return null;
      const updatedCart = currItems.filter((item) => item.id !== product.id);

      return updatedCart;
    });

    toast.success("Product removed from cart.");
  }

  function increaseCartQuantity(id: string) {
    if (cartProducts) {
      const updatedCart = cartProducts.map((product) => {
        if (product.id === id && product.quantity < 20) {
          return { ...product, quantity: product.quantity + 1 };
        }

        if (product.id === id && product.quantity == 20) {
          toast.error("Maximum quantity is 20");
        }

        return product;
      });

      setCartProducts(updatedCart);
    }
  }

  function decreaseCartQuantity(id: string) {
    if (cartProducts) {
      const updatedCart = cartProducts.map((product) => {
        if (product.id === id && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }

        return product;
      });

      setCartProducts(updatedCart);
    }
  }

  function getItemQuantity(productId: string) {
    return (
      cartProducts?.find((product) => product.id === productId)?.quantity || 0
    );
  }

  function clearCart() {
    setCartProducts(null);
    setCartTotalQuantity(0);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        cartTotalQuantity,
        cartTotalAmount,
        cartProducts,
        addProductToCart,
        removeProductFromCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        clearCart,
        paymentIntent,
        setPaymentIntent,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
