import FadeInSection from "@/components/shared/FadeInSection";

export default function BrandGrid() {
  return (
    <FadeInSection>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">深受品牌信赖</h2>
        <p className="text-gray-500">已被1000+企业与团队信赖使用</p>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-8 opacity-60">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="h-10 bg-gray-100 rounded" />
        ))}
      </div>
    </FadeInSection>
  );
}