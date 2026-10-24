import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { Product } from "@/types/product";
import Link from "next/link";

interface MarqueeProps {
    products?: Product[];
}

const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "টি",
};

const Marquee = async ({ products }: MarqueeProps = {}) => {
    let list = products;

    if (!list || list.length === 0) {
        try {
            const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
                cache: "force-cache",
            });
            if (res.ok) {
                list = await res.json();
            }
        } catch (error) {
            console.error("Failed to fetch products for marquee:", error);
        }
    }

    if (!list || list.length === 0) return null;

    return (
        <div className="w-full bg-[#fdfdfd] border-b border-gray-200 overflow-hidden py-0.5">
            <MarqueeText direction="right" duration={10} pauseOnHover={true} textSpacing="0px">
                {list.map((item, idx) => (
                    <Link
                        href={`/detailProduct/${item.id}`}
                        key={idx}
                        className="inline-flex items-center gap-2 px-4 py-2 border-r border-gray-200 text-xs sm:text-sm whitespace-nowrap select-none"
                    >
                        <span className="text-base shrink-0">
                            {item.categoryIcon || item.image || "🛒"}
                        </span>

                        <span className="font-semibold text-gray-800">
                            {item.nameBn}
                        </span>

                        <span className="text-gray-600 font-medium">
                            {item.today.toLocaleString("bn-BD")} টাকা/{units[item.unit] || item.unit}
                        </span>

                        {item.change?.dir === "up" && (
                            <span className="inline-flex items-center gap-0.5 text-red-600 font-bold text-xs">
                                <span>▲</span>
                                <span>{Math.abs(item.change.pct).toLocaleString("bn-BD")}%</span>
                            </span>
                        )}
                        {item.change?.dir === "down" && (
                            <span className="inline-flex items-center gap-0.5 text-green-600 font-bold text-xs">
                                <span>▼</span>
                                <span>{Math.abs(item.change.pct).toLocaleString("bn-BD")}%</span>
                            </span>
                        )}
                        {item.change?.dir === "flat" && (
                            <span className="inline-flex items-center gap-0.5 text-gray-400 font-medium text-xs">
                                <span>▬</span>
                                <span>{Math.abs(item.change.pct).toLocaleString("bn-BD")}%</span>
                            </span>
                        )}
                    </Link>
                ))}
            </MarqueeText>
        </div>
    );
};

export default Marquee;
