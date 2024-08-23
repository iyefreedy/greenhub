import ProductForm from "@/components/ProductForm";


export default function CreateProductPage() {

    return <div className="shadow-md rounded-md bg-white p-6">
        <h2 className="text-2xl text-gray-800 font-semibold mb-5">Create product</h2>

        <ProductForm />
    </div>
}