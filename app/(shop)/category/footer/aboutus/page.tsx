// app/(legal)/about/page.tsx
import type { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "关于我们 - 小酥糖里电商资源网",
  description: "了解小酥糖里电商资源网",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black antialiased">
      {/* Header 面包屑 */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8 pb-4">
        <Breadcrumb>
          <BreadcrumbList className="text-sm text-muted-foreground">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="hover:text-foreground transition-colors">
                主页
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="text-foreground">
                关于我们
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* 正文内容 */}
      <article className="max-w-7xl mx-auto px-6 md:px-10 pb-20">
        <h1 className="text-3xl font-bold mt-4 mb-2">关于小酥糖里</h1>
        <p className="text-sm text-muted-foreground mb-10">
          专注电商资源，赋能高效运营
        </p>

        <div className="prose prose-gray max-w-none space-y-8 text-sm leading-relaxed">
          <section>
            <p>
              小酥糖里电商资源网致力于电商运营知识的共享与原创资料的产出。我们自主设计并整理各类电商实用资源，包括文档模板、数据表格、演示文稿、简历设计及咨询指导服务，精准分类，帮助每一位电商从业者提高工作效率。
            </p>
            <p>
              认准本站唯一渠道，谨防上当。我们将持续更新优质内容，陪伴您的电商成长之路。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">联系我们</h2>
            <p>
              如您在使用本站服务过程中遇到任何问题，或有合作意向，欢迎通过以下方式与我们取得联系：
            </p>
            <p>
              <strong>联系邮箱：</strong>xxstl_service@hotmail.com
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}