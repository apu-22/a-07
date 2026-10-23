import Link from "next/link";

interface Category {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const NavLinks = async () => {
    let data: Category[] = [];
    try {
        const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories", {
            cache: "force-cache",
        });
        if (res.ok) {
            data = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }

    return (
        <nav className="w-full bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-6 sm:gap-7 py-2.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {data?.map((item) => (
                        <Link
                            key={item.id}
                            href={`/${item.slug}`}
                            className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-700 hover:text-[#058b42] transition-colors whitespace-nowrap font-medium py-0.5"
                        >
                            <span className="text-sm sm:text-base">{item.icon}</span>
                            <span>{item.nameBn}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default NavLinks;


