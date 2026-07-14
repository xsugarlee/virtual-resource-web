import ProductCard, { type ProductCardData } from "./ProductCard";

interface ProductGridProps {
  readonly title: string;
  readonly products: ProductCardData[];
}

export default function ProductGrid({ title, products }: ProductGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-7 py-20 pb-7">
      <div className="text-center mb-20">
        <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product, index) => (
          <ProductCard key={`${product.link}-${index}`} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}