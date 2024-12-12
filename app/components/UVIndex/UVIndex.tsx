/** @format */

"use client";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { sun } from "@/app/utils/Icons";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const UVIndex = () => {
    const { uvIndex } = useGlobalContext();

    const { daily } = uvIndex;
    const { uv_index_max } = daily;
    const UvIndexMax = uv_index_max[0].toFixed(0);

    const uvIndexCategory = (uvIndex: number) => {
        if (uvIndex <= 2) {
            return {
                text: "Low",
                description: "No protection required",
            };
        } else if (uvIndex <= 5) {
            return {
                text: "Moderate",
                description: "Stay in shades",
            };
        } else if (uvIndex <= 7) {
            return {
                text: "High",
                description: "Wear hats and sunglasses",
            };
        } else if (uvIndex <= 10) {
            return {
                text: "Very High",
                description: "Wear SPF 30+ sunscreen",
            };
        } else {
            return {
                text: "Extreme",
                description: "Avoid sunlight or heavy exposure",
            };
        }
    };
    const uvIndexPercent = (UvIndexMax / 10) * 100;

    if (!uvIndex || !uvIndex.daily) {
        return <Skeleton className="h-[12rem] w-full" />;
    }

    return (
        <div className="pt-3 px-4 h-[12rem] border rounded-lg flex flex-col gap-3 dark:bg-dark-gray shadow-sm dark:shadow-none">
            <div className="top">
                <h1 className="flex items-center gap-2 font-medium">
                    {sun} UV Index
                </h1>
                <div className="pt-4 flex flex-col gap-1">
                    <p className="pt-4 text-2xl">
                        {UvIndexMax}
                        <span className="text-sm">
                            ({uvIndexCategory(UvIndexMax).text})
                        </span>
                    </p>
                    <Progress
                        className="progress"
                        max={10}
                        value={uvIndexPercent}
                    />
                </div>
            </div>
            <p className="text-sm">{uvIndexCategory(UvIndexMax).description}</p>
        </div>
    );
};

export default UVIndex;
