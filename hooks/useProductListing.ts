"use client";
import { useState, useMemo, useCallback } from "react";
import { Product } from "@/types/products";

interface UseProductListingOptions {
    products: Product[];
    itemsPerPage?: number;
    initialSort?: string;
}

export function useProductListing({
    products,
    itemsPerPage = 20,
    initialSort = "畅销优先",
}: UseProductListingOptions) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSort, setSelectedSort] = useState(initialSort);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // 分类选项（去重）
    const categoryOptions = useMemo(() => {
        const cats = [...new Set(products.map((p) => p.category).filter(Boolean))];
        return cats.map((cat) => ({ id: cat, label: cat }));
    }, [products]);

    // 筛选 + 排序
    const filteredProducts = useMemo(() => {
        let result = [...products];
        if (selectedCategory) {
            result = result.filter((p) => p.category === selectedCategory);
        }
        switch (selectedSort) {
            case "价格从低到高":
                result.sort((a, b) => Number.parseFloat(a.price.replace("¥", "")) - Number.parseFloat(b.price.replace("¥", "")));
                break;
            case "价格从高到低":
                result.sort((a, b) => Number.parseFloat(b.price.replace("¥", "")) - Number.parseFloat(a.price.replace("¥", "")));
                break;
            case "最新上架":
                result.reverse();
                break;
            default:
                break;
        }
        return result;
    }, [products, selectedCategory, selectedSort]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const handleCategorySelect = useCallback((cat: string | null) => {
        setSelectedCategory(cat);
        setCurrentPage(1);
    }, []);

    const handleSortSelect = useCallback((sort: string) => {
        setSelectedSort(sort);
        setCurrentPage(1);
    }, []);

    return {
        currentPage,
        setCurrentPage,
        selectedSort,
        selectedCategory,
        categoryOptions,
        filteredProducts,
        totalPages,
        currentProducts,
        handleCategorySelect,
        handleSortSelect,
    };
}