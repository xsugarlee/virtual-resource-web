import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-1 pt-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <h4 className="text-base font-semibold mb-5">帮助中心</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/category/footer/aboutus" className="hover:text-black transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/category/footer/question" className="hover:text-black transition-colors">
                  常见问题
                </Link>
              </li>
              <li>
                <Link href="/category/footer/privacy" className="hover:text-black transition-colors">
                  隐私条款
                </Link>
              </li>
              <li>
                <Link href="/category/footer/userpol" className="hover:text-black transition-colors">
                  用户协议
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold mb-5">资源分类</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/category/ecomats" className="hover:text-black transition-colors">
                  电商资源
                </Link>
              </li>
              <li>
                <Link href="/category/jobtips" className="hover:text-black transition-colors">
                  求职干货
                </Link>
              </li>
              <li>
                <Link href="/category/consult" className="hover:text-black transition-colors">
                  问题咨询
                </Link>
              </li>
              <li>
                <Link href="/category/opsnav" className="hover:text-black transition-colors">
                  运营导航
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold mb-5">入驻合作</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>成为创作者</li>
              <li>推广联盟</li>
              <li>合作伙伴</li>
              <li>学生计划</li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold mb-5">最新活动</h4>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-sm font-medium mb-2">🔥 全站8折特惠</p>
              <p className="text-xs text-gray-500 mb-3">
                限时7天，全部资源打包更划算
              </p>
              <Link
                href="/footer/activities"
                className="text-xs text-black underline"
              >
                查看详情 →
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-10 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2026 小酥糖里电商库 Co</p>
          <div className="flex gap-5 mt-4 md:mt-0">
            <span>B站</span>
            <span>抖音</span>
            <span>知乎</span>
            <span>小红书</span>
          </div>
        </div>
      </div>
    </footer>
  );
}