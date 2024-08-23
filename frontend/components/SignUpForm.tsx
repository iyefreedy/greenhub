"use client"

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { RegisterCredential } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";


export function SignUpForm() {
    const [error, setError] = useState();
    const router = useRouter()

    const registerSchema = yup.object({
        first_name: yup.string().required().trim().default(""),
        last_name: yup.string().trim(),
        email: yup.string().email().required().trim().default(""),
        password: yup.string().required().default(""),
        confirm_password: yup.string().oneOf([yup.ref('password'), ""], 'Passwords must match'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterCredential>({
        resolver: yupResolver(registerSchema)
    })

    const handleRegister: SubmitHandler<RegisterCredential> = async (data) => {
        const res = await fetch('/api/register', {
            method: "POST",
            body: JSON.stringify(data)
        })

        const body = await res.json()
        if (!res.ok) {
            setError(body.error)
            return;
        }

        router.push("/")
    }



    return (
        <form className="space-y-6" onSubmit={handleSubmit(handleRegister)} >
            {error && <p className="bg-red-400 text-white p-4 rounded-md">{error}</p>}
            <div>
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                <div className="mt-2">
                    <input id="firstName" type="text" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" {...register("first_name")} />
                </div>
                {errors.first_name?.message && <p className="text-sm text-red-500">{errors.first_name?.message}</p>}
            </div>

            <div>
                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                <div className="mt-2">
                    <input id="lastName" type="text" autoComplete="family-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"  {...register("last_name")} />
                </div>
                {errors.last_name?.message && <p className="text-sm text-red-500">{errors.last_name?.message}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div className="mt-2">
                    <input id="email" type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" {...register("email")} />
                </div>
                {errors.email?.message && <p className="text-sm text-red-500">{errors.email?.message}</p>}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="mt-2">
                    <input id="password" type="password" autoComplete="new-password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" {...register("password")} />
                </div>
                {errors.password?.message && <p className="text-sm text-red-500">{errors.password?.message}</p>}
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                <div className="mt-2">
                    <input id="confirmPassword" type="password" autoComplete="new-password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6" {...register("confirm_password")} />
                </div>
                {errors.confirm_password?.message && <p className="text-sm text-red-500">{errors.confirm_password?.message}</p>}
            </div>

            <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Sign Up
                </button>
            </div>
        </form>
    )
}