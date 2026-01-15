import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductList } from "@/components/product-lits";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getProductCount, getProducts } from "@/lib/actions";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const pageSize = 3;

export default async function HomePage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;

  // Parallel fetching - both queries run simultaneously
  const [total, products] = await Promise.all([
    getProductCount(),
    getProducts({ page, pageSize }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <main className="container mx-auto py-4">
      <Breadcrumbs items={[{ label: "Products", href: "/" }]} />

      <ProductList products={products} />

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`?page=${page - 1}`} />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href={`?page=${index + 1}`}
                isActive={page === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext href={`?page=${page + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
