/** @format */

"use client";
import {
    useGlobalContext,
    useGlobalContextUpdate,
} from "@/app/context/GlobalContext";
import { commandIcon } from "@/app/utils/Icons";
import { Button } from "@/components/ui/button";
import { Command } from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";

function SearchDialog() {
    const { geoLocationList, inputValue, handleInput } = useGlobalContext();
    const { setActiveCityCoords } = useGlobalContextUpdate();

    const [hoveredIndex, setHoveredIndex] = useState<number>(0);

    const getClickedCoord = (lat: number, lon: number) => {
        setActiveCityCoords([lat, lon]);
    };

    return (
        <div className="search-btn">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200"
                    >
                        <p className="text-sm text-muted-foreground">
                            Search Here...
                        </p>
                        <div className="command dark:bg-[#262626] bg-slate-200  py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
                            {commandIcon}
                            <span className="text-[9px]">F</span>
                        </div>
                    </Button>
                </DialogTrigger>

                <DialogContent className="p-0">
                    <Command className="rounded-lg border shadow-md">
                        <div className="flex items-center px-3 justify-center">
                            <Search className="mr-2 h-5 w-5 text-muted-foreground" />
                            <Input
                                className="py-3 border-none focus-visible:ring-0"
                                value={inputValue}
                                onChangeCapture={handleInput}
                                placeholder="Type a command or search..."
                            />
                        </div>
                        <ul className="px-3 pb-2">
                            <p className="p-2 text-sm text-muted-foreground">
                                Suggestions
                            </p>

                            {geoLocationList.length === 0 && (
                                <p className="text-lg text-red-500 text-center">
                                    No Suggestion
                                </p>
                            )}

                            {geoLocationList.map(
                                (
                                    items: {
                                        name: string;
                                        state: string;
                                        country: string;
                                        lat: number;
                                        lon: number;
                                    },
                                    index: number
                                ) => {
                                    const { name, state, country } = items;
                                    return (
                                        <li
                                            key={index}
                                            onMouseEnter={() =>
                                                setHoveredIndex(index)
                                            }
                                            className={`py-3 px-2 text-sm  rounded-sm cursor-default ${
                                                hoveredIndex === index
                                                    ? "bg-accent"
                                                    : ""
                                            }
                      `}
                                            onClick={() => {
                                                getClickedCoord(
                                                    items.lat,
                                                    items.lon
                                                );
                                            }}
                                        >
                                            <p className=" text">
                                                {name}, {state && state},
                                                {country}
                                            </p>
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </Command>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default SearchDialog;
