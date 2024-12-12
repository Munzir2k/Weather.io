/** @format */

"use client";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { droplets } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Humidity = () => {
    const { forecast } = useGlobalContext();
    const humidity = forecast?.main?.humidity;

    if (!forecast || !humidity) {
        return <Skeleton className="h-[12rem] w-full" />;
    }

    const getHumidityDescription = (humidity: number) => {
        if (humidity < 30) {
            return "Dry: Apply skin care products to prevent dryness.";
        }
        if (humidity >= 30 && humidity < 50) {
            return "Comfortable: Ideal for most people.";
        }
        if (humidity >= 50 && humidity <= 70) {
            return "Moderate: Strickly, may increase allergens.";
        }
        if (humidity > 70) {
            return "High: Uncomfortable, mold growth risk.";
        }
        return "Unavailable: Humidity data not available.";
    };
    return (
        <div className="pt-3 px-4 h-[12rem] border rounded-lg flex flex-col gap-3 dark:bg-dark-gray shadow-sm dark:shadow-none">
            <div className="top">
                <h1 className="flex items-center gap-2 font-medium">
                    {droplets} Humidity
                </h1>
                <p className="text-2xl pt-4">{humidity} %</p>
            </div>
            <p className="text-sm">{getHumidityDescription(humidity)}</p>
        </div>
    );
};

export default Humidity;
