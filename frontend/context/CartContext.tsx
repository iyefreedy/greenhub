import { Product } from "@/types";
import React, { createContext, useMemo, useRef, useState } from "react";

type CartProduct = Product & {
  quantity: number;
};

type CartContextProps = {
  ref: any;
  products: CartProduct[];
  open: boolean;
  totalPrice: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  increase: (product: Product) => void;
  decrease: (product: Product) => void;
};

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const totalPrice = useMemo(() => {
    return products.reduce(
      (oldValue, product) => oldValue + product.price * product.quantity,
      0
    );
  }, [products]);

  const addToCart = (product: Product) => {
    setProducts((prev) => {
      const existingProduct = prev.find((value) => value.id === product.id);

      if (existingProduct) {
        return prev.map((value) =>
          value.id === product.id
            ? { ...value, quantity: value.quantity + 1 }
            : value
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    setOpen(true);
  };

  const removeFromCart = (product: Product) => {
    setProducts((prev) => {
      return prev.filter((value) => value.id !== product.id);
    });
  };

  const increase = (product: Product) => {
    setProducts((prev) => {
      const existingProduct = prev.find((value) => value.id === product.id);

      if (existingProduct) {
        return prev.map((value) =>
          value.id === product.id
            ? { ...value, quantity: value.quantity + 1 }
            : value
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const decrease = (product: Product) => {
    setProducts((prev) => {
      const existingProduct = prev.find((value) => value.id === product.id);

      if (existingProduct) {
        return prev.map((value) =>
          value.id === product.id
            ? { ...value, quantity: value.quantity - 1 }
            : value
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        ref,
        products,
        open,
        totalPrice,
        addToCart,
        setOpen,
        removeFromCart,
        increase,
        decrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
