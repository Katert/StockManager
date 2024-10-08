// Types
import type { Product } from "@/types";

// Components
import { ProductTable } from "@/components/ui";

// Consts
import { columns } from "./table-columns";

const getData = async (): Promise<Product[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stock`,
      { cache: "no-store" }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product data", error);
    return [];
  }
};

export default async function Overview() {
  const data: Product[] = await getData();
  return (
    <section className="mx-16 lg:mx-48">
      <ProductTable columns={columns} data={data} />
    </section>
  );
}
