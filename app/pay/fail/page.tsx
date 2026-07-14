"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function FailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-md mx-auto text-center">
      <XCircle className="mx-auto mb-6 text-red-500" size={64} strokeWidth={1.5} />
      <h1 className="text-2xl font-bold mb-2">支付失败</h1>
      <p className="text-muted-foreground mb-6">{error || "支付未完成，请重试"}</p>
      <div className="flex flex-col gap-3">
        <Button onClick={() => router.push("/checkout")} className="h-12 text-lg">
          重新支付
        </Button>
        <Button variant="outline" onClick={() => router.push("/orders")} className="h-12 text-lg">
          查看订单
        </Button>
      </div>
        </div>
      </div>
    </div>
  );
}

export default function PayFailPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">加载中...</div>}>
      <FailContent />
    </Suspense>
  );
}
