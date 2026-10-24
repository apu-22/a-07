"use client";

import Link from "next/link";
import { signUp } from "@/lib/auth-client";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const handleSignUpPage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    console.log("userData", userData);

    const { data, error } = await signUp.email({
      name: userData.name as string,
      email: userData.email as string,
      password: userData.password as string,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Sign up failed");
    }
    if (data) {
      toast.success("Sign up successfully");
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] w-full bg-[#f4f7f4] flex flex-col justify-center items-center py-10 sm:py-16 px-4">
      {/* Title & Subtitle */}
      <div className="text-center mb-6 max-w-md">
        <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[430px] bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-6 sm:p-8">
        <Form className="flex flex-col gap-4" onSubmit={handleSignUpPage}>
          {/* Name */}
          <TextField
            isRequired
            name="name"
            fullWidth
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value.length < 3) {
                return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
              }
              return null;
            }}
          >
            <Label className="text-xs sm:text-sm font-semibold text-gray-800">
              নাম
            </Label>
            <Input
              placeholder="যেমন: রহিম উদ্দিন"
              fullWidth
              className="w-full !rounded-lg !border !border-gray-200 !bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:!border-[#058b42] focus:!ring-1 focus:!ring-[#058b42] transition"
            />
            <FieldError className="text-xs text-red-500 mt-0.5" />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            fullWidth
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "সঠিক ইমেইল ঠিকানা দিন";
              }
              return null;
            }}
          >
            <Label className="text-xs sm:text-sm font-semibold text-gray-800">
              ইমেইল
            </Label>
            <Input
              placeholder="you@example.com"
              fullWidth
              className="w-full !rounded-lg !border !border-gray-200 !bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:!border-[#058b42] focus:!ring-1 focus:!ring-[#058b42] transition"
            />
            <FieldError className="text-xs text-red-500 mt-0.5" />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            fullWidth
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
              }
              return null;
            }}
          >
            <Label className="text-xs sm:text-sm font-semibold text-gray-800">
              পাসওয়ার্ড
            </Label>
            <Input
              placeholder="কমপক্ষে ৮ অক্ষর"
              fullWidth
              className="w-full !rounded-lg !border !border-gray-200 !bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:!border-[#058b42] focus:!ring-1 focus:!ring-[#058b42] transition"
            />
            <FieldError className="text-xs text-red-500 mt-0.5" />
          </TextField>

          {/* Confirm Password */}
          <TextField
            isRequired
            minLength={8}
            name="confirmPassword"
            type="password"
            fullWidth
            className="flex flex-col gap-1.5"
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
              }
              return null;
            }}
          >
            <Label className="text-xs sm:text-sm font-semibold text-gray-800">
              পাসওয়ার্ড নিশ্চিত করুন
            </Label>
            <Input
              placeholder="আবার লিখুন"
              fullWidth
              className="w-full !rounded-lg !border !border-gray-200 !bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:!border-[#058b42] focus:!ring-1 focus:!ring-[#058b42] transition"
            />
            <FieldError className="text-xs text-red-500 mt-0.5" />
          </TextField>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            style={{ backgroundColor: "#058b42", color: "#ffffff" }}
            className="mt-2 w-full !bg-[#058b42] hover:!bg-[#047738] active:!bg-[#03642f] !text-white font-medium py-2.5 px-4 !rounded-lg text-sm sm:text-base transition-colors shadow-xs flex items-center justify-center cursor-pointer border-none"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Button>

          {/* Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <div className="w-full border-t border-gray-200"></div>
            <span className="absolute bg-white px-3 text-xs text-gray-400">
              অথবা
            </span>
          </div>

          {/* Social Sign-in Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-1.5 py-2 px-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 transition cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="truncate">Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-1.5 py-2 px-2 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 transition cursor-pointer"
            >
              <svg
                className="w-4 h-4 shrink-0 fill-current text-gray-900"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span className="truncate">GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          {/* Switch to Sign In */}
          <div className="text-center text-xs sm:text-sm text-gray-600 mt-4">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="text-[#058b42] hover:underline font-semibold"
            >
              সাইন ইন করুন
            </Link>
          </div>
        </Form>
      </div>

      {/* Return to Home link */}
      <div className="text-center mt-6">
        <Link
          href="/"
          className="inline-flex items-center text-xs sm:text-sm text-gray-500 hover:text-gray-800 transition"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;