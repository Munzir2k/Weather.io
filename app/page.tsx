/** @format */

import AirPollution from "./components/AirPollution/AirPollution";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import FeelsLike from "./components/FeelsLike/FeelsLike";
import FiveDayForecast from "./components/FiveDayForecast/FiveDayForecast";
import Humidity from "./components/Humidity/Humidity";
import Mapbox from "./components/Mapbox/Mapbox";
import Navbar from "./components/Navbar";
import Population from "./components/Population/Population";
import Pressure from "./components/Pressure/Pressure";
import Sunset from "./components/Sunset/Sunset";
import Temperature from "./components/Temperature/Temperature";
import UVIndex from "./components/UVIndex/UVIndex";
import Visibility from "./components/Visibility/Visibility";
import Wind from "./components/Wind/Wind";
import DefaultState from "./utils/DefaultState";

export default function Home() {
    return (
        <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
            <Navbar />

            <div className="flex flex-col gap-4 pb-4 md:flex-row">
                <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
                    <Temperature />
                    <FiveDayForecast />
                </div>
                <div className="flex flex-col w-full ">
                    <div className="instruments grid  gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
                        <AirPollution />
                        <Sunset />
                        <Wind />
                        <DailyForecast />
                        <UVIndex />
                        <Population />
                        <FeelsLike />
                        <Humidity />
                        <Visibility />
                        <Pressure />
                    </div>
                    <div className="mapbox-con mt-4 gap-4 flex">
                        <Mapbox />
                        <div className="states flex flex-col gap-3 flex-1">
                            <h1 className="flex items-center gap-2 font-medium">
                                Top Large Cities
                            </h1>
                            <div className="flex flex-col gap-4">
                                {DefaultState.map((state, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="border rounded-lg cursor-pointer dark:bg-dark-gray shadow-sm dark:shadow-none"
                                        >
                                            <p className="px-6 py-4">
                                                {state.name}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="flex py-8 justify-center pb-6">
                <p className="footer-text text-sm flex items-center gap-1">
                    Made by <a className="font-bold text-green-500">Munzir</a>
                </p>
            </footer>
        </main>
    );
}
