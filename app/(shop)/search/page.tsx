"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SearchView } from "@/components/search/SearchView";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  return <SearchView key={searchParams.toString()} initialQuery={q} />;
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-gray-400">加载搜索…</div>}>
      <SearchContent />
    </Suspense>
  );
}