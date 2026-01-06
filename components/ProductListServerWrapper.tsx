import { getProducts, type GetProductsParams } from "@/lib/actions";
import { sleep } from "@/lib/utils";

import { ProductList } from "./product-lits";

interface ProductListServerWrapperProps {
  params: GetProductsParams;
}

export async function ProductListServerWrapper({
  params,
}: ProductListServerWrapperProps) {
  await sleep(1000);
  const product = await getProducts(params);

  return <ProductList products={product} />;
}
