"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "paid" | "cancelled";
  createdAt: string;
  paidAt?: string;
}

export default function OrdersPage() {
  const router = useRouter();
  const { user, setShowLogin } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetch(`/api/orders?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  const statusLabel: Record<string, string> = {
    pending: "待支付",
    paid: "已支付",
    cancelled: "已取消",
  };

  const statusColor: Record<string, string> = {
    pending: "text-amber-500",
    paid: "text-green-500",
    cancelled: "text-gray-400",
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-muted-foreground mb-6"
      >
        <ArrowLeft size={16} /> 返回
      </button>

      <h1 className="text-2xl font-bold mb-6">我的订单</h1>

      {loading && <p className="text-center text-muted-foreground py-10">加载中...</p>}

      {!loading && orders.length === 0 && !user && (
        <div className="text-center py-16">
          <Package className="mx-auto mb-4 text-muted-foreground" size={48} />
          <p className="text-lg font-medium mb-1">请先登录</p>
          <p className="text-sm text-muted-foreground mb-6">登录后即可查看订单</p>
          <Button onClick={() => setShowLogin(true)}>去登录</Button>
        </div>
      )}

      {!loading && orders.length === 0 && user && (
        <div className="text-center py-16">
          <Package className="mx-auto mb-4 text-muted-foreground" size={48} />
          <p className="text-lg font-medium mb-1">暂无订单</p>
          <p className="text-sm text-muted-foreground mb-6">快去选购心仪的商品吧</p>
          <Button onClick={() => router.push("/")}>去首页</Button>
        </div>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-xl p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs text-muted-foreground">订单号</p>
                <p className="text-sm font-mono">{order.id}</p>
              </div>
              <span className={`text-sm font-medium ${statusColor[order.status]}`}>
                {statusLabel[order.status]}
              </span>
            </div>

            <div className="space-y-2 mb-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="truncate flex-1">
                    {item.title} x{item.quantity}
                  </span>
                  <span className="shrink-0 ml-2">¥{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {new Date(order.createdAt).toLocaleString("zh-CN")}
              </span>
              <span className="font-bold">合计 ¥{order.totalAmount.toFixed(2)}</span>
            </div>

            {order.status === "pending" && (
              <Button
                className="w-full mt-3"
                onClick={() => {
                  // 回到结算页重新支付
                  router.push("/checkout");
                }}
              >
                继续支付
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
