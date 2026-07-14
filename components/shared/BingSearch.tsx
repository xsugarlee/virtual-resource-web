"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function BingSearch({ placeholder = "搜索运营工具..." }: { readonly placeholder?: string }) {
  const [query, setQuery] = useState("");

  const doSearch = () => {
    const q = query.trim();
    if (!q) return;
    window.open(`https://www.bing.com/search?q=${encodeURIComponent(q)}`, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      doSearch();
    }
  };

  return (
    <div className="relative w-full max-w-[672px]">
      {/* 搜索图标：绝对定位，垂直居中 */}
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
      <Input
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-14 pl-12 pr-24 text-sm border-border shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/20"
      />
      <button
        onClick={doSearch}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        搜索
      </button>
    </div>
  );
}