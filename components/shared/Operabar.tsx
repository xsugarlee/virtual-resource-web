// app/components/Operabar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  ShoppingCart,
  Monitor,
  Megaphone,
  BarChart3,
  Package,
  Truck,
  TrendingUp,
  LayoutDashboard,
  Cpu,
  HardDrive,
  Wallet,
  Globe,
  Languages,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { categories } from "@/app/(shop)/category/opsnav/data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const iconMap: Record<string, LucideIcon> = {
  ShoppingCart,
  Monitor,
  Megaphone,
  BarChart3,
  Package,
  Truck,
  TrendingUp,
  Cpu,
  HardDrive,
  Wallet,
  Globe,
  Languages,
  Scale,
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state, openMobile, setOpenMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  const scrollToSection = (e: React.MouseEvent, catTitle: string) => {
    e.stopPropagation();
    e.preventDefault();
    const sectionId = `section-${catTitle.replace(/\s+/g, "-").toLowerCase()}`;
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (openMobile) {
      setOpenMobile(false);
    }
  };

  const linkBaseClasses =
    "flex items-center gap-1.5 rounded-lg hover:bg-muted/60 transition-colors duration-150 cursor-pointer " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const expandedClasses = "h-11 px-4 justify-start w-full";
  const collapsedClasses =
    "h-8 w-8 justify-center p-0 rounded-full " +
    "focus-visible:ring-offset-0 focus-visible:rounded-full";

  return (
    <Sidebar collapsible="icon" variant="inset" className="p-0 flex flex-col" {...props}>
      {/* 桌面端 Logo */}
      <SidebarHeader className="hidden md:flex relative items-center justify-center -mt-10 pb-2">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/images/logo.png" alt="Logo" width={30} height={30} className="size-8 rounded-lg" />
          {!isCollapsed && <span className="font-semibold text-lg">小酥糖里运营导航</span>}
        </Link>
      </SidebarHeader>

      {/* 移动端侧边栏头部 */}
      <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-sidebar-border">
        <Image src="/images/logo.png" alt="Logo" width={36} height={36} className="size-9 rounded-lg" />
        <div>
          <p className="font-semibold text-base">运营导航</p>
          <p className="text-xs text-muted-foreground">小酥糖里</p>
        </div>
      </div>

      <SidebarContent className="p-0">
        {/* 回首页 */}
        <SidebarGroup className="py-1">
          <SidebarMenu className="gap-0.5">
            <SidebarMenuItem className="px-2">
              {isCollapsed ? (
                <div className="flex justify-center">
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href="/" className={`${linkBaseClasses} ${collapsedClasses}`}>
                          <Home className="size-5 shrink-0" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>回首页</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ) : (
                <Link href="/" className={`${linkBaseClasses} ${expandedClasses}`}>
                  <Home className="size-5 shrink-0" />
                  <span className="text-sm">回首页</span>
                </Link>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* 分类菜单 */}
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || LayoutDashboard;
          return (
            <SidebarGroup key={cat.title} className="py-1">
              <SidebarMenu className="gap-0.5">
                <SidebarMenuItem className="px-2">
                  {isCollapsed ? (
                    <div className="flex justify-center">
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a
                              href={`#section-${cat.title.replace(/\s+/g, "-").toLowerCase()}`}
                              onClick={(e) => scrollToSection(e, cat.title)}
                              className={`${linkBaseClasses} ${collapsedClasses}`}
                            >
                              <Icon className="size-5 shrink-0" />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            <p>{cat.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <a
                      href={`#section-${cat.title.replace(/\s+/g, "-").toLowerCase()}`}
                      onClick={(e) => scrollToSection(e, cat.title)}
                      className={`${linkBaseClasses} ${expandedClasses}`}
                    >
                      <Icon className="size-5 shrink-0" />
                      <span className="text-sm">{cat.title}</span>
                    </a>
                  )}
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}