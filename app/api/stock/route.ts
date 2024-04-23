// Components
import { NextResponse } from "next/server";

// Utils
import { convertCsvData } from "@/lib";

// Types
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Convert csv to array of objects
    const data = await convertCsvData("/data/stock-data.csv");

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Error retrieving data." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
