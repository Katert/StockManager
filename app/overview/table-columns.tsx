// Types
import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@/types";

// This defines the core of the Product table
export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Productnaam",
  },
  {
    accessorKey: "stockAmount",
    header: "Voorraad",
  },
  {
    accessorKey: "location",
    header: "Locatie",
  },
  {
    accessorKey: "shelfNumber",
    header: "Schapnummer",
  },
];
