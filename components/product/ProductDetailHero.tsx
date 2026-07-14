"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartContext, parsePrice } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { setPostAuthRedirect } from "@/lib/post-auth-redirect";

export interface Product {
  id?: string;
  title: string;
  desc: string;
  price: string;
  img1: string;
  img2: string;
  images?: string[];
  link: string;
  details?: {
    fileType?: string;
    fileSize?: string;
    format?: string;
  };
}

interface ProductDetailHeroProps {
  readonly product: Product;
  readonly showThumbnails?: boolean;
}

export default function ProductDetailHero({
  product,
  showThumbnails = false,
}: ProductDetailHeroProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const router = useRouter();
  const { addItem, addItemSilent } = useCartContext();
  const { user, setShowLogin } = useAuth();

  const images = useMemo(() =>
    product.images && product.images.length > 0
      ? product.images
      : [product.img1, product.img2],
    [product.images, product.img1, product.img2]);

  const handleAddToCart = () => {
    addItem({
      id: product.id || product.link || product.title,
      title: product.title,
      price: parsePrice(product.price),
      image: images[0],
    });
  };

  const handleBuyNow = useCallback(() => {
    const item = {
      id: product.id || product.link || product.title,
      title: product.title,
      price: parsePrice(product.price),
      image: images[0],
    };
    addItemSilent(item);
    if (!user) {
      setPostAuthRedirect("/checkout");
      setShowLogin(true);
    } else {
      router.push("/checkout");
    }
  }, [product, addItemSilent, images, user, router, setShowLogin]);

  return (
    <section className="max-w-7xl mx-auto px-7 pb-7 pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* 左侧图片 */}
        <div className="w-full">
          <Link href={product.link} className="block relative rounded-xl overflow-hidden">
            <div className="relative w-[580px] h-[550px] max-w-full rounded-xl overflow-hidden">
              <Image
                src={images[currentImgIndex]}
                alt={product.title}
                fill
                priority
                sizes="580px"
                loading="eager"
                className="object-cover rounded-xl"
              />
            </div>
          </Link>
          {showThumbnails && images.length > 1 && (
            <div className="flex gap-3 mt-4 pb-2 overflow-x-auto scrollbar-hide animate-in fade-in duration-200">
              {images.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setCurrentImgIndex(idx)}
                  className={`w-20 h-20 rounded-md overflow-hidden transition-all ${currentImgIndex === idx
                    ? "border border-zinc-900"
                    : "border border-zinc-200 hover:border-zinc-400"
                    }`}
                >
                  <Image src={img} alt="" width={80} height={80} loading="eager" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 右侧内容 */}
        <div className="space-y-6 py-4">
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold mb-3">
            {product.title}
          </h2>
          <p className="text-gray-600 text-lg">
            {product.desc}
          </p>
          <div className="text-2xl font-bold">
            {product.price}
          </div>
          <div className="flex flex-col gap-4 pt-4">
            <Button
              variant="outline"
              size="lg"
              className="w-full h-14 text-xl font-medium"
              onClick={handleAddToCart}
            >
              加入购物车
            </Button>
            <Button
              variant="default"
              size="lg"
              className="w-full h-14 text-xl font-medium"
              onClick={handleBuyNow}
            >
              立即购买
            </Button>
          </div>

          {/* 下载指南 & 文件说明 */}
          <div className="border-t pt-6 mt-6 space-y-4 text-sm text-gray-600">
            {/* 下载必看 */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">下载必看</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  购买成功后直接点击下载
                </li>
                <li>
                  非会员需注册登陆后才能购买
                </li>
              </ul>
            </div>

            {/* 文件说明 */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">文件说明</h4>
              <p className="text-sm text-gray-600">
                资源文件通过网盘下载，压缩包密码 <strong className="text-gray-900">XSTL</strong>。如果下载链接失效，请联系
                <Button
                  variant="outline"
                  size="sm"
                  className="inline-flex items-center gap-1 text-sm h-7 px-2 ml-1 align-baseline"
                >
                  <MessageCircle size={14} />
                  微信客服
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}