"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (countdown <= 0) { router.push("/account?tab=orders"); return; }
    const id = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [countdown, router]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-md mx-auto text-center">
      <CheckCircle className="mx-auto mb-6 text-green-500" size={64} strokeWidth={1.5} />
      <h1 className="text-2xl font-bold mb-2">支付成功</h1>
      <p className="text-muted-foreground mb-2">订单已支付完成</p>
      {orderId && (
        <p className="text-sm text-muted-foreground mb-1">
          订单号：{orderId}
        </p>
      )}
      {amount && (
        <p className="text-lg font-semibold mb-8">支付金额：¥{Number(amount).toFixed(2)}</p>
      )}
      <div className="flex flex-col gap-3">
        <Button onClick={() => router.push("/account?tab=orders")} className="h-12 text-lg">
          查看订单 {countdown > 0 && `(${countdown}s)`}
        </Button>
        <Button variant="outline" onClick={() => router.push("/")} className="h-12 text-lg">
          返回首页
        </Button>
      </div>
        </div>
      </div>
    </div>
  );
}

export default function PaySuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">加载中...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
