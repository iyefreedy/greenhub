import { Product } from "@/types";
import API from "@/utils/API"
import { cookies } from "next/headers";
import Link from "next/link"
import defaultImage from "@/assets/images/green-hub.svg"
import Image from "next/image";
import { formatCurrency } from "@/utils/helper";

async function getProducts() {
    const accessToken = cookies().get('access_token')?.value;

    const response = await API.getProductsSeller(accessToken);
    const result = await response.json()

    return result as Product[];

}

export default async function ProductsPage() {
    const products = await getProducts()

    return (
        <div className="bg-white p-6 shadow-md rounded-md">
            <Link href={'/products/create'} className="mr-0 ml-auto rounded-full bg-green-500 text-gray-800 py-1.5 px-5 float-end">Add Product</Link>
            <ul role="list" className="divide-y divide-gray-100 mt-10">
                {products.map((product) => (
                    <li key={product.id} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <Image alt={product.name} src={defaultImage} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{product.name}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{product.description}</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">{formatCurrency(product.price)}</p>
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                {product.stock}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}