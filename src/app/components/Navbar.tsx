import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./Navlinks";
import CurrentDate from "./CurrentDate";
import Marquee from "./Marquee";

export default function Navbar() {
    return (
        <>
            <header className="w-full bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-3 sm:py-3.5">
                        {/* Brand Logo & Date */}
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-[#058b42] rounded-xl flex items-center justify-center p-2 shrink-0 shadow-xs">
                                <Image
                                    className="w-7 h-7 object-contain"
                                    width={28}
                                    height={28}
                                    src="/logo-icon.png"
                                    alt="বাজার দর লোগো"
                                />
                            </div>

                            <div className="flex flex-col">
                                <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                                    বাজার দর
                                </h1>
                                <CurrentDate />
                            </div>
                        </Link>

                        {/* Auth Actions */}
                        <div className="flex items-center gap-2">
                            <Link
                                href="/signin"
                                className="btn btn-ghost btn-sm"
                            >
                                সাইন ইন
                            </Link>

                            <Link
                                href="/signup"
                                className="btn btn-success btn-sm text-white"
                            >
                                সাইন আপ
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <Suspense fallback={null}>
                <NavLinks />
            </Suspense>

            <Suspense fallback={null}>
                <Marquee />
            </Suspense>
        </>
    );
}
