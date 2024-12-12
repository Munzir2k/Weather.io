/** @format */

"use client";

import { useGlobalContext } from "@/app/context/GlobalContext";
import { gauge } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Pressure = () => {
    const { forecast } = useGlobalContext();
    const Pressure = forecast?.main?.pressure;

    if (!forecast || !Pressure) {
        return <Skeleton className="h-[12rem] w-full" />;
    }

    const getPressureDescription = (Pressure: number) => {
        if (Pressure < 1000) return "Very Low Pressure";
        if (Pressure >= 1000 && Pressure < 1015)
            return "Low Pressure. Expect weather change";
        if (Pressure >= 1015 && Pressure < 1025) return "Normal Pressure";
        if (Pressure >= 1025 && Pressure < 1040)
            return "High Pressure. Expect weather change";
        if (Pressure >= 1040) return "Very High Pressure";
        return "Unavailable: Pressure data not available.";
    };

    return (
        <div className="pt-3 px-4 h-[12rem] border rounded-lg flex flex-col gap-3 dark:bg-dark-gray shadow-sm dark:shadow-none">
            <div className="top">
                <h1 className="flex items-center gap-2 font-medium">
                    {gauge} Pressure
                </h1>
                <p className="text-2xl pt-4">{Pressure} hPa</p>
            </div>
            <p className="text-sm">{getPressureDescription(Pressure)}</p>
        </div>
    );
};

export default Pressure;
