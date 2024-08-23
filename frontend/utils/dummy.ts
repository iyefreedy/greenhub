import { Product } from "@/types";

export default {
    getAll() {
        return new Promise<Product[]>((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        product_id: 1,
                        name: "Lenovo 313A X-123",
                        price: 5_229_000
                    },
                    {
                        product_id: 2,
                        name: "HP 123 Z000",
                        price: 4_100_000
                    },
                    {
                        product_id: 3,
                        name: "Asus Y099",
                        price: 5_999_000
                    },
                ]);
            }, 500);
        });
    }
}
