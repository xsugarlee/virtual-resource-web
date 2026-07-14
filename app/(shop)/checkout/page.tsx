"use client";

import { useState, useEffect, useCallback, startTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart, Wallet, Clock, MessageCircle, User } from "lucide-react";
import { useCartContext } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";
import { setPostAuthRedirect } from "@/lib/post-auth-redirect";

const formatPrice = (price: number) => price === 0 ? "Free" : `¥${price.toFixed(2)}`;

export default function CheckoutPage() {
  const router = useRouter();
  const { state, totalPrice, clearCart } = useCartContext();
  const { user, setShowLogin } = useAuth();
  const { items } = state;
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState("");
  const [payMethod, setPayMethod] = useState<"alipay" | "wechat">("alipay");
  const [countdown, setCountdown] = useState(600);
  const [orderId, setOrderId] = useState("");
  const [orderCreated, setOrderCreated] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { startTransition(() => setMounted(true)); }, []);

  useEffect(() => {
    if (!orderCreated || countdown <= 0) return;
    const id = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [orderCreated, countdown]);

  useEffect(() => {
    if (countdown === 0 && orderId) {
      fetch(`/api/orders/${orderId}`).then(r => r.json()).then(d => {
        if (d.order && d.order.status === "pending") {
          fetch(`/api/orders/${orderId}`, { method: "DELETE" });
        }
      }).catch(() => { });
    }
  }, [countdown, orderId]);

  const mm = String(Math.floor(countdown / 60)).padStart(2, "0");
  const ss = String(countdown % 60).padStart(2, "0");

  const createOrder = useCallback(async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({ id: i.id, title: i.title, price: i.price, image: i.image, quantity: i.quantity })),
        userId: user?.id || "",
        sessionId: "default",
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "创建订单失败");
    setOrderId(data.order.id);
    setOrderCreated(true);
    return data.order;
  }, [items, user]);

  const handleCheckout = async () => {
    setPaying(true);
    setError("");
    try {
      let order;
      if (!orderCreated) {
        order = await createOrder();
      } else {
        const r = await fetch(`/api/orders/${orderId}`);
        const d = await r.json();
        order = d.order;
        if (!order || order.status !== "pending") throw new Error("订单已过期");
      }

      if (payMethod === "alipay") {
        const payRes = await fetch("/api/pay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: order.id, method: "alipay" }),
        });
        const payData = await payRes.json();
        if (!payRes.ok) throw new Error(payData.error || "支付失败");
        clearCart();
        router.push(`/pay/success?orderId=${order.id}&amount=${order.totalAmount}`);
      } else {
        clearCart();
        router.push(`/pay/success?orderId=${order.id}&amount=${order.totalAmount}`);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "操作失败");
    }
    setPaying(false);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50/50" />;
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <User size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-4">请先登录后再结算</p>
          <Button onClick={() => { setPostAuthRedirect("/checkout"); setShowLogin(true); }}>去登录</Button>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !orderCreated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingCart className="mx-auto mb-4 text-muted-foreground" size={48} />
          <p className="text-lg font-medium mb-4">购物车是空的</p>
          <Button onClick={() => router.push("/")}>去逛逛</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-black mb-4 sm:mb-6 transition-colors">
          <ArrowLeft size={16} /> 返回
        </button>

        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">确认订单</h1>

        {orderCreated && (
          <div className="flex items-center gap-2 mb-4 sm:mb-6 p-3 sm:p-4 bg-amber-50 rounded-xl border border-amber-200">
            <Clock size={18} className="text-amber-500 shrink-0" />
            <span className="text-sm text-amber-700">
              请在 <strong className="text-lg">{mm}:{ss}</strong> 内完成支付，超时订单将自动取消
            </span>
          </div>
        )}

        <div className="bg-white rounded-2xl border p-4 sm:p-6 mb-4 sm:mb-6 space-y-3 sm:space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 sm:gap-4 items-start">
              <div className="w-14 h-14 sm:w-16 sm:h-16 relative shrink-0 rounded-xl overflow-hidden bg-muted">
                <Image src={item.image} alt={item.title} fill sizes="64px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm sm:text-base truncate">{item.title}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">×{item.quantity}</p>
              </div>
              <p className="text-sm sm:text-base font-semibold shrink-0">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
          <div className="border-t pt-3 sm:pt-4 flex justify-between text-base sm:text-lg font-bold">
            <span>合计</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-4 sm:p-6 mb-4 sm:mb-6">
          <p className="text-sm font-medium mb-3">选择支付方式</p>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setPayMethod("alipay")}
              className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl border text-left transition-all ${payMethod === "alipay" ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500" : "border-gray-200 hover:border-gray-300"}`}>
              <span className="text-xl sm:text-2xl">💳</span>
              <div>
                <p className="font-medium text-xs sm:text-sm">支付宝支付</p>
                <p className="text-[11px] sm:text-xs text-muted-foreground">快捷安全</p>
              </div>
            </button>
            <button onClick={() => setPayMethod("wechat")}
              className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl border text-left transition-all ${payMethod === "wechat" ? "border-green-500 bg-green-50 ring-1 ring-green-500" : "border-gray-200 hover:border-gray-300"}`}>
              <MessageCircle className={`${payMethod === "wechat" ? "text-green-500" : "text-gray-400"} shrink-0`} size={22} />
              <div>
                <p className="font-medium text-xs sm:text-sm">微信支付</p>
                <p className="text-[11px] sm:text-xs text-muted-foreground">添加客服下单有优惠</p>
              </div>
            </button>
          </div>
        </div>

        {payMethod === "wechat" && (
          <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-green-50 rounded-2xl border border-green-200">
            <div className="flex items-start gap-3">
              <MessageCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm font-medium mb-1">添加客服微信下单享优惠</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  请添加客服微信 <strong>xsugar_service</strong>，备注订单号即可享受专属优惠价格。
                </p>
              </div>
            </div>
          </div>
        )}

        {error && <p className="text-sm text-red-500 mb-4 text-center">{error}</p>}

        <Button className="w-full h-12 sm:h-14 text-lg sm:text-xl font-medium rounded-xl" size="lg" onClick={handleCheckout} disabled={paying}>
          {payMethod === "alipay" ? <Wallet size={20} /> : <MessageCircle size={20} />}
          {paying ? "处理中..." : payMethod === "alipay" ? `支付宝支付 ${formatPrice(totalPrice)}` : "微信联系客服下单"}
        </Button>
      </div>
    </div>
  );
}
