"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import SortSelect from "@/components/shared/SortSelect";
import Pagination from "@/components/shared/Pagination";
import EcomMatsGrid from "@/components/product/EcomMatsGrid";
import { useProductListing } from "@/hooks/useProductListing";
import { allProducts } from "@/lib/services/jobtips";

const intskillsCategories = ["面试技巧"];
const filtered = allProducts.filter((p) => p.category && intskillsCategories.includes(p.category));

export default function CategoryPage() {
  const {
    currentPage,
    setCurrentPage,
    selectedSort,
    totalPages,
    currentProducts,
    handleSortSelect,
  } = useProductListing({ products: filtered });

  return (
    <div className="min-h-screen bg-white text-black antialiased">
      <div className="max-w-7xl mx-auto px-10 py-7 flex flex-wrap justify-between items-center gap-3">
        <Breadcrumb>
          <BreadcrumbList className="text-sm text-muted-foreground">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="hover:text-foreground transition-colors">
                主页
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/category/jobtips" className="hover:text-foreground transition-colors">
                 求职干货
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="text-foreground">
                面试技巧
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SortSelect value={selectedSort} onChange={handleSortSelect} />
      </div>

      <EcomMatsGrid products={currentProducts} currentPage={currentPage} />
      <Pagination
        current={currentPage}
        total={totalPages}
        onChange={setCurrentPage}
      />
    </div>
  );
}