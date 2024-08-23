"use client"

import { createProduct } from "@/actions/createProduct";
import { Checkbox, Field, Input, Label, Textarea } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { useFormState } from "react-dom";
import { FormButton } from "./FormButton";
import { useState } from "react";

export default function ProductForm() {

    const [state, action] = useFormState(createProduct, { message: "" })


    return <form action={action} className="space-y-4">
        <Field>
            <Label>Image</Label>
            <Input name="image" type="file" accept="image/*" className="block w-full rounded-md focus:border-green-400 focus:ring-green-400" />
        </Field>
        <Field>
            <Label>Name</Label>
            <Input name="name" className="block w-full rounded-md focus:border-green-400 focus:ring-green-400" />
        </Field>
        <Field>
            <Label>Price</Label>
            <Input name="price" type="number" className="block w-full rounded-md focus:border-green-400 focus:ring-green-400" />
        </Field>
        <Field>
            <Label>Description</Label>
            <Textarea name="description" className="block w-full rounded-md focus:border-green-400 focus:ring-green-400"></Textarea>
        </Field>
        <Field>
            <Label>Stock</Label>
            <Input name="stock" type="number" className="block w-full rounded-md focus:border-green-400 focus:ring-green-400" />
        </Field>

        <Field className="flex items-center gap-2">
            <Checkbox
                name="is_premium"
                className="group block size-4 rounded border bg-white data-[checked]:bg-green-500"


            >
                <CheckIcon className="hidden size-4 fill-white group-data-[checked]:block" />
            </Checkbox>
            <Label>Premium?</Label>
        </Field>

        <FormButton />
    </form>
}