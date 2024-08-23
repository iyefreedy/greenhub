"use server"

import { Input } from "./Input";
import { createSeller } from "@/actions/createSeller";
import { FormButton } from "./FormButton";

export async function SellerForm() {

    return <form className="mt-4 space-y-4" action={createSeller} >
        <div>
            <label htmlFor="name">Store name</label>
            <Input id="name" name="name" />
        </div>
        <div>
            <label htmlFor="city">City</label>
            <Input id="city" name="city" />
        </div>
        <div>
            <label htmlFor="city">Address</label>
            <textarea name="address" id="address" className="block w-full rounded border border-gray-300 focus:ring-1 focus:ring-green-400 focus:border-green-400 transition-all"></textarea>
        </div>

        <FormButton />
        {/* <button type="submit" className="block w-full rounded text-gray-700 text-center py-1.5 bg-green-400 disabled:bg-green-200 disabled:text-gray-500">Submit</button> */}
    </form>
}