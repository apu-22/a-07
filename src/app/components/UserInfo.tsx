"use client";

import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
    const { data: session, isPending } = useSession();

    const handleSignOut = async () => {
        await signOut();
    }

    if (isPending) {
        return (
            <div className="flex items-center gap-2">
                <div className="h-8 w-16 bg-gray-100 animate-pulse rounded-md"></div>
                <div className="h-8 w-16 bg-gray-100 animate-pulse rounded-md"></div>
            </div>
        );
    }

    if (session?.user) {
        return (
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <div className="avatar">
                        <div className="w-8 rounded-full">
                            <img
                                alt="Tailwind-CSS-Avatar-component"
                                src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                            />
                        </div>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                        {session.user.name}
                    </span>
                </div>

                <button
                    onClick={handleSignOut}
                    className="btn btn-outline btn-error btn-sm"
                >
                    লগআউট
                </button>
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