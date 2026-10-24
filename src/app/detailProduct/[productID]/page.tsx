import Link from "next/link";
import { Product } from "@/types/product";

interface DetailProductPageProps {
    params: Promise<{ productID: string }>;
}

const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
};

export default async function DetailProductPage({ params }: DetailProductPageProps) {
    const { productID } = await params;

    const res = await fetch(
        `https://api.api-store.workers.dev/api/bazardor/products/${productID}`,
        { cache: "force-cache" }
    );
    const product: Product = await res.json();

    const unitText = units[product.unit] || product.unit;
    const markets = product.markets || [];

    const minPrice = markets.length > 0 ? Math.min(...markets.map((m) => m.min)) : product.today;
    const maxPrice = markets.length > 0 ? Math.max(...markets.map((m) => m.max)) : product.today;
    const avgPrice = product.today;

    const diff = Math.abs(product.today - product.yesterday);
    let changeText = "গতকালের তুলনায় আজ দাম অপরিবর্তিত";
    if (product.today > product.yesterday) {
        changeText = `গতকালের তুলনায় আজ দাম বেড়েছে • ${diff.toLocaleString("bn-BD")} টাকা`;
    } else if (product.today < product.yesterday) {
        changeText = `গতকালের তুলনায় আজ দাম কমেছে • ${diff.toLocaleString("bn-BD")} টাকা`;
    }

    return (
        <div className="w-full bg-[#f8faf8] min-h-[calc(100vh-140px)] py-6 sm:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-5">
                    <Link href="/" className="hover:text-gray-900 transition-colors">
                        হোম
                    </Link>
                    <span className="text-gray-300">›</span>
                    <Link
                        href={`/category/${product.category}`}
                        className="hover:text-gray-900 transition-colors"
                    >
                        {product.categoryNameBn || product.category}
                    </Link>
                    <span className="text-gray-300">›</span>
                    <span className="text-gray-800 font-medium">{product.nameBn}</span>
                </nav>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4 sm:gap-5">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-4xl sm:text-5xl shrink-0">
                            {product.image || product.categoryIcon || "🛒"}
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                                {product.nameBn}
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-400 font-normal mt-1">
                                প্রতি {unitText} • {product.categoryNameBn || product.category}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-2">
                                {changeText}
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-50/80 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center min-w-[140px] text-center border border-gray-100/60 self-start md:self-auto">
                        <span className="text-xs text-gray-400 font-normal">আজকের দাম</span>
                        <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mt-1">
                            {product.today.toLocaleString("bn-BD")}
                        </span>
                        <span className="text-xs text-gray-400 font-normal mt-0.5">
                            টাকা / {unitText}
                        </span>

                        {product.change?.dir === "up" && (
                            <span className="text-red-500 font-bold text-xs mt-2 flex items-center gap-1">
                                <span>▲</span>
                                <span>
                                    {Math.abs(product.change.pct).toLocaleString("bn-BD", {
                                        minimumFractionDigits: 1,
                                        maximumFractionDigits: 1,
                                    })}%
                                </span>
                            </span>
                        )}

                        {product.change?.dir === "down" && (
                            <span className="text-emerald-600 font-bold text-xs mt-2 flex items-center gap-1">
                                <span>▼</span>
                                <span>
                                    {Math.abs(product.change.pct).toLocaleString("bn-BD", {
                                        minimumFractionDigits: 1,
                                        maximumFractionDigits: 1,
                                    })}%
                                </span>
                            </span>
                        )}

                        {(!product.change || product.change.dir === "flat") && (
                            <span className="text-gray-500 font-bold text-xs mt-2 flex items-center gap-1">
                                <span>▬</span>
                                <span>
                                    {Math.abs(product.change?.pct || 0).toLocaleString("bn-BD", {
                                        minimumFractionDigits: 1,
                                        maximumFractionDigits: 1,
                                    })}%
                                </span>
                            </span>
                        )}
                    </div>
                </div>

                {/* Price — Summary Cards */}
                <div className="mt-8">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                        দামের সারসংক্ষেপ
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] p-5">
                            <span className="text-xs text-gray-400 font-normal">সর্বনিম্ন দাম</span>
                            <div className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">
                                {minPrice.toLocaleString("bn-BD")} টাকা
                            </div>
                            <span className="text-xs text-gray-400 font-normal mt-1 block">
                                সবচেয়ে কম দামের বাজার
                            </span>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] p-5">
                            <span className="text-xs text-gray-400 font-normal">সর্বাধিক দাম</span>
                            <div className="text-xl sm:text-2xl font-bold text-red-600 mt-1">
                                {maxPrice.toLocaleString("bn-BD")} টাকা
                            </div>
                            <span className="text-xs text-gray-400 font-normal mt-1 block">
                                সবচেয়ে বেশি দামের বাজার
                            </span>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] p-5">
                            <span className="text-xs text-gray-400 font-normal">গড় দাম</span>
                            <div className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">
                                {avgPrice.toLocaleString("bn-BD")} টাকা
                            </div>
                            <span className="text-xs text-gray-400 font-normal mt-1 block">
                                প্রতি {unitText}-এর হিসাবে
                            </span>
                        </div>
                    </div>
                </div>

                {/* Market-wise Prices Table */}
                {markets.length > 0 && (
                    <div className="mt-8 sm:mt-10">
                        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">
                            বাজারভিত্তিক আজকের দাম
                        </h2>
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50/50 text-xs sm:text-sm font-semibold text-gray-500">
                                            <th className="py-3.5 px-4 sm:px-6">বাজার</th>
                                            <th className="py-3.5 px-4 sm:px-6">বিভাগ</th>
                                            <th className="py-3.5 px-4 sm:px-6 text-right">সর্বনিম্ন</th>
                                            <th className="py-3.5 px-4 sm:px-6 text-right">সর্বাধিক</th>
                                            <th className="py-3.5 px-4 sm:px-6 text-right">গড়</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                                        {markets.map((m, idx) => {
                                            const avg = (m.min + m.max) / 2;
                                            const hasDecimals = avg % 1 !== 0;

                                            return (
                                                <tr
                                                    key={idx}
                                                    className="hover:bg-gray-50/70 transition-colors"
                                                >
                                                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-800">
                                                        {m.market}
                                                    </td>
                                                    <td className="py-3.5 px-4 sm:px-6 text-gray-600">
                                                        {m.division}
                                                    </td>
                                                    <td className="py-3.5 px-4 sm:px-6 text-right text-gray-700">
                                                        {m.min.toLocaleString("bn-BD")} টাকা
                                                    </td>
                                                    <td className="py-3.5 px-4 sm:px-6 text-right text-gray-700">
                                                        {m.max.toLocaleString("bn-BD")} টাকা
                                                    </td>
                                                    <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-gray-900">
                                                        {avg.toLocaleString("bn-BD", {
                                                            minimumFractionDigits: hasDecimals ? 2 : 0,
                                                            maximumFractionDigits: 2,
                                                        })}{" "}
                                                        টাকা
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}