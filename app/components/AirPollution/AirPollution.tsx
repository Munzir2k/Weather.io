/** @format */

"use client";

import { useGlobalContext } from "@/app/context/GlobalContext";
import { air_pollution } from "@/app/utils/Icons";
import { AirQualityIndexText } from "@/app/utils/Misc";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const AirPollution = () => {
    const { airQuality } = useGlobalContext();

    // Check if airQuality is available
    if (!airQuality || !airQuality.list || !airQuality.list[0]) {
        return (
            <Skeleton className="h-[12rem] w-full col-span-2 sm-2:col-span-2 md:col-span-2 xl:col-span-2" />
        );
    }

    const airQualityIndex = airQuality.list[0].main.aqi * 10;
    const filteredIndex = AirQualityIndexText.find((item) => {
        return item.rating === airQualityIndex;
    });

    return (
        <div className="air-pollution col-span-full sm-2:col-span-2 pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-gray shadow-sm dark:shadow-none sm-2:col-span-2 md:col-span-2 xl:col-span-2">
            <h1 className="flex items-center gap-2 font-medium">
                {air_pollution} Air Pollution
            </h1>
            <Progress value={airQualityIndex} max={100} className="progress" />
            <p>Air Quality is {filteredIndex?.description} </p>
        </div>
    );
};

export default AirPollution;
