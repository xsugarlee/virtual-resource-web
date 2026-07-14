"use client";

import { useState, Fragment, useMemo, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/product/ProductGrid";
import type { ProductCardData } from "@/components/product/ProductCard";
import { useCartContext, parsePrice } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { setPostAuthRedirect } from "@/lib/post-auth-redirect";
import { allProducts } from "@/lib/services/jobtips";
import { Product } from "@/types/products";

// -------------------- ProductHero（支持视频） --------------------
const ProductHero = ({
  product,
  hasVideo = false,
  showThumbnails = false,
}: {
  product: Product & { video?: string };
  hasVideo?: boolean;
  showThumbnails?: boolean;
}) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const images = product.images || [product.img1, product.img2];
  const router = useRouter();
  const { addItem, addItemSilent } = useCartContext();
  const { user, setShowLogin } = useAuth();

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
  }, [product, addItem, user, router, setShowLogin]);

  return (
    <section className="max-w-7xl mx-auto px-7 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="w-full">
          <Link
            href={product.link}
            className="block relative rounded-xl overflow-hidden"
          >
            <div className="aspect-square relative w-full">
              {hasVideo && product.video ? (
                <video
                  src={product.video}
                  className="w-full h-full object-cover rounded-xl"
                  controls
                  muted
                  autoPlay
                  loop
                />
              ) : (
                <Image
                  src={images[currentImgIndex]}
                  alt={product.title}
                  fill
                  sizes="50vw"
                  loading="eager"
                  className="object-cover rounded-xl"
                  priority
                />
              )}
            </div>
          </Link>
          {showThumbnails && images.length > 1 && (
            <div className="flex gap-3 mt-4 pb-2 overflow-x-auto scrollbar-hide">
              {images.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setCurrentImgIndex(idx)}
                  className={`w-20 h-20 rounded-md overflow-hidden transition-all ${currentImgIndex === idx
                    ? "border-2 border-zinc-900"
                    : "border border-zinc-200 hover:border-zinc-400"
                    }`}
                >
                  <Image
                    src={img}
                    alt=""
                    width={80}
                    height={80}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6 py-4">
          <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold mb-3">
            {product.title}
          </h2>
          <p className="text-gray-600 text-lg">{product.desc}</p>
          <div className="text-2xl font-bold">{product.price}</div>
          <div className="flex flex-col gap-4 pt-4">
            <Button
              variant="outline"
              className="w-full h-14 text-xl font-medium"
              onClick={handleAddToCart}
            >
              加入购物车
            </Button>
            <Button variant="default" className="w-full h-14 text-xl font-medium" onClick={handleBuyNow}>
              立即购买
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// -------------------- 主页面 --------------------
export default function CategoryPage() {
  const pathname = usePathname();
  const productGroups = useMemo(() => {
    const groups: Product[][] = [];
    groups.push(allProducts);

    const perGroup = 5;
    for (let i = 0; i < allProducts.length; i += perGroup) {
      const slice = allProducts.slice(i, i + perGroup);
      if (slice.length > 0) groups.push(slice);
    }
    // 只取前7组，避免出现分区8、9...
    return groups.slice(0, 7);
  }, []);

  const titles = [
    "求职干货",
    "精选系列",
    "热门推荐",
    "新品上架",
    "优质精选",
    "限量专区",
    "更多好物",
  ];

  // 将 Product 转为 ProductCardData
  const toCardData = (product: Product): ProductCardData => ({
    title: product.title,
    desc: product.desc,
    price: product.price,
    img1: product.img1,
    img2: product.img2,
    link: product.link,
  });

  return (
    <div key={pathname} className="min-h-screen bg-white text-black antialiased">
      <main className="max-w-7xl mx-auto px-7 pt-2 pb-16">
        {productGroups.map((group, idx) => {
          const title = titles[idx] ?? `分区 ${idx + 1}`;
          const groupKey =
            group.length > 0
              ? group.map((p) => p.id || p.link).join(",")
              : `empty-group-${idx}`;

          const heroProduct =
            group.length > 0
              ? group.find((p) => p.images?.[0] === "/images/products/product-5.jpeg") || group[0]
              : undefined;

          return (
            <Fragment key={groupKey}>
              <ProductGrid title={title} products={group.map(toCardData)} />
              {heroProduct && <ProductHero product={heroProduct} />}
            </Fragment>
          );
        })}
      </main>
    </div>
  );
}