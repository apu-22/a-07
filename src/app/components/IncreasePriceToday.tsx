import { Product } from "@/types/product";

interface IncreasePriceTodayProps {
    products: Product[];
}

const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
};

const IncreasePriceToday = ({ products }: IncreasePriceTodayProps) => {
    //filter products whre direct up
    const increasedProducts = products
        ?.filter((item) => item.change?.dir === "up")
        .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
        .slice(0, 6);

    if (!increasedProducts || increasedProducts.length === 0) return null;

    return (
        <section className="w-full bg-[#f8faf8] pb-10 sm:pb-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <span className="text-red-500 text-sm">▲</span>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                        আজ দাম বেড়েছে
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {increasedProducts.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl border border-gray-100 shadow-[0_1px_4px_rgba(0,0,0,0.02)] p-4 sm:p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-xl shrink-0">
                                    {item.image}
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-gray-900 text-base leading-snug">
                                        {item.nameBn}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        প্রতি {units[item.unit] || item.unit}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 pt-3 border-t border-gray-50 flex items-end justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[11px] text-gray-400">আজকের দাম</span>
                                    <span className="text-lg font-bold text-gray-900 leading-tight mt-0.5">
                                        {item.today.toLocaleString("bn-BD")} টাকা
                                    </span>
                                </div>

                                <div className="inline-flex items-center gap-1 bg-red-50 text-red-600 font-bold text-xs px-2.5 py-1 rounded-lg shrink-0">
                                    <span>▲</span>
                                    <span>
                                        {Math.abs(item.change.pct).toLocaleString("bn-BD", {
                                            minimumFractionDigits: 1,
                                            maximumFractionDigits: 1,
                                        })}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IncreasePriceToday;
