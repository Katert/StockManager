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
    const PRODUCT_ID_DIVISIBLE_BY_THREE = product.id % 3 === 0;
    const PRODUCT_ID_DIVISIBLE_BY_FIVE = product.id % 5 === 0;

    if (PRODUCT_ID_DIVISIBLE_BY_THREE && PRODUCT_ID_DIVISIBLE_BY_FIVE) {
      segment = 3;
    } else if (PRODUCT_ID_DIVISIBLE_BY_THREE) {
      segment = 1;
    } else if (PRODUCT_ID_DIVISIBLE_BY_FIVE) {
      segment = 2;
    }

    return {
      ...product,
      segment,
    };
  });

  return dividedData;
};
