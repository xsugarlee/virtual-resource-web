import Image from "next/image";
import Link from "next/link";

export interface Product {
  id?: string;
  title: string;
  desc: string;
  price: string;
  img1: string;
  img2: string;
  images?: string[];
  link: string;
}

interface ProductDetailGridProps {
  readonly title: string;
  readonly products: Product[];
}

export default function ProductDetailGrid({ title, products }: ProductDetailGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-7 py-5 pb-2">
      <h2 className="text-[clamp(1.5rem,2.5vw,2.2rem)] font-semibold text-center mb-12">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {products.map((product, index) => (
          <div
            key={`${product.link}-${index}`}
            className="opacity-0 animate-fadeIn"
            style={{
              animationDelay: `${index * 80}ms`,
              animationFillMode: "forwards",
            }}
          >
            <Link href={product.link} className="block group">
              <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                <figure className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.img1}
                    alt={product.title}
                    fill
                    sizes="20vw"
                    loading="eager"
                    className="object-cover transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-0"
                  />
                  <Image
                    src={product.img2}
                    alt={product.title}
                    fill
                    sizes="20vw"
                    loading="eager"
                    className="object-cover absolute inset-0 opacity-0 transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-100"
                  />
                </figure>
              </div>
              <div className="pt-4 text-center">
                <h3 className="text-base font-medium mb-2">{product.title}</h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-1">{product.desc}</p>
                <span className="text-lg font-semibold">{product.price}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}