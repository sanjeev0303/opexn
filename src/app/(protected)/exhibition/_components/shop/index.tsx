"use client";

import { useTheme } from "next-themes";

import { MagicCard } from "../magicui/magic-card";

interface TextProps {
    text: string;
    className?: string;
}

export function MagicCardDemo ({ text } : TextProps, ) {
    const { theme } = useTheme();
    return (
        <div
            className={
                "flex h-[100px] w-[20vw] mt-4 flex-col gap-4 lg:h-[150px] lg:flex-row"
            }
        >
            <MagicCard
                className="cursor-pointer flex-col items-center justify-center whitespace-nowrap text-4xl"
                gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
                
            >
                { text }
            </MagicCard>
        </div>
    );
}
