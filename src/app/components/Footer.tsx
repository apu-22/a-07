export default function Footer() {
    return (
        <footer className="w-full bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between py-5 sm:py-6 gap-3 text-xs sm:text-sm text-gray-500">
                    <p className="text-center sm:text-left">
                        বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                    </p>
                    <p className="text-center sm:text-right">
                        সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                    </p>
                </div>
            </div>
        </footer>
    );
}