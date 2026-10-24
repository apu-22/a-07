import Link from "next/link";
import { Product } from "@/types/product";
import CategoryProductsList from "./CategoryProductsList";

interface CategoryPageProps {
    params: Promise<{ categoryID: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { categoryID } = await params;

    let resData: Product[] = [];
    try {
        const res = await fetch(
            `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryID}`,
            { cache: "force-cache" }
        );
        if (res.ok) {
            resData = await res.json();
        }
    } catch (err) {
        console.error("Failed to fetch category products:", err);
    }

    // Empty State handler
    if (!resData || resData.length === 0) {
        return (
            <div className="w-full bg-[#f8faf8] min-h-[calc(100vh-140px)] py-12 sm:py-16">
                <div className="max-w-md mx-auto px-4 text-center">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] p-8 sm:p-10 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl mb-4">
                            🔍
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                            কোনো পণ্য পাওয়া যায়নি
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
                            এই ক্যাটাগরিতে এই মুহূর্তে কোনো পণ্য তালিকাভুক্ত নেই অথবা ক্যাটাগরি আইডিটি সঠিক নয়।
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-6 py-2.5 bg-[#058b42] hover:bg-[#047638] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors"
                        >
                            হোম পেজে ফিরে যান
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const categoryName = resData[0]?.categoryNameBn || categoryID;
    const categoryIcon = resData[0]?.categoryIcon || "🛒";

    return (
        <div className="w-full bg-[#f8faf8] min-h-[calc(100vh-140px)] py-6 sm:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] p-6 sm:p-7 flex items-center gap-4 sm:gap-5">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl sm:text-4xl shrink-0">
                        {categoryIcon}
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                            {categoryName}
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-400 font-normal mt-1">
                            {resData.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </div>

                {/* Sort Control & Product Cards List */}
                <CategoryProductsList products={resData} />
            </div>
        </div>
    );
}
