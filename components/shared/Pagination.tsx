"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface PaginationProps {
  readonly current: number;
  readonly total: number;
  readonly onChange: (page: number) => void;
}

export default function PaginationWrapper({ current, total, onChange }: PaginationProps) {
  if (total <= 1) return null;

  // 智能页码生成（总页数≤5全显示，否则首尾+省略号，仅一次数组构建）
  const getPages = (): (number | "ellipsis")[] => {
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // 根据 current 位置，用 if-else 构建起始段
    let start: (number | "ellipsis")[];
    if (current <= 3) {
      start = [1, 2, 3, "ellipsis"];
    } else if (current >= total - 2) {
      start = [1, "ellipsis", total - 2, total - 1];
    } else {
      start = [1, "ellipsis", current - 1, current, current + 1, "ellipsis"];
    }

    return [...start, total];
  };

  const pages = getPages();

  return (
    <Pagination className="py-12 animate-fadeIn">
      <PaginationContent>
        {/* 左箭头 */}
        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (current > 1) onChange(current - 1);
            }}
            className={current <= 1 ? "pointer-events-none opacity-50" : ""}
            aria-label="上一页"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        {/* 页码 + 省略号 */}
        {pages.map((page, idx) => (
          <PaginationItem key={`${page}-${idx}`}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onChange(page);
                }}
                isActive={current === page}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* 右箭头 */}
        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (current < total) onChange(current + 1);
            }}
            className={current >= total ? "pointer-events-none opacity-50" : ""}
            aria-label="下一页"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}