"use client";

import { createOrder } from "@/actions/createOrder";
import { CartProduct } from "@/types";
import { formatCurrency } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { FormEventHandler, useMemo, useState } from "react";
import { useFormState } from "react-dom";

export default function CheckoutPage() {
  const [products, setProducts] = useState<CartProduct[]>(() => {
    const localCart = localStorage.getItem("cart");
    return localCart ? (JSON.parse(localCart) as CartProduct[]) : [];
  });

  const router = useRouter();

  const [pending, action] = useFormState(createOrder, { message: "" });

  const totalPrice = useMemo(() => {
    return products.reduce(
      (currentPrice, product) =>
        currentPrice + product.price * product.quantity,
      0
    );
  }, [products]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/transactions", {
      method: "POST",
      body: JSON.stringify({ products }),
    });

    if (!res.ok) {
      router.push("/login");
    }
  };

  return (
    <div className="mt-10">
      <div className="p-6">
        <h2 className="font-medium text-xl">Orders</h2>
        <div className="shadow bg-white rounded-md mt-4">
          <form onSubmit={handleSubmit}>
            <ul role="list">
              {products.map((product, index) => (
                <li key={product.id} className="flex flex-col px-6">
                  <input
                    type="hidden"
                    name={`products[${index}].product`}
                    value={product.id}
                  />
                  <input
                    type="hidden"
                    name={`products[${index}].quantity`}
                    value={product.quantity}
                  />
                  <div className="flex">
                    <div className="flex-shrink-0"></div>
                    <div className="flex">
                      <div className="flex-1 flex ml-5">
                        <div className="flex">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm">{product.name}</h4>
                            <p className="text-gray-600 mt-1 text-sm">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-between items-end">
                    <p className="text-sm mt-1 ml-5">
                      {formatCurrency(product.price)}
                    </p>
                    <p className="text-sm">Qty: {product.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="py-5 px-4 mt-4 text-gray-700 border-t border-t-gray-200">
              <div className="flex items-center justify-between">
                <dt className="text-sm">Total</dt>
                <dd className="text-gray-900">{formatCurrency(totalPrice)}</dd>
              </div>
            </dl>
            <div className="p-5 border-t border-t-gray-200">
              <button
                type="submit"
                className="text-sm bg-green-600 border border-transparent w-full px-4 py-3 rounded-md text-white"
              >
                Confirm order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
