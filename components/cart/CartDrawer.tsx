"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCartContext } from "@/app/context/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const router = useRouter();
  const { state, closeCart, updateQuantity, removeItem, totalPrice } =
    useCartContext();
  const { items, isOpen } = state;

  const formatPrice = (price: number) => {
    return price === 0 ? "Free" : `¥${price.toFixed(2)}`;
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="w-full max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-5 border-b shrink-0">
          <SheetTitle className="text-lg font-semibold flex items-center gap-2">
            <ShoppingCart size={20} />
            购物车
          </SheetTitle>
          {/* ★ 添加描述，视觉隐藏 */}
          <SheetDescription className="sr-only">
            查看和管理购物车中的商品
          </SheetDescription>
        </SheetHeader>

        {/* 内容滚动区域 */}
        <ScrollArea className="flex-1 px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-80 text-center">
              <p className="text-lg font-medium">购物车竟然是空的</p>
              <SheetClose asChild>
                <Button variant="outline" className="mt-6">
                  再逛一逛
                </Button>
              </SheetClose>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 items-start border-b pb-4 last:border-none"
                >
                  {/* 商品图 */}
                  <div className="w-20 h-20 relative shrink-0 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* 信息 */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formatPrice(item.price)}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      {/* 数量控制 */}
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="px-3 py-1 text-sm min-w-2rem text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus size={14} />
                        </Button>
                      </div>

                      {/* 删除 */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive ml-auto"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* 合计 */}
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* 底部结算 */}
        {items.length > 0 && (
          <SheetFooter className="px-6 py-5 border-t shrink-0 space-y-4 flex-col sm:flex-col">
            <div className="flex justify-between text-base font-semibold">
              <span>合计</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              限时优惠活动
            </p>

            {totalPrice < 10 && totalPrice > 0 && (
              <p className="text-sm text-amber-500 font-medium">
                订单满¥10即可解锁优惠活动
              </p>
            )}

            <Button
              className="w-full h-14 text-xl font-medium"
              size="lg"
              onClick={() => {
                closeCart();
                router.push("/checkout");
              }}
            >
              结算
            </Button>
            <SheetClose asChild>
              <Button variant="outline" className="w-full h-14 text-xl font-medium" size="lg">
                返回
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}