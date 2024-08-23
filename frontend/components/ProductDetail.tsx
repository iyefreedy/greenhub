import { CartContext } from "@/context/CartContext";
import { Product } from "@/types";
import { formatCurrency } from "@/utils/helper";
import { useContext } from "react";

export default function ProductDetail({ product }: { product: Product }) {
    const { addToCart } = useContext(CartContext)
    return <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 ">
            <div className="h-full w-full basis-full lg:basis-4/6">
                <form>
                    <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden"></div>
                </form>
            </div>
            <div className="basis-full lg:basis-2/6">
                <div className="mb-6 flex flex-col border-b pb-6 ">
                    <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
                    <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
                        <p>
                            {formatCurrency(product.price)}
                        </p>
                    </div>
                    <p className="text-gray-600">Stock: {product.stock}</p>
                </div>

                <div className="prose mx-auto max-w-6xl text-black prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline hover:prose-a:text-neutral-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6  mb-6 text-sm leading-tight ">
                    {product.description}
                </div>

                <button
                    aria-label="Please select an option"

                    onClick={() => addToCart(product)}
                    className="relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white"
                >
                    <div className="absolute left-0 ml-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            ></path>
                        </svg>
                    </div>
                    Add To Cart
                </button>
                <p aria-live="polite" className="sr-only" role="status"></p>
            </div>
        </div>
    </div>
}