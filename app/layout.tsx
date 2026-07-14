import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import RootLayoutClient from "@/components/shared/RootLayoutClient";
import BackToTop from "@/components/shared/BackToTop";

const notoSansSC = Noto_Sans_SC({
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const mapleMono = localFont({
  variable: "--font-mono",
  src: [
    { path: "../public/fonts/MapleMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/MapleMono-Bold.ttf", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title:
    "小酥糖里 - 精选电商资源库 | 零基础电商学习入门+企业级SOP架构+知识百科",
  description:
    "小酥糖里电商资源库是专为电商运营领域打造的一站式资源库与企业级服务平台。提供海量电商运营资料与工具模板，一键获取，开箱即用，支持店铺诊断、售前售后话术、运营SOP搭建、绩效体系设计、流程标准化部署等服务，并作为电商资源库，提供海量运营案例、客服话术模板、SOP流程文件、运营表格工具、帮助你从零基础入门到精通，快速提升运营技能，轻松起店、爆单拿结果。",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  keywords:
    "小酥糖里,电商运营,电商导航,电商资源库,电商运营资料,电商知识库,电商SOP模板,电商售前话术,电商售后话术,电商运营诊断,店铺运营诊断,电商SOP搭建,电商企业部署服务,电商运营SOP,客服话术模板,电商流程优化,电商运营表格,电商运营工具,电商运营面经,电商客服培训,电商绩效体系设计,电商运营全流程SOP,电商售后纠纷处理,电商中差评回复,电商催付话术,电商直播运营SOP,电商短视频运营,电商店铺装修资料,电商活动运营方案,电商团队管理SOP,电商数据运营模板,电商客服质检SOP,电商售后退款流程,电商纠纷仲裁话术,电商好评率提升方案,电商企业SOP部署,电商运营体系搭建,电商客服体系建设,电商售后体系优化,电商流程标准化,电商运营标准化手册,电商客服SOP模板,电商售后SOP模板,电商售前SOP模板,电商店铺诊断报告,电商运营优化方案,电商企业服务部署,电商团队流程搭建,电商客服全流程话术,电商售后处理流程,电商运营实战教程,电商运营案例素材,电商运营灵感参考",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSansSC.variable} ${mapleMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <RootLayoutClient>{children}</RootLayoutClient>
          <CartDrawer />
          <BackToTop />
        </CartProvider>
      </body>
    </html>
  );
}