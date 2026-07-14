"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, User, Search, ShoppingCart } from "lucide-react";
import SearchPanel from "@/components/search/SearchPanel";
import { useCartContext } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { allApiProducts } from "@/lib/services/api-data";

const searchProducts = allApiProducts.map((p) => ({
  id: p.id,
  title: p.title,
  desc: p.desc,
  link: p.link,
  img: p.img1,
  price: p.price,
  category: p.category,
}));
interface HeaderProps {
  readonly onMenuOpen?: () => void;
  readonly searchOpen: boolean;
  readonly onSearchOpenChange: (open: boolean) => void;
}

export default function Header({ onMenuOpen, searchOpen, onSearchOpenChange }: Readonly<HeaderProps>) {
  const router = useRouter();
  const { openCart, itemCount } = useCartContext();
  const { user, setShowLogin } = useAuth();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const userButton = mounted
    ? (user ? (
      <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">{user.nickname.charAt(0)}</div>
    ) : (
      <User size={20} />
    ))
    : <User size={20} />;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
      {searchOpen ? (
        <SearchPanel
          open={searchOpen}
          onClose={() => onSearchOpenChange(false)}
          products={searchProducts}
        />
      ) : (
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          {/* 菜单按钮 */}
          <button onClick={onMenuOpen} className="p-2 hover:bg-gray-100 rounded-full transition-all" aria-label="打开菜单">
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12">
            <Link href="/">
              <Image src="/images/logo.png" alt="Logo" width={48} height={48} loading="eager" className="object-contain" />
            </Link>
          </div>

          {/* 右侧图标 */}
          <div className="flex items-center gap-5">
            <button onClick={() => user ? router.push("/account") : setShowLogin(true)} className="p-2 hover:bg-gray-100 rounded-full transition-all" aria-label="用户中心">
              {userButton}
            </button>
            <button onClick={() => onSearchOpenChange(true)} className="p-2 hover:bg-gray-100 rounded-full transition-all" aria-label="搜索">
              <Search size={20} />
            </button>
            <button onClick={openCart} className="relative p-2 hover:bg-gray-100 rounded-full" aria-label="购物车">
              <ShoppingCart size={20} />
              <Badge suppressHydrationWarning className={`absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[9px] font-bold bg-black text-white border-none hover:bg-black translate-x-1/3 -translate-y-1/3 ${itemCount === 0 ? 'opacity-0 invisible' : ''}`}>
                {itemCount > 99 ? '99+' : itemCount}
              </Badge>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}