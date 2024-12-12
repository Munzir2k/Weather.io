/** @format */

"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import DefaultState from "../utils/DefaultState";
import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
    // forecast states
    const [forecast, setForecast] = useState({});
    // air quality states
    const [airQuality, setAirQuality] = useState({});
    // five day forecast states
    const [fiveDayForecast, setFiveDayForecast] = useState({});
    // uv index states
    const [uvIndex, setUvIndex] = useState({});
    // minMaxTemp states
    const [minMaxTemp, setMinMaxTemp] = useState({});
    // current location states
    const [geoLocationList, setGeoLocationList] = useState(DefaultState);
    // Input value states
    const [inputValue, setInputValue] = useState("");
    // Active city Coods states
    const [activeCityCoords, setActiveCityCoords] = useState([
        51.5073219, -0.1276474,
    ]);

    // fetch forecast
    const fetchForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}`);
            setForecast(res.data);
        } catch (error) {
            console.log("Error fetching forecast", error.message);
        }
    };

    // fetch air quality
    const fetchAirQuality = async (lat, lon) => {
        try {
            const res = await axios.get(`api/pollution?lat=${lat}&lon=${lon}`);
            setAirQuality(res.data);
        } catch (error) {
            console.log("Error fetching air quality", error.message);
        }
    };

    // fetch five day forecast
    const fetchFiveDayForecast = async (lat, lon) => {
        try {
            const res = await axios.get(`api/fiveday?lat=${lat}&lon=${lon}`);
            setFiveDayForecast(res.data);
        } catch (error) {
            console.log("Error fetching five day forecast", error.message);
        }
    };

    // fetch uv index
    const fetchUvIndex = async (lat, lon) => {
        try {
            const res = await axios.get(`api/uv?lat=${lat}&lon=${lon}`);
            setUvIndex(res.data);
        } catch (error) {
            console.log("Error fetching uv index", error.message);
        }
    };

    // fetch minMaxTemp
    const fetchMinMaxTemp = async (lat, lon) => {
        try {
            const res = await axios.get(`api/minMaxTemp?lat=${lat}&lon=${lon}`);
            setMinMaxTemp(res.data);
        } catch (error) {
            console.log("Error fetching minMaxTemp", error.message);
        }
    };

    // handle Input
    const handleInput = (e) => {
        setInputValue(e.target.value);

        if (e.target.value === "") {
            setGeoLocationList(DefaultState);
        }
    };

    // fetch geoCoordsList
    const fetchGeoCodedList = async (search) => {
        try {
            const res = await axios.get(`api/geoCoded?search=${search}`);
            setGeoLocationList(res.data);
        } catch (error) {
            console.log("Error fetching geoCoordsList", error.message);
        }
    };

    // debounce function
    useEffect(() => {
        const debouncedFetch = debounce((search) => {
            fetchGeoCodedList(search);
        }, 500);

        if (inputValue) {
            debouncedFetch(inputValue);
        }

        // cleanup
        return () => debouncedFetch.cancel();
    }, [inputValue]);

    useEffect(() => {
        fetchForecast(activeCityCoords[0], activeCityCoords[1]);
        fetchAirQuality(activeCityCoords[0], activeCityCoords[1]);
        fetchFiveDayForecast(activeCityCoords[0], activeCityCoords[1]);
        fetchUvIndex(activeCityCoords[0], activeCityCoords[1]);
        fetchMinMaxTemp(activeCityCoords[0], activeCityCoords[1]);
    }, [activeCityCoords]);
    return (
        <GlobalContext.Provider
            value={{
                forecast,
                airQuality,
                fiveDayForecast,
                uvIndex,
                minMaxTemp,
                geoLocationList,
                inputValue,
                handleInput,
                setActiveCityCoords,
            }}
        >
            <GlobalContextUpdate.Provider
                value={{
                    setActiveCityCoords,
                }}
            >
                {children}
            </GlobalContextUpdate.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
