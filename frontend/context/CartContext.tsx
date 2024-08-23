import { CartProduct, Product } from "@/types";
import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
  const [products, setProducts] = useState<CartProduct[]>(() => {
    const localCart = localStorage.getItem("cart");
    return localCart ? (JSON.parse(localCart) as CartProduct[]) : [];
  });
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
        const updatedCart = prev.map((value) =>
          value.id === product.id
            ? { ...value, quantity: value.quantity + 1 }
            : value
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      } else {
        const updatedCart = [...prev, { ...product, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }
    });

    setOpen(true);
  };

  const removeFromCart = (product: Product) => {
    setProducts((prev) => {
      const updatedCart = prev.filter((value) => value.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const increase = (product: Product) => {
    setProducts((prev) => {
      const updatedCart = prev.map((existingProduct) => {
        if (existingProduct.id === product.id) {
          const updatedQuantity = existingProduct.quantity + 1;
          return {
            ...existingProduct,
            quantity:
              updatedQuantity > existingProduct.stock
                ? existingProduct.stock
                : updatedQuantity,
          };
        }

        return existingProduct;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const decrease = (product: Product) => {
    setProducts((prev) => {
      let updatedCart = prev.map((existingProduct) => {
        if (existingProduct.id === product.id) {
          const updatedQuantity = existingProduct.quantity - 1;
          return {
            ...existingProduct,
            quantity: updatedQuantity < 0 ? 0 : updatedQuantity,
          };
        }

        return existingProduct;
      });

      updatedCart = updatedCart.filter(
        (existingProduct) => existingProduct.quantity > 0
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
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
