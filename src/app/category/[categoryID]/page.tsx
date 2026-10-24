import { Product } from "@/types/product";

interface CategoryPageProps {
    params: Promise<{ categoryID: string }>;
}

const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
};

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

    const categoryName = resData[0]?.categoryNameBn || categoryID;
    const categoryIcon = resData[0]?.categoryIcon || "🛒";

    return (
        <div className="w-full bg-[#f8faf8] min-h-[calc(100vh-140px)] py-6 sm:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Category Header Card */}
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

                {/* Sort Bar */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] px-5 py-4 flex items-center justify-end gap-3 mt-4">
                    <span className="text-xs sm:text-sm text-gray-500 font-normal">সাজান</span>
                    <div className="relative inline-block">
                        <select
                            defaultValue="default"
                            className="appearance-none bg-white border border-gray-200 hover:border-gray-300 rounded-lg pl-3 pr-8 py-1.5 text-xs sm:text-sm text-gray-700 font-medium focus:outline-none cursor-pointer transition-colors"
                        >
                            <option value="default">ডিফল্ট</option>
                            <option value="price-asc">দাম: কম থেকে বেশি</option>
                            <option value="price-desc">দাম: বেশি থেকে কম</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Total Count */}
                <p className="text-xs sm:text-sm text-gray-400 font-normal mt-6 mb-4">
                    মোট {resData.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
                </p>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {resData.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] p-5 flex flex-col justify-between hover:shadow-md transition-shadow min-h-[145px]"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl shrink-0">
                                    {item.image || item.categoryIcon || "🛒"}
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-gray-900 text-base leading-snug">
                                        {item.nameBn}
                                    </h3>
                                    <p className="text-xs text-gray-400 font-normal mt-0.5">
                                        প্রতি {units[item.unit] || item.unit}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 flex items-end justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[11px] text-gray-400 font-normal">
                                        আজকের দাম
                                    </span>
                                    <div className="flex items-baseline gap-1 mt-0.5">
                                        <span className="text-xl font-bold text-gray-900 leading-tight">
                                            {item.today.toLocaleString("bn-BD")}
                                        </span>
                                        <span className="text-xs font-medium text-gray-700">
                                            টাকা
                                        </span>
                                    </div>
                                </div>

                                {item.change?.dir === "up" && (
                                    <div className="inline-flex items-center gap-1 bg-[#fff1f1] text-[#e02424] font-semibold text-xs px-2.5 py-1 rounded-full shrink-0">
                                        <span className="text-[10px]">▲</span>
                                        <span>
                                            {Math.abs(item.change.pct).toLocaleString("bn-BD", {
                                                minimumFractionDigits: 1,
                                                maximumFractionDigits: 1,
                                            })}%
                                        </span>
                                    </div>
                                )}

                                {item.change?.dir === "down" && (
                                    <div className="inline-flex items-center gap-1 bg-[#edfbf3] text-[#058b42] font-semibold text-xs px-2.5 py-1 rounded-full shrink-0">
                                        <span className="text-[10px]">▼</span>
                                        <span>
                                            {Math.abs(item.change.pct).toLocaleString("bn-BD", {
                                                minimumFractionDigits: 1,
                                                maximumFractionDigits: 1,
                                            })}%
                                        </span>
                                    </div>
                                )}

                                {(!item.change || item.change.dir === "flat") && (
                                    <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 font-semibold text-xs px-2.5 py-1 rounded-full shrink-0">
                                        <span>—</span>
                                        <span>
                                            {Math.abs(item.change?.pct || 0).toLocaleString("bn-BD", {
                                                minimumFractionDigits: 1,
                                                maximumFractionDigits: 1,
                                            })}%
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {resData.length === 0 && (
                    <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-500 mt-4">
                        এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
                    </div>
                )}
            </div>
        </div>
    );
}
