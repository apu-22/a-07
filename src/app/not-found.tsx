"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-200px)] bg-[#f8faf8] flex items-center justify-center px-4 py-12 sm:py-20">
      <div className="max-w-xl w-full text-center">
        {/* Animated / SVG Grocery Basket Icon */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-xs">
            <svg
              className="w-14 h-14 sm:w-16 sm:h-16 text-[#058b42]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>

          {/* 404 badge */}
          <span className="absolute -bottom-2 -right-2 bg-[#058b42] text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-md">
            ৪০৪
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-3">
          কাঙ্ক্ষিত পাতা বা পণ্যটি খুঁজে পাওয়া যায়নি!
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
          আপনি যে পাতা বা পণ্যটি খুঁজছেন তা হয়তো সরানো হয়েছে, মুছে ফেলা হয়েছে অথবা আপনি ভুল লিংকে প্রবেশ করেছেন।
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#058b42] hover:bg-[#047738] text-white text-sm font-semibold shadow-xs transition cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            হোম পেজে ফিরে যান
          </Link>

          <button
            type="button"
            onClick={() => router.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold shadow-xs transition cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            পেছনে যান
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-6 border-t border-gray-200/60 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
          <span>প্রয়োজনীয় লিংক:</span>
          <Link href="/" className="hover:text-[#058b42] hover:underline transition">
            আজকের বাজার দর
          </Link>
          <span>•</span>
          <Link href="/profile" className="hover:text-[#058b42] hover:underline transition">
            আমার প্রোফাইল
          </Link>
          <span>•</span>
          <Link href="/sign-in" className="hover:text-[#058b42] hover:underline transition">
            সাইন ইন
          </Link>
        </div>
      </div>
    </div>
  );
}