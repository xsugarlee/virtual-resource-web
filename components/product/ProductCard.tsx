import Image from "next/image";
import Link from "next/link";

export interface ProductCardData {
  title: string;
  desc: string;
  price: string;
  img1: string;
  img2: string;
  link: string;
}

interface ProductCardProps {
  readonly product: ProductCardData;
  readonly index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <div
      className="group opacity-0 animate-fadeIn"
      style={{
        animationDelay: `${index * 80}ms`,
        animationFillMode: "forwards",
      }}
    >
      <Link href={product.link} className="block">
        <div className="overflow-hidden rounded-xl bg-white border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="aspect-square overflow-hidden relative">
            <Image
              src={product.img1}
              alt={product.title}
              fill
              sizes="20vw"
              loading="eager"
              className="object-cover absolute inset-0 transition-opacity duration-1000 ease-in-out group-hover:opacity-0"
            />
            <Image
              src={product.img2}
              alt={product.title}
              fill
              sizes="20vw"
              loading="eager"
              className="object-cover absolute inset-0 opacity-0 transition-opacity duration-1000 ease-in-out group-hover:opacity-100"
            />
          </div>
        </div>
        <div className="pt-4 pb-7 text-center">
          <h3 className="text-base font-medium mb-2">{product.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{product.desc}</p>
          <span className="text-lg font-semibold">{product.price}</span>
        </div>
      </Link>
    </div>
  );
}