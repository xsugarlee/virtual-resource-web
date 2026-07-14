import type { ProductSearchItem } from "@/components/search/SearchPanel";

// types/product.ts
export interface Product {
    id: string;
    title: string;
    desc: string;
    price: string;
    images: string[];            // 详情大图与缩略图
    img1: string;                // 卡片主图
    img2: string;                // 卡片悬停切换图
    link: string;                // 商品详情页链接
    category?: string;            // ← 新增，用于主页分类筛选（可选）
    details?: {
        fileType?: string;
        fileSize?: string;
        format?: string;
    };
    rating?: number;
    reviewCount?: number;
}

export const searchItems: ProductSearchItem[] = [
    {
        id: "A011",
        title: "客服培训手册",
        desc: "从行业认知到岗位技能的系统化培训手册",
        link: "category/ecomats/A011",
        img: "/images/products/product-1.jpeg",
    },
    {
        id: "A012",
        title: "客服话术大全",
        desc: "售前/售后/催付等全场景话术模板",
        link: "category/ecomats/A012",
        img: "/images/products/product-2.jpeg",
    },
    {
        id: "A014",
        title: "客服主管实战指南",
        desc: "团队管理/绩效考评/数据复盘全攻略",
        link: "category/ecomats/A014",
        img: "/images/products/product-3.jpeg",
    },
    {
        id: "A01P",
        title: "客服资源全套资料包",
        desc: "培训手册+话术大全+主管指南+流程SOP合集",
        link: "category/ecomats/A01P",
        img: "/images/products/product-5.jpeg",
    },
    {
        id: "B011",
        title: "店铺运营体系搭建",
        desc: "从0到1搭建标准化店铺运营体系",
        link: "category/ecomats/B011",
        img: "/images/products/product-6.jpeg",
    },
    {
        id: "B012",
        title: "爆款打造体系",
        desc: "选品-测款-推广-维护全流程爆款方法论",
        link: "category/ecomats/B012",
        img: "/images/products/product-7.jpeg",
    },
    {
        id: "C011",
        title: "电商简历模板精选集",
        desc: "10份精美简历模板+撰写技巧",
        link: "category/jobtips/C011",
        img: "/images/products/product-1.jpeg",
    },
    {
        id: "D011",
        title: "面试自我介绍模板",
        desc: "30个常见面试问题及满分回答",
        link: "category/jobtips/D011",
        img: "/images/products/product-6.jpeg",
    },
    {
        id: "E011",
        title: "电商求职一对一定制服务",
        desc: "资深HR一对一简历优化/职业规划/面试辅导",
        link: "category/consult/custsvc",
        img: "/images/products/product-1.jpeg",
    },
    {
        id: "F011",
        title: "电商求职常见问题答疑",
        desc: "简历/面试/薪资/晋升全流程问题解答合集",
        link: "category/consult/q&a",
        img: "/images/products/product-2.jpeg",
    },
];
