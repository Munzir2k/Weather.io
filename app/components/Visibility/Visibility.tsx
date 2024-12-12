/** @format */

"use client";

import { useGlobalContext } from "@/app/context/GlobalContext";
import { eye } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Visibility = () => {
    const { forecast } = useGlobalContext();
    const { visibility } = forecast;

    if (!forecast || !visibility) {
        return <Skeleton className="h-[12rem] w-full" />;
    }
    const visibilityText = (visibility: number) => {
        const visibilityKm = Math.round(visibility / 1000);
        if (visibilityKm > 10) {
            return "Excellent: Clear and vast view.";
        } else if (visibilityKm > 5) {
            return "Good: Easily navigable.";
        } else if (visibilityKm > 2) {
            return "Moderate: Some limitation.";
        } else if (visibilityKm <= 1) {
            return "Poor: Restricted and unclear.";
        } else {
            return "Unavailable: Visibility data not available.";
        }
    };

    return (
        <div className="pt-3 px-4 h-[12rem] border rounded-lg flex flex-col gap-3 dark:bg-dark-gray shadow-sm dark:shadow-none">
            <div className="top">
                <h1 className="flex items-center gap-2 font-medium">
                    {eye} Visibility
                </h1>
                <p className="text-2xl pt-4">
                    {Math.round(visibility / 1000)} Km
                </p>
            </div>
            <p className="text-sm">
                {visibilityText(Math.round(visibility / 1000))}
            </p>
        </div>
    );
};

export default Visibility;
