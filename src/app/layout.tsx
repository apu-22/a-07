import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর - আজকের নিত্যপ্রয়োজনীয় পণ্যের বাজার মূল্য",
  description: "দৈনিক নিত্যপ্রয়োজনীয় পণ্যের বাজার দর, দামের পরিবর্তন এবং বাজারভিত্তিক তুলনা এক নজরে।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />

        <Toaster />
        <main className="flex-1">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}
