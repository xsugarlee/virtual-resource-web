"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import { ArrowLeft, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function TipContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <ArrowLeft size={16} /> 返回
      </button>

      <div className="bg-white rounded-2xl border p-6 sm:p-8 mb-6">
      <div className="text-center mb-8">
        <Heart className="mx-auto mb-4 text-amber-500" size={48} strokeWidth={1.5} />
        <h1 className="text-2xl font-bold mb-2">赞赏支持</h1>
        <p className="text-muted-foreground">如果资源对你有帮助，欢迎赞赏支持我们 ❤️</p>
        {orderId && <p className="text-xs text-muted-foreground mt-1">订单号：{orderId}</p>}
      </div>

      <div className="mb-8 p-8 bg-amber-50 rounded-2xl border border-amber-200 text-center">
        <div className="w-40 h-40 mx-auto mb-4 rounded-xl border-2 border-dashed border-amber-300 bg-white/60 flex items-center justify-center relative overflow-hidden">
          {/*
          <Image src="/images/wechat-tip.jpg" alt="微信赞赏码" fill className="object-contain" />
          */}
          <div className="text-center">
            <p className="text-xs text-amber-400">微信赞赏码</p>
            <p className="text-[10px] text-amber-300 mt-1">待上传</p>
          </div>
        </div>
        <p className="text-sm text-amber-700 font-medium mb-2">微信扫码赞赏</p>
        <p className="text-xs text-amber-600">任意金额，感谢支持</p>
      </div>

      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 mb-8">
        <div className="flex items-start gap-3">
          <MessageCircle className="text-blue-500 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-medium text-blue-700 mb-1">赞赏后请联系客服发送文件</p>
            <p className="text-xs text-blue-600">
              完成赞赏后，请截图并添加客服微信 <strong>xsugar_service</strong>，发送赞赏截图和订单号，我们将第一时间为您发送资源文件。
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="outline" onClick={() => router.push("/orders")} className="h-12">
          查看订单
        </Button>
        <Button onClick={() => router.push("/")} className="h-12">
          返回首页
        </Button>
      </div>
      </div>
      </div>
    </div>
  );
}

export default function TipPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">加载中...</div>}>
      <TipContent />
    </Suspense>
  );
}
