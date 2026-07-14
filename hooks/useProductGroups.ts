"use client";

import { useMemo } from "react";
import { Product } from "@/types/products";

interface UseProductGroupsOptions {
    products: Product[];
    /** 分区标题数组，顺序与分组对应 */
    sectionTitles?: string[];
}

export function useProductGroups({
    products,
    sectionTitles = [],
}: UseProductGroupsOptions) {
    const groups = useMemo(() => {
        if (!products.length) return [];

        // 如果提供了标题，严格按标题数量分组；否则自动按每组 4 个生成标题
        let titles: string[];
        let groupCount: number;

        if (sectionTitles.length > 0) {
            titles = sectionTitles;
            groupCount = titles.length;
        } else {
            groupCount = Math.ceil(products.length / 4);
            titles = Array.from({ length: groupCount }, (_, i) => `分区 ${i + 1}`);
        }

        const perGroup = Math.ceil(products.length / groupCount);
        const result: { title: string; products: Product[] }[] = [];

        for (let i = 0; i < groupCount; i++) {
            const slice = products.slice(i * perGroup, (i + 1) * perGroup);
            if (slice.length > 0) {
                result.push({ title: titles[i] || `分区 ${i + 1}`, products: slice });
            }
        }
        return result;
    }, [products, sectionTitles]);

    const heroProduct = products.length > 0 ? products[0] : undefined;

    return { groups, heroProduct };
}