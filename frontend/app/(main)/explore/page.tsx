import { Product } from "@/types";
import API from "@/utils/API";
import { formatCurrency } from "@/utils/helper";
import Link from "next/link";

interface ExplorePageProps {
    searchParams: {
        query?: string;
    }
}


async function getProducts(query?: string) {
    const res = await API.getProducts(query)
    const result = res.json()

    return result;
}


export default async function Explore({ searchParams }: ExplorePageProps) {
    const query = searchParams.query?.toLowerCase() || '';
    const products: Product[] = await getProducts(query)

    return <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.length === 0 && <h2>No products found.</h2>}
                {products.map((product) => (
                    <div key={product.id} className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-xs text-gray-700">
                                    <Link href={`/products/${product.id}`}>
                                        <span aria-hidden="true" className="absolute inset-0"></span>
                                        {product.name}
                                    </Link>
                                </h3>
                                <p className="mt-1 text-xs text-gray-500">Black</p>
                            </div>
                            <p className="text-xs font-medium text-gray-900">{formatCurrency(product.price)}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    </div>
}