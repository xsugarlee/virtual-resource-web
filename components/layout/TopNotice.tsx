"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function TopNotice() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-black text-white overflow-hidden transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-4 relative">
        <p className="text-sm md:text-base text-center flex-1">
          🎉 限时促销：全站资源8折优惠，付费网盘资源一次性打包特惠
        </p>
        <button
          onClick={() => setVisible(false)}
          className="absolute right-4 p-2 hover:bg-white/20 rounded-full"
          aria-label="关闭通知"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}