export type Product = {
  id: number;
  location: string;
  shelfNumber: number;
  stockAmount: string | number;
  name: string;
};

/**
 * This type is used for the helper function that converts a row from the CSV data
 * to a Product object.
 **/
export type ProductFromCSV = {
  ID: string;
  ProductName: string;
  Location: string;
  ShelfNumber: string;
  StockAmount: string;
};
