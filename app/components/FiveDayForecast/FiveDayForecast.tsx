/** @format */

"use client";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { calender } from "@/app/utils/Icons";
import { KelvinToCelcius, UnixToDay } from "@/app/utils/Misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const FiveDayForecast = () => {
    const { fiveDayForecast } = useGlobalContext();
    const { city, list } = fiveDayForecast;

    if (!fiveDayForecast || !city || !list) {
        return <Skeleton className="h-[12rem] w-full" />;
    }

    const processData = (
        dailyData: {
            main: { temp_min: number; temp_max: number };
            dt: number;
        }[]
    ) => {
        let minTemp = Number.MAX_VALUE;
        let maxTemp = Number.MIN_VALUE;

        dailyData.forEach(
            (day: {
                main: { temp_min: number; temp_max: number };
                dt: number;
            }) => {
                if (day.main.temp_min < minTemp) minTemp = day.main.temp_min;
                if (day.main.temp_max > maxTemp) maxTemp = day.main.temp_max;
            }
        );

        return {
            day: UnixToDay(dailyData[0].dt),
            minTemp: KelvinToCelcius(minTemp),
            maxTemp: KelvinToCelcius(maxTemp),
        };
    };

    const dailyForecasts = [];

    for (let i = 0; i < 40; i += 8) {
        const dailyData = list.slice(i, i + 8);
        dailyForecasts.push(processData(dailyData));
    }

    return (
        <div className="pt-4 pb-5 px-4 flex-1 border rounded-lg flex flex-col justify-between dark:bg-dark-gray shadow-sm dark:shadow-none">
            <div className="top">
                <h1 className="flex items-center gap-2 font-medium">
                    {calender} 5-Day Forecast for {city.name}
                </h1>

                <div className="forecast-list pt-2">
                    {dailyForecasts.map((day, index) => {
                        return (
                            <div
                                key={index}
                                className="daily-forecast py-4 flex flex-col justify-evenly border-b-2"
                            >
                                <p className="text-xl min-w-[3.5rem]">
                                    {day.day}
                                </p>
                                <p className="text-sm flex justify-between">
                                    <span>(low)</span>
                                    <span>(high)</span>
                                </p>
                                <div className="flex flex-1 items-center justify-between gap-4">
                                    <p className="font-bold">{day.minTemp}°C</p>
                                    <div className="temperature flex-1 w-full h-2 rounded-lg" />
                                    <p className="font-bold">{day.maxTemp}°C</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FiveDayForecast;
