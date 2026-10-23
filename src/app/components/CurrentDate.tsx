"use client";

import { useEffect, useState } from "react";

export default function CurrentDate() {
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        setDate(
            new Date().toLocaleDateString("bn-BD", {
                dateStyle: "full",
            })
        );
    }, []);

    return (
        <p className="text-xs text-gray-500 font-medium leading-tight mt-0.5 min-h-[16px]">
            {date}
        </p>
    );
}
