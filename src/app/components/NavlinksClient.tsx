"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

export default function NavlinksClient({ categories }: { categories: Category[] }) {
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-2 sm:gap-3 py-2.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {categories?.map((item) => {
                const isActive = pathname === `/category/${item.slug}`;
                return (
                    <Link
                        key={item.id}
                        href={`/category/${item.slug}`}
                        className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-all rounded-full px-3.5 py-1.5 ${
                            isActive
                                ? "bg-[#058b42] text-white shadow-xs"
                                : "text-gray-700 hover:text-[#058b42] hover:bg-gray-50"
                        }`}
                    >
                        <span className="text-sm sm:text-base">{item.icon}</span>
                        <span>{item.nameBn}</span>
                    </Link>
                );
            })}
        </div>
    );
}
