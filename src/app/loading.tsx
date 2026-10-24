
export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-140px)] w-full bg-[#f8faf8] flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-3">
        <span className="loading loading-spinner loading-lg text-[#058b42]"></span>
        <p className="text-sm font-medium text-gray-600 animate-pulse">
          বাজার দর লোড হচ্ছে...
        </p>
      </div>
    </div>
  );
}