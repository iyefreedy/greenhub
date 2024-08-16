"use client";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import greenHubLogo from "@/assets/images/green-hub.svg"
import SearchForm from "./SearchFrom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <nav className="px-4 bg-emerald-50">
                <div className="h-20 flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href={"/"} className="flex items-center">
                            <Image
                                src={greenHubLogo}
                                width={0}
                                height={0}
                                alt="Green Hub"
                                className="w-14 h-14 md:w-20 md:h-20"
                                priority
                            />
                            <span className="font-semibold text-xl hidden sm:inline xl:text-3xl">
                                Green Hub
                            </span>
                        </Link>

                        <ul className="hidden lg:flex space-x-4 md:ml-6">
                            <li>
                                <Link href={"/"}>Our Goodies</Link>
                            </li>
                            <li>
                                <Link href={"/"}>Upcoming Events</Link>
                            </li>
                            <li>
                                <Link href={"/"}>Join Seller Squad</Link>
                            </li>
                            <li>
                                <Link href={"/"}>About Us</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button onClick={() => setIsOpen(true)} className="lg:hidden">
                            <Bars3Icon className="h-6 w-6 fill-emerald-400" />
                        </button>
                        <div className="relative hidden lg:block">
                            <MagnifyingGlassIcon className="h-5 w-5 stroke-emerald-400 absolute right-3 top-2" />
                            <input
                                type="text"
                                className="w-full outline-none text-sm font-light rounded-full py-1.5 px-3 border border-emerald-200 focus:ring-1 focus:ring-emerald-300 transition-shadow"
                                placeholder="Search..."
                            />
                        </div>
                        <Link
                            href={"/"}
                            className="hidden lg:inline-block w-20 bg-emerald-400 text-center py-1.5 rounded-full text-gray-100 text-sm lg:text-base"
                        >
                            Sign Up
                        </Link>
                        <Link
                            href={"/"}
                            className="hidden text-sm lg:inline-block w-20 border border-emerald-400 text-center py-1.5 rounded-full lg:text-base"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </nav>

            <div
                className={`absolute top-0 left-0 w-full shadow-lg rounded-b-2xl bg-white transition-transform z-50 ${isOpen ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <div className="p-6">
                    <div className="flex justify-end">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center w-10  h-10 text-center"
                        >
                            <XMarkIcon className="h-6 w-6  stroke-emerald-400" />
                        </button>
                    </div>
                    <ul className="space-y-4 mb-4">
                        <li>
                            <Link href={"/"}>Our Goodies</Link>
                        </li>
                        <li>
                            <Link href={"/"}>Upcoming Events</Link>
                        </li>
                        <li>
                            <Link href={"/"}>Join Seller Squad</Link>
                        </li>
                        <li>
                            <Link href={"/"}>About Us</Link>
                        </li>
                    </ul>

                    <SearchForm />

                    <Link
                        href={"/"}
                        className="block bg-emerald-400 text-center rounded-full py-1.5 mb-2 text-gray-100"
                    >
                        Sign Up
                    </Link>
                    <Link
                        href={"/"}
                        className="block border border-emerald-400 text-center rounded-full py-1.5"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </>
    );
}