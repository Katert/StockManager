// Components
import { NextResponse } from "next/server";

// Utils
import { convertCsvData, divideProductsInSegments } from "@/lib";

// Types
import type { NextRequest } from "next/server";
import type { Product, ProductFromCSV } from "@/types";

export async function GET(request: NextRequest) {
  try {
    // Convert csv to array of objects
    const data = await convertCsvData("/data/stock-data.csv");

    // Helper function to convert a row in the CSV to a Product object so that keys are matching.
    const convertCsvProduct = (csvProduct: ProductFromCSV): Product => {
      return {
        id: parseInt(csvProduct.ID),
        location: csvProduct.Location,
        shelfNumber: parseInt(csvProduct.ShelfNumber),
        stockAmount: parseInt(csvProduct.StockAmount),
        name: csvProduct.ProductName,
      };
    };

    // Add a segment property to each product object before returning data
    const products = await divideProductsInSegments(
      data.map(convertCsvProduct)
    );

    return new NextResponse(JSON.stringify(products), {
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
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );
  }
}
