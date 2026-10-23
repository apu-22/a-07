import Image from "next/image";
import Link from "next/link";
import CurrentDate from "./CurrentDate";

const Banner = () => {
    return (
        <section className="w-full bg-[#f8faf8] py-6 sm:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                    <div className="flex-1 flex flex-col items-start text-left">
                        <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-medium bg-[#eaf5ef] text-[#058b42]">
                            <CurrentDate className="text-xs font-medium" />
                        </div>

                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight mt-3">
                            আজকের বাজারের দাম এক নজরে
                        </h1>

                        <p className="text-sm sm:text-base text-gray-500 max-w-xl leading-relaxed mt-3">
                            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                        </p>

                        <div className="mt-6">
                            <Link
                                href="#products"
                                className="btn btn-success text-white rounded-xl px-6 py-2.5 shadow-sm hover:shadow transition-all font-medium text-sm sm:text-base"
                            >
                                সব পণ্য দেখুন
                            </Link>
                        </div>
                    </div>

                    <div className="shrink-0 flex items-center justify-center">
                        <Image
                            src="/bazar-hero.png"
                            alt="আজকের বাজার পণ্য"
                            width={320}
                            height={260}
                            className="w-60 sm:w-72 md:w-80 h-auto object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;

