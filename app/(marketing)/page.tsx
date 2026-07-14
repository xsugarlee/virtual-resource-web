"use client";

import HeroCarousel from "@/components/marketing/HeroCarousel";
import ProductGrid from "@/components/product/ProductGrid";
import MarketingSection from "@/components/marketing/MarketingSection";
import BrandGrid from "@/components/marketing/BrandGrid";
import type { ProductCardData } from "@/components/product/ProductCard";

const sliderData = [
  { subtitle: "电商客服知识", title: "精品资源库", desc: "精选客服话术、培训流程、绩效考核全套资料", buttonText: "查看更多" },
  { subtitle: "售前转化", title: "高成交话术体系", desc: "从接待到催付，一站式提升店铺转化率", buttonText: "极速查阅" },
  { subtitle: "售后处理", title: "纠纷一站式解决", desc: "降低退款率、提升好评率、维护店铺评分", buttonText: "了解更多" },
  { subtitle: "团队管理", title: "客服绩效考核方案", desc: "标准化KPI + 提成体系 + 管理表格", buttonText: "立即收藏" },
  { subtitle: "新手入门", title: "零基础客服培训", desc: "新人快速上岗，7天成为金牌客服", buttonText: "立即探索" },
];

const bannerImages = [
  "/images/banners/banner1.webp",
  "/images/banners/banner2.webp",
  "/images/banners/banner3.webp",
  "/images/banners/banner4.webp",
  "/images/banners/banner5.webp",
];

const productList: ProductCardData[] = [
  { title: "客服培训手册", desc: "从行业认知到岗位技能的系统化培训手册", price: "¥19.99", img1: "/images/products/product-1.jpeg", img2: "/images/products/product-1-hover.jpeg", link: "category/ecomats/A011" },
  { title: "客服话术大全", desc: "售前/售后/催付等全场景话术模板", price: "¥18.99", img1: "/images/products/product-2.jpeg", img2: "/images/products/product-2-hover.jpeg", link: "category/ecomats/A012" },
  { title: "客服主管实战指南", desc: "团队管理/绩效考评/数据复盘全攻略", price: "¥24.99", img1: "/images/products/product-3.jpeg", img2: "/images/products/product-3-hover.jpeg", link: "category/ecomats/A014" },
  { title: "客服流程SOP标准", desc: "咨询-下单-售后全链路标准化操作流程", price: "¥14.99", img1: "/images/products/product-4.jpeg", img2: "/images/products/product-4-hover.jpeg", link: "category/ecomats/A015" },
  { title: "店铺运营体系搭建", desc: "从0到1搭建标准化店铺运营体系", price: "¥29.99", img1: "/images/products/product-6.jpeg", img2: "/images/products/product-6-hover.jpeg", link: "category/ecomats/B011" },
  { title: "爆款打造体系", desc: "选品-测款-推广-维护全流程爆款方法论", price: "¥34.99", img1: "/images/products/product-7.jpeg", img2: "/images/products/product-7-hover.jpeg", link: "category/ecomats/B012" },
  { title: "电商简历模板精选集", desc: "10份精美简历模板+撰写技巧", price: "¥9.99", img1: "/images/products/product-1.jpeg", img2: "/images/products/product-1-hover.jpeg", link: "category/jobtips/C011" },
  { title: "面试自我介绍模板", desc: "30个常见面试问题及满分回答", price: "¥12.99", img1: "/images/products/product-6.jpeg", img2: "/images/products/product-6-hover.jpeg", link: "category/jobtips/D011" },
  { title: "薪资谈判技巧话术", desc: "高情商提加薪的完整话术方案", price: "¥13.99", img1: "/images/products/product-8.jpeg", img2: "/images/products/product-8-hover.jpeg", link: "category/jobtips/D013" },
  { title: "电商求职一对一定制服务", desc: "资深HR一对一简历优化/职业规划/面试辅导", price: "¥199.00", img1: "/images/products/product-1.jpeg", img2: "/images/products/product-1-hover.jpeg", link: "category/consult/E011" },
];

export default function Home() {
  return (
    <>
      <HeroCarousel images={bannerImages} slides={sliderData} />
      <ProductGrid title="编辑精选：电商客服精品资源" products={productList} />

      <MarketingSection
        layout="centered"
        heading="活动日历"
        subheading="实时更新的电商客服活动、培训与竞赛日历"
      >
        <div className="bg-gray-50 p-8 rounded-2xl shadow-sm mt-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">活动日历展示区</h3>
            <p className="text-gray-500">即将上线：客服技能大赛、话术模板更新、直播培训</p>
          </div>
        </div>
      </MarketingSection>

      <MarketingSection
        layout="split"
        heading="会员套餐"
        subheading="成为会员，解锁全站无限制下载权限"
        buttonText="查看套餐"
        leftContent={
          <div className="bg-blue-50 p-10 rounded-2xl text-center">
            <h3 className="text-2xl font-bold mb-2">会员专属计划</h3>
            <p className="text-gray-600">每月更新资源 + 专属优惠</p>
          </div>
        }
      />

      <MarketingSection
        layout="centered"
        heading="创作者入驻"
        subheading="欢迎优质内容创作者入驻，一起服务百万电商从业者"
        buttonText="立即入驻"
      />

      <BrandGrid />

      <MarketingSection
        layout="centered-card"
        heading="推广联盟计划"
        subheading="推广赚钱，高佣金、实时结算"
        buttonText="申请联盟"
      />

      <MarketingSection
        layout="split"
        heading="学生专属计划"
        subheading="学生专属折扣 + 免费学习资料包"
        buttonText="学生认证"
        leftContent={
          <div>
            <h3 className="text-3xl font-bold mb-4">学生专属计划</h3>
            <p className="text-gray-600 mb-6">学生专属折扣 + 免费学习资料包</p>
            <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors">
              学生认证
            </button>
          </div>
        }
        rightContent={
          <div className="bg-gray-50 p-10 rounded-2xl text-center">
            <h3 className="text-xl font-semibold">学生专属福利区</h3>
          </div>
        }
      />
    </>
  );
}
