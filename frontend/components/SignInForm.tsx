"use client"

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { LoginCredential } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Input";

export function SignInForm() {
    const [error, setError] = useState();
    const router = useRouter()

    const loginSchema = yup.object({
        email: yup.string().email().required().trim().default(""),
        password: yup.string().required().default(""),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<LoginCredential>({
        resolver: yupResolver(loginSchema)
    })

    const handleLogin: SubmitHandler<LoginCredential> = async (data) => {
        const res = await fetch('/api/login', {
            method: "POST",
            body: JSON.stringify(data),
            cache: "no-cache"
        })

        const body = await res.json()
        if (!res.ok) {
            setError(body.error)
            return;
        }

        window.location.href = '/'
    }

    return (
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            {error && <p className="bg-red-400 text-white p-4 rounded-md">{error}</p>}
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                </label>
                <div className="mt-2">
                    <Input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        {...register('email')}
                    />
                    {errors.email?.message && <p className="text-sm text-red-500">{errors.email?.message}</p>}
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    <div className="text-sm">
                        <a href="#" className="font-semibold text-green-600 hover:text-green-500">
                            Forgot password?
                        </a>
                    </div>
                </div>
                <div className="mt-2">
                    <Input
                        id="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        {...register('password')}
                    />
                    {errors.password?.message && <p className="text-sm text-red-500">{errors.password?.message}</p>}
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                    Sign in
                </button>
            </div>
        </form>
    )
}