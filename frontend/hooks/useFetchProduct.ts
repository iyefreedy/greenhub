import { Product } from "@/types";
import API from "@/utils/API";
import { useEffect, useState } from "react";

export const useFetchProduct = (id: number) => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async (id: number) => {
      try {
        setLoading(true);
        const res = await API.getProduct(id);
        const result = await res.json();

        setProduct(result as Product);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchProduct(id);
  }, []);

  return { product, loading };
};
