export interface LinkCard {
    id: string;
    logo: string;
    name: string;
    desc: string;
    url: string;
}

export interface CategoryGroup {
    title: string;
    icon: string;
    cards: LinkCard[];
}

export const categories: CategoryGroup[] = [
    // ======================== 电商平台 ========================
    {
        title: "电商平台",
        icon: "ShoppingCart",
        cards: [
            { id: "1-1", logo: "/images/brands/taobao.webp", name: "淘宝", desc: "C2C 万能电商平台", url: "https://www.taobao.com/" },
            { id: "1-2", logo: "/images/brands/tianmao.webp", name: "天猫", desc: "B2C 品牌直营商城", url: "https://www.tmall.com/" },
            { id: "1-3", logo: "/images/brands/jingdong.webp", name: "京东", desc: "自营正品 + 极速物流", url: "https://www.jd.com/" },
            { id: "1-4", logo: "/images/brands/pinduoduo.webp", name: "拼多多", desc: "社交拼团性价比之王", url: "https://www.pinduoduo.com/" },
            { id: "1-5", logo: "/images/brands/douyindj.webp", name: "抖音电商", desc: "短视频/直播带货主阵地", url: "https://douyinec.com/" },
            { id: "1-6", logo: "/images/brands/kuaishouxd.webp", name: "快手小店", desc: "快手直播电商入口", url: "https://www.kwaixiaodian.com/" },
            { id: "1-7", logo: "/images/brands/xiaohongshu.webp", name: "小红书", desc: "种草社区与笔记带货", url: "https://www.xiaohongshu.com/" },
            { id: "1-8", logo: "/images/brands/1688.webp", name: "1688", desc: "国内最大 B2B 批发平台", url: "https://www.1688.com/" },
            { id: "1-9", logo: "/images/brands/xianyu.webp", name: "闲鱼", desc: "二手交易与闲置流通", url: "https://goofish.com/" },
            { id: "1-10", logo: "/images/brands/dewu.webp", name: "得物", desc: "潮流装备鉴定交易", url: "https://www.dewu.com/" },
        ],
    },

    // ======================== 运营中心 ========================
    {
        title: "运营中心",
        icon: "Monitor",
        cards: [
            { id: "2-1", logo: "/images/brands/qianniu.webp", name: "千牛卖家中心", desc: "淘宝/天猫统一工作台", url: "https://myseller.taobao.com/home.htm/QnworkbenchHome/" },
            { id: "2-2", logo: "/images/brands/jingmai.webp", name: "京麦工作台", desc: "京东商家运营后台", url: "https://jm.jd.com/" },
            { id: "2-3", logo: "/images/brands/pinduoduo.webp", name: "拼多多商家后台", desc: "商品/订单/营销管理", url: "https://mms.pinduoduo.com/" },
            { id: "2-4", logo: "/images/brands/douyinds.webp", name: "抖店", desc: "抖音电商商家平台", url: "https://fxg.jinritemai.com/" },
            { id: "2-5", logo: "/images/brands/kuaishouxd.webp", name: "快手电商后台", desc: "快手小店管理平台", url: "https://e.kuaishou.com/" },
            { id: "2-6", logo: "/images/brands/xiaohongshu.webp", name: "小红书专业号", desc: "品牌合作与内容管理", url: "https://pro.xiaohongshu.com/" },
            { id: "2-8", logo: "/images/brands/qianfan.webp", name: "小红书千帆", desc: "小红书广告投放平台", url: "https://qianfan.xiaohongshu.com/" },
            { id: "2-7", logo: "/images/brands/shipinhaoxd.webp", name: "视频号小店", desc: "微信带货店铺后台", url: "https://store.weixin.qq.com/" },
        ],
    },

    // ======================== 营销推广 ========================
    {
        title: "营销推广",
        icon: "Megaphone",
        cards: [
            { id: "3-1", logo: "/images/brands/qianchuanyq.webp", name: "巨量千川", desc: "抖音电商广告投放平台", url: "https://qianchuan.jinritemai.com/login" },
            { id: "3-2", logo: "/images/brands/alimama.webp", name: "阿里妈妈", desc: "淘宝/天猫全系营销产品", url: "https://one.alimama.com/" },
            { id: "3-3", logo: "/images/brands/jingdonglm.webp", name: "京东联盟", desc: "CPS 推广与流量变现", url: "https://union.jd.com/index" },
            { id: "3-4", logo: "/images/brands/pinduoduo.webp", name: "拼多多推广", desc: "竞价推广、多多进宝", url: "https://ims.pinduoduo.com/" },
            { id: "3-5", logo: "/images/brands/ciliyinqin.webp", name: "磁力智投", desc: "快手商业广告投放", url: "https://ad.e.kuaishou.com/" },
            { id: "3-6", logo: "/images/brands/tengxungg.webp", name: "腾讯广告", desc: "朋友圈/公众号广告", url: "https://ad.qq.com/" },
            { id: "3-7", logo: "/images/brands/juliangqc.webp", name: "巨量引擎", desc: "字节跳动综合营销", url: "https://www.oceanengine.com/" },
        ],
    },

    // ======================== 数据分析 ========================
    {
        title: "数据分析",
        icon: "BarChart3",
        cards: [
            { id: "4-1", logo: "/images/brands/shengyicm.webp", name: "生意参谋", desc: "淘宝/天猫官方数据平台", url: "https://sycm.taobao.com/" },
            { id: "4-2", logo: "/images/brands/diantoushi.webp", name: "店透视", desc: "商品数据透视任意商品销售额", url: "https://diantoushi.com/" },
            { id: "4-3", logo: "/images/brands/dianchacha.webp", name: "店查查", desc: "淘宝店铺数据分析监控", url: "https://www.dianchacha.com/" },
            { id: "4-4", logo: "/images/brands/jingdongzz.webp", name: "京东商智", desc: "京东店铺数据分析", url: "https://sz.jd.com/" },
            { id: "4-5", logo: "/images/brands/doudianlp.webp", name: "抖店罗盘", desc: "抖音电商经营诊断", url: "https://compass.jinritemai.com/shop" },
            { id: "4-6", logo: "/images/brands/relangsj.webp", name: "热浪数据", desc: "抖音/B站数据分析", url: "https://www.relangdata.cn/" },
            { id: "4-7", logo: "/images/brands/xinbang.webp", name: "新榜", desc: "内容产业数据平台", url: "https://xd.newrank.cn/" },
        ],
    },

    // ======================== 电商货源 ========================
    {
        title: "电商货源",
        icon: "Package",
        cards: [
            { id: "5-1", logo: "/images/brands/anibaba.webp", name: "1688 货源", desc: "国内最大 B2B 平台", url: "https://www.1688.com/" },
            { id: "5-2", logo: "/images/brands/tianmaogx.webp", name: "天猫供销平台", desc: "天猫分销与代发", url: "https://gongxiao.tmall.com/" },
            { id: "5-3", logo: "/images/brands/pinduoduo.webp", name: "拼多多批发", desc: "拼多多供货批发", url: "https://pifa.pinduoduo.com/" },
            { id: "5-4", logo: "/images/brands/soukuanw.webp", name: "搜款网", desc: "服装档口一手货源", url: "https://www.vvic.com/" },
            { id: "5-5", logo: "/images/brands/yiwugou.webp", name: "义乌购", desc: "义乌小商品线上市场", url: "https://www.yiwugo.com/" },
        ],
    },

    // ======================== 物流快递 ========================
    {
        title: "物流快递",
        icon: "Truck",
        cards: [
            { id: "6-1", logo: "/images/brands/shunfengsy.webp", name: "顺丰速运", desc: "高品质时效快递", url: "https://www.sf-express.com/" },
            { id: "6-2", logo: "/images/brands/jingdongwl.webp", name: "京东物流", desc: "仓配一体化服务", url: "https://www.jdl.com/" },
            { id: "6-3", logo: "/images/brands/cainiao.webp", name: "菜鸟网络", desc: "阿里智慧物流平台", url: "https://www.cainiao.com/" },
            { id: "6-4", logo: "/images/brands/yunda.webp", name: "韵达速递", desc: "知名快递品牌", url: "https://www.yundaex.com/cn/index.php" },
            { id: "6-5", logo: "/images/brands/zhongtong.webp", name: "中通快递", desc: "国内主流快递品牌", url: "https://www.zto.com/" },
            { id: "6-6", logo: "/images/brands/yuantong.webp", name: "圆通速递", desc: "大型快递企业", url: "https://www.yto.net.cn/" },
            { id: "6-7", logo: "/images/brands/shentong.webp", name: "申通快递", desc: "经济型快递网络", url: "https://www.sto.cn/" },
            { id: "6-8", logo: "/images/brands/jitukuaidi.webp", name: "极兔速递", desc: "全球快递品牌", url: "https://www.jtexpress.cn/" },
        ],
    },

    // ======================== 流量工具 ========================
    {
        title: "流量工具",
        icon: "TrendingUp",
        cards: [
            { id: "7-1", logo: "/images/brands/chanmofang.webp", name: "蝉魔方", desc: "抖音电商选品分析", url: "https://www.chanmofang.com/" },
            { id: "7-2", logo: "/images/brands/feigua.webp", name: "飞瓜数据", desc: "抖音快手直播数据", url: "https://dy.feigua.cn/" },
            { id: "7-3", logo: "/images/brands/youmiyoushu.webp", name: "有米有数", desc: "移动广告选品洞察", url: "https://youshu.youcloud.com/" },
            { id: "7-4", logo: "/images/brands/baizhun.webp", name: "百准", desc: "视频号数据分析", url: "https://www.baizhun.cn/" },
            { id: "7-5", logo: "/images/brands/dianleida.webp", name: "店雷达", desc: "电商选品竞品分析", url: "https://dianleida.net/" },
        ],
    },

    // ======================== 智能工具 ========================
    {
        title: "智能工具",
        icon: "Cpu",
        cards: [
            { id: "8-1", logo: "/images/brands/deepseek.webp", name: "DeepSeek", desc: "深度求索AI对话模型", url: "https://www.deepseek.com/" },
            { id: "8-2", logo: "/images/brands/doubao.webp", name: "豆包", desc: "字节跳动AI助手", url: "https://www.doubao.com/" },
            { id: "8-3", logo: "/images/brands/tongyiqwen.webp", name: "通义千问", desc: "阿里云AI大模型", url: "https://tongyi.aliyun.com/" },
            { id: "8-4", logo: "/images/brands/wenxinyy.webp", name: "文心一言", desc: "百度知识增强大模型", url: "https://www.kimi.com/" },
            { id: "8-5", logo: "/images/brands/kimi.webp", name: "KIMI", desc: "月之暗面旗下AI对话模型", url: "https://chatglm.cn/" },
        ],
    },

    // ======================== 店铺管理 ========================
    {
        title: "店铺管理",
        icon: "HardDrive",
        cards: [
            { id: "9-1", logo: "/images/brands/dianxiaomi.webp", name: "店小秘", desc: "跨境电商 ERP 管理系统", url: "https://www.dianxiaomi.com/" },
            { id: "9-2", logo: "/images/brands/yicang.webp", name: "易仓 ERP", desc: "跨境卖家全流程管理", url: "https://www.eccang.com/" },
            { id: "9-3", logo: "/images/brands/jushuitan.webp", name: "聚水潭", desc: "SaaS ERP 后端一体化", url: "https://www.jushuitan.com/" },
            { id: "9-4", logo: "/images/brands/wangdiantong.webp", name: "旺店通", desc: "电商 ERP 与 WMS 系统", url: "https://www.wangdian.cn/" },
            { id: "9-5", logo: "/images/brands/wanliniu.webp", name: "万里牛", desc: "全渠道电商 ERP", url: "https://www.hupun.com/" },
            { id: "9-6", logo: "/images/brands/mabang.webp", name: "马帮 ERP", desc: "跨境全流程管理软件", url: "https://www.mabangerp.com/index.htm" },
        ],
    },

    // ======================== 支付金融 ========================
    {
        title: "支付金融",
        icon: "Wallet",
        cards: [
            { id: "10-1", logo: "/images/brands/zhifubao.webp", name: "支付宝", desc: "中国领先支付平台", url: "https://www.alipay.com/" },
            { id: "10-2", logo: "/images/brands/weixinzhifu.webp", name: "微信支付", desc: "腾讯移动支付", url: "https://pay.weixin.qq.com/" },
            { id: "10-3", logo: "/images/brands/paypal.webp", name: "PayPal", desc: "全球在线支付工具", url: "https://www.paypal.com/" },
            { id: "10-4", logo: "/images/brands/lianlian.webp", name: "连连支付", desc: "跨境支付与资金分发", url: "https://global.lianlianpay.com/" },
            { id: "10-5", logo: "/images/brands/wanlihui.webp", name: "万里汇", desc: "WorldFirst 跨境收款", url: "https://www.worldfirst.com/en-hk/" },
            { id: "10-5", logo: "/images/brands/kongzyh.webp", name: "Airwallex", desc: "空中云汇企业账户", url: "https://www.airwallex.com/hk" },
        ],
    },
];