/** @format */

"use client";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { thermometer } from "@/app/utils/Icons";
import { KelvinToCelcius } from "@/app/utils/Misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const FeelsLike = () => {
    const { forecast } = useGlobalContext();

    const FeelsLike = forecast?.main?.feels_like;
    const MinTemp = forecast?.main?.temp_min;
    const MaxTemp = forecast?.main?.temp_max;

    const FeelsLiketext = (
        feelsLike: number,
        minTemp: number,
        maxTemp: number
    ) => {
        const avgTemp = (minTemp + maxTemp) / 2;
        if (feelsLike > avgTemp - 5) {
            return "Feels significantly colder than the average temperature.";
        }
        if (feelsLike > avgTemp - 5 && feelsLike <= avgTemp + 5) {
            return "Feels close to actual temperature.";
        }
        if (feelsLike > avgTemp + 5) {
            return "Feels significantly warmer than the average temperature.";
        }
        return "Temperature feeling is typical for this range";
    };

    if (!forecast || !forecast?.main || !forecast?.main?.feels_like) {
        return <Skeleton className="h-[12rem] w-full" />;
    }

    const FeelsLikeDescription = FeelsLiketext(FeelsLike, MinTemp, MaxTemp);

    return (
        <div className="pt-3 px-4 h-[12rem] border rounded-lg flex flex-col gap-3 dark:bg-dark-gray shadow-sm dark:shadow-none">
            <div className="top">
                <h1 className="flex items-center gap-2 font-medium">
                    {thermometer} Feels Like
                </h1>
                <p className="text-2xl pt-4">{KelvinToCelcius(FeelsLike)}°C</p>
            </div>
            <p className="text-sm">{FeelsLikeDescription}</p>
        </div>
    );
};

export default FeelsLike;
