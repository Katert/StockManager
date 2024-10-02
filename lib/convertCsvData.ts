// Lib
import path from "path";
import fs from "fs/promises";
import { parse } from "csv-parse/sync";

/**
 * Converts data from a CSV file into an array.
 *
 * @param folder - The folder in which the CSV file is located.
 * @param fileName - The file name of the CSV file. Use a relative path to the file.
 * @returns An array of objects representing each row of the CSV data.
 */
export const convertCsvData = async (fileName: string) => {
  try {
    // Path to the CSV file
    const filePath = path.join(process.cwd(), fileName);

    // Read CSV file content
    const fileContent = await fs.readFile(filePath, "utf8");

    // Parse CSV content into an array of objects
    const data = parse(fileContent, {
      columns: true,
    });

    return data;
  } catch (error) {
    return console.log(error);
  }
};
