// app/category/consult/custsvc/page.tsx
"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductDetailHero from "@/components/product/ProductDetailHero";
import ProductDetailGrid from "@/components/product/ProductDetailGrid";
import { useProductGroups } from "@/hooks/useProductGroups";
import { allProducts, defaultSectionTitles } from "@/lib/services/consult";

const filteredProducts = allProducts.filter((p) => p.category === "定制服务");

export default function CategoryPage() {
  const { groups, heroProduct } = useProductGroups({
    products: filteredProducts,
    sectionTitles: defaultSectionTitles,
  });

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
              <BreadcrumbLink href="category/consult" className="hover:text-foreground transition-colors">
                问题咨询
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="text-foreground">
                定制服务
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {heroProduct && <ProductDetailHero product={heroProduct} showThumbnails />}

      {groups.length === 0 ? (
        <div className="text-center py-20 text-gray-400">暂无商品</div>
      ) : (
        groups.map((group) => (
          <ProductDetailGrid
            key={group.title}
            title={group.title}
            products={group.products}
          />
        ))
      )}
    </div>
  );
}
