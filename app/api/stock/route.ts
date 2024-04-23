// Components
import { NextResponse } from "next/server";

// Types
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Convert csv to array of objects
    // JSON.stringify array and Return NextRespsonse
    return new NextResponse(null, {
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
