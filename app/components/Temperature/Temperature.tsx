/** @format */

"use client";
import { useGlobalContext } from "@/app/context/GlobalContext";
import {
    clearSky,
    cloudy,
    drizzleIcon,
    navigation,
    rain,
    snow,
} from "@/app/utils/Icons";
import { KelvinToCelcius } from "@/app/utils/Misc";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";

const Temperature = () => {
    const { forecast, fiveDayForecast } = useGlobalContext();
    const { minMaxTemp } = useGlobalContext();
    const { main, timezone, weather } = forecast;
    const { city } = fiveDayForecast;

    const temp = KelvinToCelcius(main?.temp);
    const min_temp = minMaxTemp?.daily?.temperature_2m_min[0].toFixed(0);
    const max_temp = minMaxTemp?.daily?.temperature_2m_max[0].toFixed(0);

    const cityName = city?.name;
    const countryName = city?.country;

    // State
    const [localTime, setLocalTime] = useState<string>("");
    const [currentDay, setCurrentDay] = useState<string>("");

    const { main: weatherMain, description } = weather[0];

    const getIcon = () => {
        switch (weatherMain) {
            case "Drizzle":
                return drizzleIcon;
            case "Rain":
                return rain;
            case "Snow":
                return snow;
            case "Clear":
                return clearSky;
            case "Clouds":
                return cloudy;
            default:
                return clearSky;
        }
    };

    if (!forecast || !weather) {
        return <Skeleton className="h-[25rem] w-full" />;
    }

    // Live time update
    useEffect(() => {
        const inverval = setInterval(() => {
            const localMoment = moment().utcOffset(timezone / 60);
            // custom format
            const formattedTime = localMoment.format("hh:mm:ss A");

            // day of the week
            const day = localMoment.format("dddd");

            setLocalTime(formattedTime);
            setCurrentDay(day);
        }, 1000);
    }, []);

    return (
        <div className="pt-6 pb-5 h-[25rem] px-4 border rounded-lg flex flex-col justify-between dark:bg-dark-gray shadow-sm dark:shadow-none">
            <p className="flex justify-between items-center">
                <span className="font-medium">{currentDay}</span>
                <span className="font-medium">{localTime}</span>
            </p>
            <p className="pt-9 font-bold flex gap-1">
                <span>
                    {cityName}, {countryName}
                </span>
                <span>{navigation}</span>
            </p>
            <p className="pt-9 pb-5 text-9xl font-bold self-center">{temp}°</p>

            <div>
                <div>
                    <span>{getIcon()}</span>
                    <p className="pt-2 capitalize text-lg font-medium">
                        {description}
                    </p>
                </div>
                <p className="">
                    <span className="pr-2">Low:{min_temp}°</span>
                    <span>Max: {max_temp}°</span>
                </p>
            </div>
        </div>
    );
};

export default Temperature;
