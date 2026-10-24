export default function CategoryLoading() {
    return (
        <div className="w-full bg-[#f8faf8] min-h-[calc(100vh-140px)] py-6 sm:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
                {/* Header Skeleton */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-7 flex items-center gap-4 sm:gap-5 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-200 shrink-0" />
                    <div className="flex flex-col gap-2.5">
                        <div className="w-28 sm:w-36 h-7 bg-gray-200 rounded-lg" />
                        <div className="w-48 sm:w-60 h-4 bg-gray-100 rounded-md" />
                    </div>
                </div>

                {/* Sort Bar Skeleton */}
                <div className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex items-center justify-end gap-3 mt-4 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
                    <div className="w-12 h-4 bg-gray-200 rounded" />
                    <div className="w-28 h-8 bg-gray-100 rounded-lg" />
                </div>

                {/* Total Count Skeleton */}
                <div className="w-40 h-4 bg-gray-200 rounded mt-6 mb-4" />

                {/* Products Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col justify-between min-h-[145px] shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0" />
                                <div className="flex flex-col gap-2">
                                    <div className="w-28 h-5 bg-gray-200 rounded" />
                                    <div className="w-16 h-3.5 bg-gray-100 rounded" />
                                </div>
                            </div>

                            <div className="mt-5 flex items-end justify-between">
                                <div className="flex flex-col gap-1.5">
                                    <div className="w-14 h-3 bg-gray-100 rounded" />
                                    <div className="w-20 h-6 bg-gray-200 rounded" />
                                </div>
                                <div className="w-16 h-6 bg-gray-100 rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
