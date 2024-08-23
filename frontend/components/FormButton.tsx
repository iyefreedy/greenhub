"use client"

import { useFormStatus } from "react-dom"

export function FormButton() {
    const { pending } = useFormStatus()
    return <button type="submit" disabled={pending} aria-disabled={pending} className="block w-full rounded text-gray-700 text-center py-1.5 bg-green-400 disabled:bg-green-200 disabled:text-gray-500">Submit</button>
}