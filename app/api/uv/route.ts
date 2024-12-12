/** @format */

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const lat = searchParams.get("lat");
        const lon = searchParams.get("lon");

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max&timezone=auto&forecast_days=1`;

        const res = await axios.get(url);
        return NextResponse.json(res.data);
    } catch (error) {
        console.log("Error in fetching uv index data", error);
        return new Response("Error in fetching uv index data", { status: 500 });
    }
}
