/** @format */

"use client";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { clearSky, cloudy, drizzleIcon, rain, snow } from "@/app/utils/Icons";
import { KelvinToCelcius } from "@/app/utils/Misc";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import moment from "moment";
import React from "react";

const DailyForecast = () => {
    const { forecast, fiveDayForecast } = useGlobalContext();
    const { city, list } = fiveDayForecast;
    const { weather } = forecast;

    if (!fiveDayForecast || !city || !list) {
        return (
            <Skeleton className="h-[12rem] w-full col-span-2 sm-2:col-span-2 md:col-span-2 xl:col-span-2" />
        );
    }

    if (!forecast || !weather) {
        return (
            <Skeleton className="h-[12rem] w-full col-span-2 sm-2:col-span-2 md:col-span-2 xl:col-span-2" />
        );
    }

    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    const todaysForecast = list.filter(
        (forecast: { dt_txt: string; main: { temp: number } }) => {
            return forecast.dt_txt.startsWith(todayString);
        }
    );

    const { main: weatherMain } = weather[0];
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
    return (
        <div className="pt-6 px-6 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-gray shadow-sm dark:shadow-none sm-2:col-span-2 md:col-span-2 xl:col-span-2">
            <div className="h-full flex gap-10 overflow-hidden">
                {todaysForecast.length < 1 ? (
                    <div>no data</div>
                ) : (
                    <div className="w-full">
                        <Carousel>
                            <CarouselContent>
                                {todaysForecast.map(
                                    (forecast: {
                                        dt_txt: string;
                                        main: { temp: number };
                                    }) => {
                                        return (
                                            <CarouselItem
                                                key={forecast.dt_txt}
                                                className="flex flex-col gap-4 basis-[8.5rem] cursor-grab"
                                            >
                                                <p className=" text-gray-300">
                                                    {moment(
                                                        forecast.dt_txt
                                                    ).format("hh:mm A")}
                                                </p>
                                                <p>{getIcon()}</p>
                                                <p className="mt-4">
                                                    {KelvinToCelcius(
                                                        forecast.main.temp
                                                    )}
                                                    °C
                                                </p>
                                            </CarouselItem>
                                        );
                                    }
                                )}
                            </CarouselContent>
                        </Carousel>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DailyForecast;
