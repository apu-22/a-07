"use client";

import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
    const { data: session, isPending } = useSession();

    const handleSignOut = async () => {
        await signOut();
    };

    if (isPending) {
        return (
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-100 animate-pulse rounded-md"></div>
            </div>
        );
    }

    if (session?.user) {
        return (
            <div className="dropdown dropdown-end">
                {/* Trigger Button */}
                <div
                    tabIndex={0}
                    role="button"
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100/80 transition cursor-pointer select-none"
                >
                    <div className="avatar">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img
                                alt="User Avatar"
                                src={
                                    session.user.image ||
                                    "https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                                }
                            />
                        </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                        {session.user.name?.split(" ")[0] || session.user.name}
                    </span>
                    <svg
                        className="w-3.5 h-3.5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>

                {/* Dropdown Content */}
                <div
                    tabIndex={0}
                    className="dropdown-content z-50 mt-2 p-4 bg-white rounded-2xl shadow-xl border border-gray-100 w-64"
                >
                    <div className="pb-3 border-b border-gray-100 mb-2">
                        <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                            {session.user.name}
                        </h4>
                        <p className="text-xs text-gray-400 truncate mt-0.5">
                            {session.user.email}
                        </p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Link
                            href="/profile"
                            className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            <svg
                                className="w-4 h-4 text-[#3b82f6] shrink-0"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            <span>আমার প্রোফাইল</span>
                        </Link>

                        <button
                            type="button"
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg text-xs sm:text-sm font-medium text-[#e55353] hover:bg-red-50/70 transition cursor-pointer text-left"
                        >
                            <svg
                                className="w-4 h-4 text-[#e55353] shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="9 10 4 15 9 20" />
                                <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                            </svg>
                            <span>সাইন আউট</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Link href="/sign-in" className="btn btn-ghost btn-sm">
                সাইন ইন
            </Link>

            <Link href="/sign-up" className="btn btn-success btn-sm text-white">
                সাইন আপ
            </Link>
        </div>
    );
};

export default UserInfo;