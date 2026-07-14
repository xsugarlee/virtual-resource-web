"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allApiProducts } from "@/lib/services/api-data";
import Pagination from "@/components/shared/Pagination";

interface SearchViewProps {
  readonly onClose?: () => void;
  readonly initialQuery?: string;
}

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <strong key={i} className="font-semibold text-black">{part}</strong>
    ) : (
      part
    )
  );
}

const ITEMS_PER_PAGE = 12;

const sortOptions = [
  { label: "相关度", value: "relevance" },
  { label: "价格从低到高", value: "price-asc" },
  { label: "价格从高到低", value: "price-desc" },
];

export function SearchView({ onClose, initialQuery = "" }: SearchViewProps) {
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState("relevance");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  const allProducts = useMemo(() => allApiProducts, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    let result = allProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q))
    );
    if (categoryFilter) {
      result = result.filter((p) => p.categorySlug === categoryFilter);
    }
    switch (sort) {
      case "price-asc":
        result.sort(
          (a, b) =>
            Number.parseFloat(a.price.replace("¥", "")) -
            Number.parseFloat(b.price.replace("¥", ""))
        );
        break;
      case "price-desc":
        result.sort(
          (a, b) =>
            Number.parseFloat(b.price.replace("¥", "")) -
            Number.parseFloat(a.price.replace("¥", ""))
        );
        break;
    }
    return result;
  }, [query, allProducts, categoryFilter, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentProducts = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const result: { slug: string; name: string }[] = [];
    for (const p of allProducts) {
      if (!seen.has(p.categorySlug)) {
        seen.add(p.categorySlug);
        result.push({ slug: p.categorySlug, name: p.categoryName });
      }
    }
    return result;
  }, [allProducts]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "") {
      setPage(1);
    }
  };

  const handleCategoryChange = (slug: string | null) => {
    setCategoryFilter(slug);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };

  const renderContent = () => {
    const trimmed = query.trim();
    if (trimmed === "") {
      return (
        <div className="text-center py-20">
          <Search className="mx-auto h-12 w-12 text-gray-200 mb-4" />
          <p className="text-gray-400 text-lg">输入关键词搜索商品</p>
        </div>
      );
    }
    if (filtered.length === 0) {
      return (
        <div className="text-center py-20">
          <Search className="mx-auto h-12 w-12 text-gray-200 mb-4" />
          <p className="text-gray-500 text-lg">
            未找到与 "<span className="text-gray-700 font-medium">{query}</span>" 相关的商品
          </p>
          <p className="text-gray-400 text-sm mt-2">试试其他关键词或减少筛选条件</p>
        </div>
      );
    }
    return (
      <>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-sm text-gray-500">
            找到 <span className="font-medium text-gray-800">{filtered.length}</span> 个相关商品
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() =>
                    handleCategoryChange(categoryFilter === cat.slug ? null : cat.slug)
                  }
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    categoryFilter === cat.slug
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors"
              >
                <SlidersHorizontal className="h-3 w-3" />
                排序
              </button>
              {showFilters && (
                <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-gray-100 rounded-lg shadow-lg z-10 py-1">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        handleSortChange(opt.value);
                        setShowFilters(false);
                      }}
                      className={`block w-full text-left text-sm px-4 py-2 hover:bg-gray-50 transition-colors ${
                        sort === opt.value ? "text-gray-900 font-medium" : "text-gray-600"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div key={product.id + product.categorySlug}>
              <button
                onClick={() => {
                  router.push(product.link);
                  onClose?.();
                }}
                className="block w-full aspect-square rounded-xl overflow-hidden bg-gray-100 relative group"
              >
                <Image
                  src={product.img1}
                  alt={product.title}
                  fill
                  sizes="20vw"
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </button>
              <div className="mt-2.5 px-0.5">
                <div className="flex items-center gap-1.5 mb-1">
                  {product.category && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                      {product.category}
                    </span>
                  )}
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                    {product.categoryName}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-800 line-clamp-2">
                  {highlightText(product.title, query)}
                </p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                  {product.desc && highlightText(product.desc, query)}
                </p>
                <span className="text-sm font-semibold text-gray-900 mt-1.5 block">
                  {product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="mt-10">
            <Pagination current={page} total={totalPages} onChange={setPage} />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="sticky top-0 z-30 bg-white border-b border-zinc-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center gap-4">
          <Search className="h-6 w-6 text-gray-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            onKeyDown={handleSearch}
            placeholder="输入商品名称或关键词..."
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-gray-300 h-10 leading-10"
            aria-label="搜索商品"
          />
          {onClose ? (
            <Button variant="ghost" size="default" className="p-1" onClick={onClose} aria-label="关闭搜索">
              <X className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="ghost" size="default" className="p-1" onClick={() => router.push("/")} aria-label="返回主页">
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 py-8">{renderContent()}</div>
    </div>
  );
}
