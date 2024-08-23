
import greenHubLogo from "@/assets/images/green-hub.svg"
import auth from "@/lib/auth";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const user = await auth()

    return (
        <div className="h-screen bg-gray-100">
            <nav className="px-4 bg-white mx-auto shadow-sm ">
                <div className="h-20 flex justify-between items-center container">
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
                    </div>

                    <div className="space-x-4">
                        <Link href={"/seller"} className="px-4 py-1.5 bg-green-400 rounded-full">Seller</Link>

                        <Menu>
                            <MenuButton className="w-10 h-10 p-2 bg-emerald-400 rounded-full">
                                {user?.first_name.charAt(0)}
                            </MenuButton>
                            <MenuItems anchor="bottom end" className="p-2 bg-white w-40 shadow-md rounded-md space-y-2">
                                <MenuItem>
                                    <a className="block data-[focus]:bg-blue-100" href="/settings">
                                        Settings
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a className="block data-[focus]:bg-blue-100" href="/support">
                                        Support
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a className="block data-[focus]:bg-blue-100" href="/license">
                                        License
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a className="block data-[focus]:bg-blue-100" href="/license">
                                        Logout
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>

                </div>
            </nav>

            <aside className="absolute top-24 left-4 w-60 hidden lg:block space-y-4">
                <ul className="space-y-4 bg-white p-4 shadow-md rounded-md ">
                    <li>
                        <Link href={'/profile'}>My Account</Link>
                    </li>
                    <li>
                        <Link href={'/profile'}>Transaction</Link>
                    </li>
                    <li>
                        <Link href={'/profile'}>My Account</Link>
                    </li>
                </ul>
                {user?.seller && <ul className="space-y-4 bg-white p-4 shadow-md rounded-md ">
                    <span className="text-gray-600 text-sm">Seller Menu</span>
                    <li>
                        <Link href={'/seller'}>Store Information</Link>
                    </li>
                    <li>
                        <Link href={'/products'}>My Products</Link>
                    </li>

                </ul>}

            </aside>

            <main className="lg:ml-72 mt-4 px-6">
                {children}
            </main>
        </div>
    );
}