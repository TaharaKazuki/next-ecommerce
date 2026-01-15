import { getProducts, type GetProductsParams } from "@/lib/actions";

import { ProductList } from "./product-lits";

interface ProductListServerWrapperProps {
  params: GetProductsParams;
}

export async function ProductListServerWrapper({
  params,
}: ProductListServerWrapperProps) {
  const product = await getProducts(params);

  return <ProductList products={product} />;
}
