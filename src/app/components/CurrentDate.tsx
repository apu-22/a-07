"use client";

import { useEffect, useState } from "react";

interface CurrentDateProps {
    className?: string;
}

export default function CurrentDate({ className }: CurrentDateProps) {
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        setDate(
            new Date().toLocaleDateString("bn-BD", {
                dateStyle: "full",
            })
        );
    }, []);

    return (
        <span className={className || "text-xs text-gray-500 font-medium leading-tight mt-0.5 min-h-[16px]"}>
            {date}
        </span>
    );
}
