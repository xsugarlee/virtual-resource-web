"use client";

import { useState, useEffect, useRef, useMemo, useCallback, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X, TrendingUp } from "lucide-react";

export interface ProductSearchItem {
  id: string;
  title: string;
  desc: string;
  link: string;
  img: string;
  price?: string;
  category?: string;
}

interface SearchPanelProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly products: ProductSearchItem[];
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

export default function SearchPanel({
  open,
  onClose,
  products,
}: Readonly<SearchPanelProps>) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  const trending = useMemo(() => products.slice(0, 8), [products]);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
    );
  }, [query, products]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const seen = new Set<string>();
    const result: { label: string; type: "category" | "product" }[] = [];

    for (const p of products) {
      if (p.category && p.category.toLowerCase().includes(q) && !seen.has(p.category)) {
        seen.add(p.category);
        result.push({ label: p.category, type: "category" });
      }
      if (
        p.title.toLowerCase().includes(q) &&
        p.title.length < 20 &&
        !seen.has(p.title)
      ) {
        seen.add(p.title);
        result.push({ label: p.title, type: "product" });
      }
    }
    return result.slice(0, 6);
  }, [query, products]);

  const handleSelect = useCallback(
    (product: ProductSearchItem) => {
      router.push(product.link);
      onClose();
    },
    [router, onClose]
  );

  const handleSuggestionClick = useCallback((label: string) => {
    setQuery(label);
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && query.trim() !== "") {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        onClose();
      }
    },
    [query, router, onClose]
  );

  const handleXClick = useCallback(() => {
    if (query.trim() === "") {
      onClose();
    } else {
      setQuery("");
    }
  }, [query, onClose]);

  return (
    <div
      ref={panelRef}
      className={`w-full bg-white shadow-2xl transition-all duration-200 ease-out ${
        open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center gap-4">
          <Search className="h-6 w-6 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入名称或关键词..."
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-gray-300 h-10 leading-10"
            aria-label="搜索商品"
          />
          <button
            onClick={handleXClick}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="关闭搜索"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {query.trim() !== "" && filtered.length > 0 && (
          <div className="mt-6 flex gap-8">
            {suggestions.length > 0 && (
              <div className="w-56 shrink-0 space-y-1">
                <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider px-2 py-2">
                  搜索建议
                </h4>
                {suggestions.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => handleSuggestionClick(s.label)}
                    className="block w-full text-left text-sm text-gray-700 hover:bg-gray-50 px-2 py-1.5 rounded transition-colors"
                  >
                    <span className={s.type === "category" ? "text-xs font-semibold text-black" : ""}>
                      {s.type === "category" ? `# ${s.label}` : highlightText(s.label, query)}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                商品推荐
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.slice(0, 8).map((product) => (
                  <div key={product.link}>
                    <button
                      onClick={() => handleSelect(product)}
                      className="block w-full aspect-square rounded-lg overflow-hidden bg-gray-100 relative group"
                    >
                      <Image
                        src={product.img}
                        alt={product.title}
                        fill
                        sizes="20vw"
                        loading="lazy"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </button>
                    <div className="mt-2 px-0.5">
                      <p className="text-sm font-medium text-gray-800 line-clamp-2">
                        {highlightText(product.title, query)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {product.desc && highlightText(product.desc, query)}
                      </p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-sm font-semibold text-gray-900">
                          {product.price}
                        </span>
                        {product.category && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                            {product.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {query.trim() !== "" && filtered.length === 0 && (
          <div className="mt-8 text-center py-12">
            <Search className="mx-auto h-10 w-10 text-gray-200 mb-3" />
            <p className="text-gray-400 text-sm">
              未找到与 "<span className="text-gray-600 font-medium">{query}</span>" 相关的商品
            </p>
            <p className="text-xs text-gray-300 mt-1">试试其他关键词</p>
          </div>
        )}

        {query.trim() === "" && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-gray-400" />
              <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                热门推荐
              </h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {trending.map((product) => (
                <div key={product.link}>
                  <button
                    onClick={() => handleSelect(product)}
                    className="block w-full aspect-square rounded-lg overflow-hidden bg-gray-100 relative group"
                  >
                    <Image
                      src={product.img}
                      alt={product.title}
                      fill
                      sizes="20vw"
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </button>
                  <div className="mt-2 px-0.5">
                    <p className="text-sm font-medium text-gray-800 line-clamp-2">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {product.desc}
                    </p>
                    <span className="text-sm font-semibold text-gray-900 mt-1.5 block">
                      {product.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="text-right mt-4">
            <button
              onClick={() => {
                router.push(`/search?q=${encodeURIComponent(query.trim())}`);
                onClose();
              }}
              className="text-sm text-gray-900 font-semibold hover:text-black transition-colors"
            >
              查看全部 {filtered.length} 个结果 →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
