/** @format */

"use client";

import { useGlobalContext } from "@/app/context/GlobalContext";
import { people } from "@/app/utils/Icons";
import { formatNumber } from "@/app/utils/Misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Population = () => {
    const { fiveDayForecast } = useGlobalContext();
    const { city } = fiveDayForecast;

    if (!fiveDayForecast || !city) {
        return <Skeleton className="h-[12rem] w-full" />;
    }
    const { population } = city;
    const cityPopulation = population;
    return (
        <div className="pt-3 px-4 h-[12rem] border rounded-lg flex flex-col gap-3 dark:bg-dark-gray shadow-sm dark:shadow-none">
            <div className="top">
                <h1 className="flex items-center gap-2 font-medium">
                    {people} population
                </h1>
                <p className="pt-4 text-2xl">{formatNumber(cityPopulation)}</p>
            </div>
            <p className="text-sm">Latest UN population data for {city.name}</p>
        </div>
    );
};

export default Population;
