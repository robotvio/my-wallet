import React from "react";
import Link from "next/link";
import {removeToken} from '../../../../utils/auth';
import {useRouter} from "next/navigation"


const Navbar = () => {
    const router = useRouter()
    const handleSignOut = () => {
        console.log("sign out")
        removeToken()
        router.push(`/login/`)

    }
    return (
        <>
            <div className="w-full h-20 bg-emerald-800 sticky top-0">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full">
                        <button
                            type="button"
                            className="inline-flex items-center md:hidden"
                            onClick={handleSignOut}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#fff"
                                    d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
                                />
                            </svg>
                        </button>
                        <ul className="hidden md:flex gap-x-6 text-white ">
                            <li>
                                <Link href="/wallets">
                                    <p>Wallet</p>
                                </Link>
                            </li>
                        </ul>
                        <div className="hidden md:block">
                            <button
                                onClick={handleSignOut}
                                className="h-12 rounded-lg bg-white font-bold px-5"
                            >Sign Out</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;