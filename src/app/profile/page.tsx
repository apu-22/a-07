"use client";

import { signOut, updateUser, useSession } from "@/lib/auth-client";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const { data: session, isPending } = useSession();

    const handleSignOut = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.href = "/";
                },
            },
        });
    };

    const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const changeData = Object.fromEntries(formData.entries());

        const { data: updatedUser, error } = await updateUser({
            name: changeData.name as string,
        });

        if (error) {
            toast.error(error.message || "Something went wrong");
        }
        if (updatedUser) {
            toast.success("Profile updated successfully");
        }
    };

    if (isPending) {
        return (
            <div className="min-h-[calc(100vh-140px)] w-full bg-[#f4f7f4] py-10 sm:py-14 px-4 flex justify-center">
                <div className="w-full max-w-[620px] flex flex-col gap-5">
                    <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-md"></div>
                    <div className="h-28 w-full bg-white rounded-2xl shadow-xs animate-pulse"></div>
                    <div className="h-56 w-full bg-white rounded-2xl shadow-xs animate-pulse"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-140px)] w-full bg-[#f4f7f4] py-10 sm:py-14 px-4 flex justify-center">
            <div className="w-full max-w-[620px]">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        আমার প্রোফাইল
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                {/* Profile Card */}
                <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] p-5 sm:p-6 mb-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                            <img
                                src={
                                    session?.user?.image ||
                                    "https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                                }
                                alt={session?.user?.name || "User"}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="min-w-0">
                            <h2 className="font-bold text-gray-900 text-base sm:text-lg truncate">
                                {session?.user?.name || "ব্যবহারকারী"}
                            </h2>
                            <p className="text-xs sm:text-sm text-gray-400 truncate mt-0.5">
                                {session?.user?.email}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 border border-red-200 hover:border-red-300 rounded-xl text-xs sm:text-sm font-medium text-[#e55353] hover:bg-red-50/60 transition cursor-pointer"
                    >
                        <svg
                            className="w-4 h-4 text-[#e55353] shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="9 10 4 15 9 20" />
                            <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                        </svg>
                        <span>সাইন আউট</span>
                    </button>
                </div>

                {/* Edit Information Card */}
                <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] p-5 sm:p-6">
                    <h3 className="font-bold text-gray-900 text-base mb-4">
                        তথ্য
                    </h3>

                    <Form className="flex flex-col gap-4" onSubmit={handleUpdateUser}>
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
                                key={session?.user?.name}
                                placeholder={"আপনার নাম লিখুন"}
                                fullWidth
                                className="w-full !rounded-lg !border !border-gray-200 !bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:!border-[#058b42] focus:!ring-1 focus:!ring-[#058b42] transition"
                            />
                            <FieldError className="text-xs text-red-500 mt-0.5" />
                        </TextField>

                        <Button
                            type="submit"
                            fullWidth
                            style={{ backgroundColor: "#058b42", color: "#ffffff" }}
                            className="mt-2 w-full !bg-[#058b42] hover:!bg-[#047738] active:!bg-[#03642f] !text-white font-medium py-2.5 px-4 !rounded-xl text-sm sm:text-base transition-colors shadow-xs flex items-center justify-center cursor-pointer border-none"
                        >
                            আপডেট
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;