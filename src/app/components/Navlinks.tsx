import NavlinksClient from "./NavlinksClient";

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
                <NavlinksClient categories={data} />
            </div>
        </nav>
    );
};

export default NavLinks;



