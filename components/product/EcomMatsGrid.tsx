import Image from "next/image";
import Link from "next/link";

export interface Product {
  title: string;
  desc: string;
  price: string;
  img1: string;
  img2: string;
  link: string;
  id?: string;
  images?: string[];
}

interface BestItemsGridProps {
  readonly products: Product[];
  readonly currentPage?: number; // 可选，用于分页时确保 key 唯一
}

export default function BestItemsGrid({ products, currentPage = 1 }: BestItemsGridProps) {
  if (products.length === 0) {
    return (
      <div className="col-span-5 py-20 text-center text-gray-500">
        暂无该分类商品，请选择其他分类
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-7 pb-10 flex-1">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {products.map((product, index) => (
          <Link
            key={`${product.link}-${currentPage}-${index}`}
            href={product.link}
            className="group opacity-0 animate-fadeIn"
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: "forwards",
            }}
          >
            <div className="card bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
              <figure className="aspect-square relative overflow-hidden">
                <Image
                  src={product.img1}
                  alt={product.title}
                  fill
                  sizes="20vw"
                  className="object-cover transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-0"
                  priority={index === 0}
                  loading="eager"
                />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Image
                    src={product.img2}
                    alt={`${product.title} hover`}
                    fill
                    sizes="20vw"
                    loading="eager"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </figure>
            </div>
            <div className="pt-4 pb-6 text-center">
              <h2 className="text-base font-medium mb-2">{product.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{product.desc}</p>
              <span className="text-lg font-semibold">{product.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}