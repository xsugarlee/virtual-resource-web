import { Product } from "@/types/products";

const data: Product[] = [
  // ── E01 定制服务 ─────────────────────────────
  {
    id: "E011",
    title: "电商求职一对一定制服务",
    desc: "资深HR一对一简历优化/职业规划/面试辅导",
    price: "¥199.00",
    images: ["/images/products/product-1.jpeg", "/images/products/product-1-hover.jpeg"],
    img1: "/images/products/product-1.jpeg",
    img2: "/images/products/product-1-hover.jpeg",
    link: "/category/consult/custsvc",
    category: "定制服务",
    details: { fileType: "一对一服务", fileSize: "-", format: "在线服务" },
    rating: 5.0,
    reviewCount: 48,
  },

  // ── F01 问题答疑 ─────────────────────────────
  {
    id: "F011",
    title: "电商求职常见问题答疑",
    desc: "简历/面试/薪资/晋升全流程问题解答合集",
    price: "¥0.00",
    images: ["/images/products/product-2.jpeg", "/images/products/product-2-hover.jpeg"],
    img1: "/images/products/product-2.jpeg",
    img2: "/images/products/product-2-hover.jpeg",
    link: "/category/consult/q&a",
    category: "问题答疑",
    details: { fileType: "在线文档", fileSize: "-", format: "免费查阅" },
    rating: 4.8,
    reviewCount: 156,
  },
];

export const allProducts: Product[] = data;
export const productsMap: Record<string, Product[]> = {};
export const defaultSectionTitles: string[] = [];
