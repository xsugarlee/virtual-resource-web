// app/(legal)/terms/page.tsx
import type { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "服务条款与隐私协议 - 小酥糖里电商资源网",
  description: "小酥糖里电商资源网服务条款、隐私协议与免责声明",
};

export default function TermsPage() {
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
                服务条款
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* 正文内容 */}
      <article className="max-w-7xl mx-auto px-6 md:px-10 pb-20">
        <h1 className="text-3xl font-bold mt-4 mb-2">服务条款与隐私协议</h1>
        <p className="text-sm text-muted-foreground mb-10">
          生效日期：2026 年 5 月 1 日 · 最后更新：2026 年 5 月
        </p>

        <div className="prose prose-gray max-w-none space-y-8 text-sm leading-relaxed">
          {/* 引言 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">一、引言</h2>
            <p>
              欢迎使用小酥糖里电商资源网（以下简称“本站”）。本服务条款与隐私协议（以下简称“本协议”）是您（用户）与本站之间关于使用本站网站、服务及产品（统称“服务”）的法律协议。无论您是游客（访客）还是注册会员，一旦访问本站或使用任何服务，即表示您已充分阅读、理解并同意受本协议约束。若您不同意本协议的任何条款，请立即停止使用本站服务。
            </p>
          </section>

          {/* 定义 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">二、定义</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>用户：</strong>指所有访问本站的自然人或法人，包括访客和会员。</li>
              <li><strong>访客：</strong>未注册账户，仅浏览本站内容的用户。</li>
              <li><strong>会员：</strong>完成注册程序并经本站确认的用户。</li>
              <li><strong>内容：</strong>本站提供的数字产品、咨询服务及所有页面资料的总称。</li>
              <li><strong>产品：</strong>本站通过下载或在线交付方式提供的数字商品与咨询服务。</li>
              <li><strong>Cookie：</strong>由本站存储在您设备上的小型数据文件，用于改善体验、记住偏好或辅助登录。</li>
            </ul>
          </section>

          {/* 协议范围与接受 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">三、协议范围与接受</h2>
            <p>
              本协议适用于您对本站所有页面、子域名及相关服务的访问和使用。使用本站即视为您确认接受本协议，并承诺遵守所有适用的中国法律法规。如果您代表某个实体使用本站，您声明并保证您有权代表该实体接受本协议。
            </p>
          </section>

          {/* 访问与会员资格 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">四、访问与会员资格</h2>
            <p>
              您无需注册即可浏览本站内容。若想获得更多功能或下载特定资源，可能需要注册成为会员。注册时您必须提供准确、完整的信息，并保证及时更新。您须年满18周岁（或达到您所在地区法定成年年龄）。本站保留在未预先通知的情况下，自行决定批准、暂停或终止会员资格的权利。
            </p>
          </section>

          {/* 账户终止 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">五、账户终止</h2>
            <p>
              本站有权基于任何原因（包括但不限于违反本协议）随时暂停或终止您的账户，无需事先通知。您也可以随时停止使用本站服务并注销账户。终止后，本协议授予您的所有权利将立即终止，本站保留追究违约责任的权利。
            </p>
          </section>

          {/* 资源获取与下载 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">六、资源获取与下载</h2>
            <p>
              本站所有资源均为数字格式，不提供实体商品。您通过本站获取的数字产品可在完成相应流程后即时下载。由于数字产品的即时可复制性，<strong>本站不提供退款服务</strong>，特殊情况将根据具体问题酌情处理。本站不存储您的支付信息，所有支付均由第三方支付平台完成。
            </p>
          </section>

          {/* 用户权利与义务 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">七、用户权利与义务</h2>
            <p>您在使用本站服务时，同意遵守以下义务：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>仅通过合法途径访问和使用本站；</li>
              <li>使用自己的设备并维持安全网络连接；</li>
              <li>保护自己的账户凭据，对账户下所有活动负责；</li>
              <li>不得复制、转售、商业利用或反向工程本站的任何部分；</li>
              <li>不得干扰、破坏本站服务器、网络或其他服务；</li>
              <li>不得使用任何自动化手段（如爬虫、机器人）抓取内容；</li>
              <li>不得利用本站从事任何违法或侵犯他人权利的活动。</li>
            </ul>
            <p>违反上述义务，本站可立即暂停或终止服务，并保留追究法律责任的权利。</p>
          </section>

          {/* 网站权利与义务 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">八、网站权利与义务</h2>
            <p>
              本站有权在未事先通知的情况下，修改、增强或停止部分服务及产品。本站会通过适当方式发布更新通知（包括补丁、新功能），这些更新将自动成为服务的一部分并受本协议约束。本站不保证服务始终无错误、不中断或完全符合您的预期。
            </p>
          </section>

          {/* 免责声明 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">九、免责声明与不保证</h2>
            <p>在法律允许的最大范围内，本站的服务及所有内容均按“现状”和“可提供”基础提供，不附带任何明示或默示的保证。本站不保证：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>服务不会中断、及时、安全或完全无错误；</li>
              <li>内容与特定设备或软件完全兼容；</li>
              <li>任何内容的准确性、可靠性或完整性；</li>
              <li>免受病毒、恶意软件或其他有害组件的侵害。</li>
            </ul>
          </section>

          {/* 责任限制 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">十、责任限制</h2>
            <p>
              在法律允许的最大范围内，本站及其关联方不对任何间接、偶然、特殊或后果性损害（包括但不限于数据丢失、利润损失、业务中断）承担责任。本站对您因使用服务而产生的全部责任，仅限于您为相关服务所支付的金额（如有）。若您所在地区不允许排除或限制某些责任，则上述限制可能不适用。
            </p>
          </section>

          {/* 知识产权与版权声明 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">十一、知识产权与版权声明</h2>
            <p>
              本站界面、标志、设计及原创内容的知识产权归本站所有。本站所收录的第三方资源（素材、模板、文档等）均来源于互联网公开渠道或用户投稿，<strong>仅供学习、交流和研究使用</strong>，严禁用于任何商业用途。本站不拥有此类资源的版权，亦不提供任何形式的商业使用授权。若用户擅自用于商业目的引发纠纷，一切后果由使用者自行承担，与本站无关。
            </p>
            <p>
              依据《计算机软件保护条例》第十七条：“为了学习和研究软件内含的设计思想和原理，通过安装、显示、传输或者存储软件等方式使用软件的，可以不经软件著作权人许可，不向其支付报酬。”本站所有内容均为非商业目的的学术交流与知识分享。
            </p>
          </section>

          {/* 版权投诉 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">十二、版权投诉与删除</h2>
            <p>
              如果您认为本站内容侵犯了您的合法权益，请通过本协议末尾的联系方式向我们发送书面通知。通知需包含：权利人身份证明、权属证明、侵权内容的具体链接及说明、有效联系方式。本站将在收到完整材料后 <strong>5 个工作日内</strong> 核实并处理，移除涉嫌侵权的内容。
            </p>
          </section>

          {/* 第三方链接 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">十三、第三方链接</h2>
            <p>
              本站可能包含指向第三方网站的链接。本站对这些网站的内容、隐私协议或行为不作任何担保，亦不承担任何责任。您访问第三方网站时，应自行查阅其条款与协议。
            </p>
          </section>

          {/* 关于赔偿 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">十四、关于赔偿</h2>
            <p>
              您同意赔偿并使本站及其关联方免受因您违反本协议、使用服务或侵犯第三方权利而产生的任何索赔、损失或费用（包括合理律师费）。
            </p>
          </section>

          {/* Cookie 使用 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">十五、Cookie 使用</h2>
            <p>
              本站使用 Cookie 改善您的浏览体验。您可以在浏览器中禁用 Cookie，但这可能影响部分功能的正常使用。继续使用本站即表示您同意我们使用 Cookie。
            </p>
          </section>

          {/* 隐私协议 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">十六、隐私协议</h2>
            <p>
              您的个人信息受本站隐私协议保护。本站仅收集必要的服务相关信息，并采取合理措施保障信息安全。未经您同意，本站不会向第三方出售或交换您的个人信息，但法律要求或为保护本站合法权益的除外。
            </p>
          </section>

          {/* 赞助与付费说明 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">十七、赞助与付费说明</h2>
            <p>
              本站所有数字资源均为免费分享，不进行售卖。用户自愿赞助的费用仅用于服务器、域名、网站维护及其他运营支出，<strong>并非用于购买任何资源的商业使用权或版权</strong>。若需商用，请自行联系原版权所有者获取授权。由于数字产品的即时可复制性，赞助后概不退款。
            </p>
          </section>

          {/* 不可抗力 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">十八、不可抗力</h2>
            <p>
              本站不对因不可抗力（如自然灾害、网络攻击等）导致的服务延迟或无法履行承担责任。
            </p>
          </section>

          {/* 适用法律与争议解决 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">十九、适用法律与争议解决</h2>
            <p>
              本协议适用中华人民共和国法律（不包括冲突法规范）。因本协议引起的或与之相关的任何争议，应首先友好协商解决；协商不成的，任何一方均有权向本站所在地有管辖权的人民法院提起诉讼。
            </p>
          </section>

          {/* 条款修改 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">二十、条款修改</h2>
            <p>
              本站保留随时修改本协议的权利。修改后的条款将在页面发布时生效，并通过站内公告或适当方式通知。您继续使用本站服务即视为接受修改后的协议。请定期查阅本页面。
            </p>
          </section>

          {/* 其他条款 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">二十一、其他条款</h2>
            <p>
              本协议构成您与本站之间的完整协议，取代之前所有口头或书面的沟通。如果本协议任何条款被认定为无效或不可执行，其余条款仍具完全效力。本站未行使或执行本协议中的任何权利，不构成对该权利的放弃。
            </p>
          </section>

          {/* 联系方式 */}
          <section>
            <h2 className="text-lg font-semibold mb-3">二十二、联系我们</h2>
            <p>
              如对本协议有任何疑问、意见或投诉，请通过以下方式联系：
            </p>
            <p>
              <strong>联系邮箱：</strong>xstl_service@hotmail.com
            </p>
            <p>
              我们将在合理时间内（一般不超过 15 个工作日）予以回复和处理。
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}