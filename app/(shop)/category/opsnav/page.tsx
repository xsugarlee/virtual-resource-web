"use client";

import Image from "next/image";
import Link from "next/link";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/Operabar";
import { BingSearch } from "@/components/shared/BingSearch";
import { Menu, User } from "lucide-react";
import { categories, type LinkCard } from "./data";

export default function OperationsNavPage() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        <AppSidebar className="top-12!" />

        <main className="flex-1 min-h-screen bg-background" suppressHydrationWarning>
          {/* 移动端顶部栏 - 三栏布局 */}
          <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-border bg-background sticky top-0 z-50">
            <SidebarTrigger className="[&_svg]:size-6 -ml-1 p-1">
              <Menu className="h-6 w-6" />
            </SidebarTrigger>

            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={32}
                height={32}
                className="size-8 rounded-lg"
              />
              <span className="font-semibold text-base">小酥糖里</span>
            </Link>

            <Link href="/login" className="p-1">
              <User className="h-5 w-5 text-muted-foreground" />
            </Link>
          </div>

          <div className="hidden md:block bg-background border-b border-border px-6 pt-8 pb-8">
            <div className="flex items-center justify-center gap-4">
              <BingSearch placeholder="搜索运营工具、网站、资源..." />
            </div>
          </div>

          <div className="md:hidden px-4 py-3">
            <BingSearch placeholder="搜索运营工具、网站、资源..." />
          </div>

          <div className="px-4 md:px-6 py-6 md:py-8 space-y-10 md:space-y-14">
            {categories.map((cat) => (
              <SectionBlock key={cat.title} title={cat.title} cards={cat.cards} />
            ))}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

/** 单个分类板块 */
function SectionBlock({ title, cards }: Readonly<{ title: string; cards: LinkCard[] }>) {
  const sectionId = `section-${title.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <section id={sectionId}>
      <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        {cards.map((card, index) => (
          <LinkCardItem key={`${card.id}-${index}`} card={card} />
        ))}
      </div>
    </section>
  );
}

function LinkCardItem({ card }: Readonly<{ card: LinkCard }>) {

  return (
    <Link
      href={card.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-start gap-3 rounded-xl border bg-card p-3 md:p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/30 active:scale-[0.98]"
    >
      <div className="relative w-10 h-10 md:w-11 md:h-11 shrink-0 overflow-hidden rounded-md bg-white flex items-center justify-center">
        <Image
          src={card.logo}
          alt={card.name}
          fill
          sizes="(max-width: 768px) 40px, 44px"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
          {card.name}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
          {card.desc}
        </p>
      </div>
    </Link>
  );
}