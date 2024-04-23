// Types
import type { Product } from "@/types";

/**
 *
 * @param data An array of Product objects.
 * @returns A new array of Product objects, where each object now has a segment property.
 */
export const divideProductsInSegments = async (data: Product[]) => {
  let dividedData = data.map((product: Product) => {
    // If the Product ID is not divisible, place in segment 4.
    let segment = 4;

    // If the Product ID is divisible by 3 and 5, place in segment 3.
    if (product.id % 3 === 0 && product.id % 5 === 0) {
      segment = 3;
    }

    // If the Product ID is divisible by 3, place in segment 1.
    else if (product.id % 3 === 0) {
      segment = 1;
    }

    // If the Product ID is divisible by 5, place in segment 2.
    else if (product.id % 5 === 0) {
      segment = 2;
    }

    return {
      ...product,
      segment,
    };
  });

  return dividedData;
};
