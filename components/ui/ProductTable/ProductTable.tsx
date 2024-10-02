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
import { useState, useReducer, useMemo } from "react";

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

// Segment reducer
type SegmentState = {
  showSegment1: boolean;
  showSegment2: boolean;
  showSegment3: boolean;
  showSegment4: boolean;
};

const TOGGLE_SEGMENT = "TOGGLE_SEGMENT";

type SegmentAction = { type: "TOGGLE_SEGMENT"; payload: keyof SegmentState };

const initialState: SegmentState = {
  showSegment1: false,
  showSegment2: false,
  showSegment3: false,
  showSegment4: false,
};

const segmentReducer = (state: SegmentState, action: SegmentAction) => {
  switch (action.type) {
    case TOGGLE_SEGMENT:
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };
    default:
      return state;
  }
};

export const ProductTable = <TData, TValue>({
  columns,
  data,
}: ProductTableProps<TData, TValue>) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [state, dispatch] = useReducer(segmentReducer, initialState);
  const { showSegment1, showSegment2, showSegment3, showSegment4 } = state;

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

  const toggleSegment = (segment: keyof SegmentState) => {
    dispatch({ type: TOGGLE_SEGMENT, payload: segment });
  };

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
      <div className="mb-2 lg:grid lg:grid-cols-3">
        <Input
          className="mb-2 lg:mb-0"
          placeholder="Search for a product"
          value={globalFilter}
          type="text"
          onChange={(e) => setGlobalFilter(String(e.target.value))}
        />
        <div className="mb-2 inline lg:mb-0 lg:ml-2 lg:block lg:place-self-start">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                Selecteer segment <ArrowDown className="ml-2 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                checked={showSegment1}
                onCheckedChange={() => toggleSegment("showSegment1")}
              >
                Segment 1
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showSegment2}
                onCheckedChange={() => toggleSegment("showSegment2")}
              >
                Segment 2
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showSegment3}
                onCheckedChange={() => toggleSegment("showSegment3")}
              >
                Segment 3
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showSegment4}
                onCheckedChange={() => toggleSegment("showSegment4")}
              >
                Segment 4
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="ml-2 inline lg:block lg:place-self-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="mr-1"
          >
            Vorige
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="ml-1"
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
