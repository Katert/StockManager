"use client";

// Assets
import { ArrowDown } from "lucide-react";

// Components
import {
  Button,
  Input,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/shadcn";

// Types
import type { ColumnDef } from "@tanstack/react-table";

// Hooks
import { useReactTable } from "@tanstack/react-table";
import { useState, useMemo } from "react";

// Util
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

interface ProductTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const ProductTable = <TData, TValue>({
  columns,
  data,
}: ProductTableProps<TData, TValue>) => {
  const [globalFilter, setGlobalFilter] = useState("");

  const [showSegment1, setShowSegment1] = useState<boolean>(false);
  const [showSegment2, setShowSegment2] = useState<boolean>(false);
  const [showSegment3, setShowSegment3] = useState<boolean>(false);
  const [showSegment4, setShowSegment4] = useState<boolean>(false);

  const filteredData = useMemo(() => {
    // If none of the segments are selected, return all data.
    if (!showSegment1 && !showSegment2 && !showSegment3 && !showSegment4) {
      return data;
    }

    // Filter data to only include the products from the active segments.
    return data.filter((product: any) => {
      return (
        (showSegment1 && product.segment === 1) ||
        (showSegment2 && product.segment === 2) ||
        (showSegment3 && product.segment === 3) ||
        (showSegment4 && product.segment === 4)
      );
    });
  }, [showSegment1, showSegment2, showSegment3, showSegment4, data]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      globalFilter,
    },
  });

  return (
    <>
      <div className="mb-2 grid grid-cols-3">
        <Input
          placeholder="Search for a product"
          value={globalFilter}
          type="text"
          onChange={(e) => setGlobalFilter(String(e.target.value))}
        />
        <div className="ml-2 place-self-start">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                Selecteer segment <ArrowDown className="ml-2 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                checked={showSegment1}
                onCheckedChange={() => setShowSegment1(!showSegment1)}
              >
                Segment 1
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showSegment2}
                onCheckedChange={() => setShowSegment2(!showSegment2)}
              >
                Segment 2
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showSegment3}
                onCheckedChange={() => setShowSegment3(!showSegment3)}
              >
                Segment 3
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showSegment4}
                onCheckedChange={() => setShowSegment4(!showSegment4)}
              >
                Segment 4
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="place-self-end child:mx-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Vorige
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Volgende
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Geen resultaten.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
