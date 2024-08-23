"use client"

import ProductDetail from "@/components/ProductDetail";
import ShoppingCart from "@/components/ShoppingCart";
import { CartProvider } from "@/context/CartContext";
import { useFetchProduct } from "@/hooks/useFetchProduct";


export default function ProductPage({ params }: { params: { id: number } }) {
    const { id } = params;
    const { product, loading } = useFetchProduct(id)

    if (loading && !product) {
        return <p>Loading...</p>
    }

    if (!product) {
        return <p>Product not found.</p>
    }

    return (
        <CartProvider>
            <ProductDetail product={product} />
            <ShoppingCart />
        </CartProvider>
    );
}
