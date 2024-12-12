/** @format */

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

        const city = searchParams.get("search");
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;

        const res = await axios.get(url);

        return NextResponse.json(res.data);
    } catch (error) {
        console.log("Error in fetching geo coords", error);
        return new Response("Error in fetching geo coords", { status: 500 });
    }
}
