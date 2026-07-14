import { allProducts as ecomatsProducts } from "@/lib/services/ecomats";
import { allProducts as jobtipsProducts } from "@/lib/services/jobtips";
import { allProducts as consultProducts } from "@/lib/services/consult";
import { categories as navCategories } from "@/app/(shop)/category/opsnav/data";
import type { Product } from "@/types/products";

export interface ApiProduct extends Product {
  categorySlug: string;
  categoryName: string;
}

const categoryMeta: Record<string, { name: string; slug: string }> = {
  ecomats: { name: "电商资源", slug: "ecomats" },
  jobtips: { name: "求职干货", slug: "jobtips" },
  consult: { name: "问题咨询", slug: "consult" },
};

const taggedEcomats: ApiProduct[] = ecomatsProducts.map((p) => ({
  ...p,
  categorySlug: "ecomats",
  categoryName: "电商资源",
}));

const taggedJobtips: ApiProduct[] = jobtipsProducts.map((p) => ({
  ...p,
  categorySlug: "jobtips",
  categoryName: "求职干货",
}));

const taggedConsult: ApiProduct[] = consultProducts.map((p) => ({
  ...p,
  categorySlug: "consult",
  categoryName: "问题咨询",
}));

export const allApiProducts: ApiProduct[] = [...taggedEcomats, ...taggedJobtips, ...taggedConsult];

export function getProductById(id: string): ApiProduct | undefined {
  return allApiProducts.find(
    (p) => p.id === id || p.link.endsWith(`/${id}`) || p.link.includes(id)
  );
}

export function searchProducts(query: string): ApiProduct[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allApiProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
  );
}

export function getProductsByCategory(slug: string): ApiProduct[] {
  if (slug === "ecomats") return taggedEcomats;
  if (slug === "jobtips") return taggedJobtips;
  if (slug === "consult") return taggedConsult;
  return allApiProducts.filter((p) => p.categorySlug === slug);
}

export function getUniqueCategories() {
  const cats = new Map<string, { slug: string; name: string; count: number }>();
  for (const p of allApiProducts) {
    const key = p.category || "未分类";
    if (!cats.has(key)) {
      cats.set(key, { slug: key, name: key, count: 1 });
    } else {
      cats.get(key)!.count++;
    }
  }
  return Array.from(cats.values());
}

export function getCategorySlugs() {
  return Object.entries(categoryMeta).map(([slug, meta]) => ({
    slug,
    name: meta.name,
  }));
}

export function getProductsMap(): Record<string, ApiProduct[]> {
  return {};
}

export function getNavCategories() {
  return navCategories;
}
