"use client";

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { FormEventHandler, useState } from 'react';

export default function SearchForm() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/explore?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="relative">
            <form onSubmit={handleSubmit}>
                <MagnifyingGlassIcon className="h-5 w-5 stroke-emerald-400 absolute right-3 top-2" />
                <input
                    type="search"
                    className="w-full outline-none text-sm font-light rounded-full py-1.5 px-3 border border-emerald-200 mb-4 focus:ring-1 focus:ring-emerald-300 transition-shadow"
                    placeholder="Search products or markets"
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>
        </div>
    );
}