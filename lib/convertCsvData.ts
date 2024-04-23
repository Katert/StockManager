// Lib
import path from "path";
import fs from "fs/promises";
import { parse } from "csv-parse/sync";

/**
 * Converts data from a CSV file into an array.
 *
 * @param folder - The folder in which the CSV file is located.
 * @param fileName - The file name of the CSV file.
 * @returns An array of objects representing each row of the CSV data.
 */
export const convertCsvData = async (relativePath: string) => {
  try {
    // Path to the CSV file
    const filePath = path.join(process.cwd(), relativePath);

    // Read CSV file content
    const fileContent = await fs.readFile(filePath, "utf8");

    // Parse CSV content into an array of objects
    const data = parse(fileContent, {
      columns: true,
    });

    console.log(data);
    return data;
  } catch (error) {
    return console.log(error);
  }
};
