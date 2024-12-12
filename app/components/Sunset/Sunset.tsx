/** @format */

"use client";

import { useGlobalContext } from "@/app/context/GlobalContext";
import { sunrise, sunset } from "@/app/utils/Icons";
import { UnixToTime } from "@/app/utils/Misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Sunset = () => {
    const { forecast } = useGlobalContext();
    if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
        return <Skeleton className="h-[12rem] w-full" />;
    }
    const sunset_times = forecast?.sys?.sunset;
    const sunrise_times = forecast?.sys?.sunrise;
    const timezone = forecast?.timezone;
    const sunsetTime = UnixToTime(sunset_times, timezone);
    const sunriseTime = UnixToTime(sunrise_times, timezone);

    return (
        <div className="pt-3 px-4 h-[12rem] border rounded-lg flex flex-col gap-3 dark:bg-dark-gray shadow-sm dark:shadow-none">
            <div className="top">
                <h1 className="flex items-center gap-2 font-medium">
                    {sunrise} Sunrise
                </h1>
                <p className="pt-4 text-2xl">{sunriseTime}</p>
            </div>
            <div>
                <h1 className="flex items-center gap-2 font-medium">
                    {sunset} Sunset
                </h1>
                <p className="pt-4 text-2xl">{sunsetTime}</p>
            </div>
        </div>
    );
};

export default Sunset;
