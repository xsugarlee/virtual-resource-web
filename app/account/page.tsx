"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, User, Package, Shield, LogOut,
  Clock, Trash2, CreditCard, Heart, Mail, Phone, AtSign,
  CalendarDays, Check, AlertTriangle, Key,
  Send, Lock, Smartphone,
} from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formatPrice = (p: number) => `¥${p.toFixed(2)}`;

interface OrderItem { id: string; title: string; price: number; image: string; quantity: number; }
interface Order {
  id: string; items: OrderItem[]; totalAmount: number; status: string;
  createdAt: string; expiresAt: string; paidAt?: string;
}

function Countdown({ expiresAt, onExpire }: { expiresAt: string; onExpire: () => void }) {
  const [r, setR] = useState("");
  useEffect(() => {
    const t = () => {
      const d = new Date(expiresAt).getTime() - Date.now();
      if (d <= 0) { setR("已过期"); onExpire(); return; }
      setR(`${String(Math.floor(d / 60000)).padStart(2, "0")}:${String(Math.floor((d % 60000) / 1000)).padStart(2, "0")}`);
    };
    t(); const id = setInterval(t, 1000);
    return () => clearInterval(id);
  }, [expiresAt, onExpire]);
  return <span className={r === "已过期" ? "text-red-500" : "text-amber-500 font-mono"}>{r}</span>;
}

function OrderCard({ order, onPay, onDelete, onTip }: {
  order: Order; onPay: (id: string) => void; onDelete: (id: string) => void; onTip: (id: string) => void;
}) {
  const expired = order.status === "cancelled";
  const s: Record<string, string> = { paid: "已支付", pending: "待支付", cancelled: "已取消" };
  const sc: Record<string, string> = { paid: "text-green-600 bg-green-50 border-green-200", pending: "text-amber-600 bg-amber-50 border-amber-200", cancelled: "text-gray-400 bg-gray-50 border-gray-200" };

  return (
    <div className={`rounded-2xl border p-4 sm:p-5 ${order.status === "paid" ? "border-green-200 bg-green-50/20" : expired ? "border-gray-200 bg-gray-50/50" : "border-amber-200 bg-white"}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-muted-foreground mb-0.5">订单号</p>
          <p className="text-xs sm:text-sm font-mono truncate">{order.id}</p>
        </div>
        <div className={`shrink-0 px-2.5 py-1 rounded-full border text-xs font-medium ${sc[order.status] || sc.cancelled}`}>
          {s[order.status] || "未知"}
        </div>
      </div>

      <div className="space-y-1.5 mb-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm gap-2">
            <span className="truncate min-w-0">{item.title} <span className="text-muted-foreground">×{item.quantity}</span></span>
            <span className="shrink-0 font-medium">{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs sm:text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <CalendarDays size={13} />
          {new Date(order.createdAt).toLocaleDateString("zh-CN")}
        </div>
        <span className="font-bold text-sm sm:text-base">{formatPrice(order.totalAmount)}</span>
      </div>

      {order.status === "pending" && !expired && (
        <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-1.5 w-fit">
          <Clock size={13} />
          <Countdown expiresAt={order.expiresAt} onExpire={() => onDelete(order.id)} />
        </div>
      )}

      <div className="flex gap-2 mt-3">
        {order.status === "pending" && !expired ? (
          <>
            <Button size="sm" className="flex-1 h-9 text-xs sm:text-sm rounded-xl" onClick={() => onPay(order.id)}>
              <CreditCard size={14} /> 立即支付
            </Button>
            <Button size="sm" variant="outline" className="flex-1 h-9 text-xs sm:text-sm rounded-xl" onClick={() => onTip(order.id)}>
              <Heart size={14} /> 赞赏
            </Button>
          </>
        ) : (
          <Button size="sm" variant="ghost" className="text-muted-foreground h-9 rounded-xl ml-auto" onClick={() => onDelete(order.id)}>
            <Trash2 size={14} /> 删除
          </Button>
        )}
      </div>
    </div>
  );
}

export default function AccountPage() {
  const router = useRouter();
  const { user, token, updateProfile, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const [tab, setTab] = useState<"profile" | "orders" | "security">("profile");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("tab");
    if (t === "orders" || t === "security") setTab(t);
  }, []);
  const [nickname, setNickname] = useState(user?.nickname ?? "");
  const [signature, setSignature] = useState(user?.signature ?? "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ t: "ok" | "err"; text: string } | null>(null);
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");

  // password change state
  const [pwMethod, setPwMethod] = useState<"email" | "phone">("email");
  const [pwTarget, setPwTarget] = useState("");
  const [pwCode, setPwCode] = useState("");
  const [pwNewPassword, setPwNewPassword] = useState("");
  const [pwSending, setPwSending] = useState(false);
  const [pwCountdown, setPwCountdown] = useState(0);
  const [pwMsg, setPwMsg] = useState<{ t: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    if (pwCountdown <= 0) return;
    const id = setInterval(() => setPwCountdown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [pwCountdown]);

  useEffect(() => {
    if (tab !== "orders" || !user) return;
    fetch(`/api/orders?userId=${user.id}`)
      .then(r => r.json())
      .then(d => setOrders(d.orders || []))
      .catch(() => setOrders([]));
  }, [tab, user]);

  const reloadOrders = useCallback(() => {
    if (!user) return;
    fetch(`/api/orders?userId=${user.id}`)
      .then(r => r.json())
      .then(d => setOrders(d.orders || []))
      .catch(() => setOrders([]));
  }, [user]);

  const showMsg = (t: "ok" | "err", text: string) => {
    setMsg({ t, text });
    setTimeout(() => setMsg(null), 3000);
  };

  const handleSave = async () => {
    if (!nickname.trim()) { showMsg("err", "昵称不能为空"); return; }
    setSaving(true);
    const err = await updateProfile({ nickname: nickname.trim(), signature: signature.trim() });
    if (err) showMsg("err", err); else showMsg("ok", "保存成功");
    setSaving(false);
  };

  const handleBind = async () => {
    setSaving(true);
    const err = await updateProfile({ email: email.trim(), phone: phone.trim() });
    if (err) showMsg("err", err); else showMsg("ok", "安全设置已保存");
    setSaving(false);
  };

  const handlePay = async (orderId: string) => {
    const r = await fetch("/api/pay", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId, method: "alipay" }) });
    const d = await r.json();
    if (d.success) { reloadOrders(); router.push(`/pay/success?orderId=${orderId}&amount=${d.totalAmount}`); }
    else showMsg("err", d.error || "支付失败");
  };

  const handleDelete = (orderId: string) => setDeleteTarget(orderId);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const r = await fetch(`/api/orders/${deleteTarget}`, { method: "DELETE" });
    if (r.ok) reloadOrders(); else showMsg("err", "删除失败");
    setDeleteTarget(null);
  };

  const handleLogout = async () => { await logout(); router.push("/"); };

  const handleSendCode = async () => {
    const target = pwTarget.trim();
    if (!target) { setPwMsg({ t: "err", text: pwMethod === "email" ? "请输入邮箱" : "请输入手机号" }); return; }
    setPwSending(true); setPwMsg(null);
    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target, type: pwMethod }),
      });
      const data = await res.json();
      if (!res.ok) { setPwMsg({ t: "err", text: data.error || "发送失败" }); return; }
      setPwMsg({ t: "ok", text: data.message || "验证码已发送" });
      setPwCountdown(60);
    } catch { setPwMsg({ t: "err", text: "网络错误" }); }
    setPwSending(false);
  };

  const handleChangePassword = async () => {
    if (!pwCode.trim()) { setPwMsg({ t: "err", text: "请输入验证码" }); return; }
    if (!pwNewPassword.trim() || pwNewPassword.length < 3) { setPwMsg({ t: "err", text: "新密码至少3个字符" }); return; }
    setSaving(true); setPwMsg(null);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ target: pwTarget.trim(), code: pwCode.trim(), newPassword: pwNewPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setPwMsg({ t: "err", text: data.error || "修改失败" }); return; }
      setPwMsg({ t: "ok", text: data.message || "密码修改成功" });
      setPwCode(""); setPwNewPassword(""); setPwTarget("");
    } catch { setPwMsg({ t: "err", text: "网络错误" }); }
    setSaving(false);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50/50" />;
  }

  if (!user || !token) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <User size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-4">请先登录</p>
          <Button onClick={() => router.push("/")}>返回首页</Button>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: "profile" as const, label: "个人资料", icon: User },
    { key: "orders" as const, label: `订单 (${(orders ?? []).length})`, icon: Package },
    { key: "security" as const, label: "安全中心", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-black mb-4 sm:mb-6 transition-colors">
          <ArrowLeft size={16} /> 返回
        </button>

        {/* 头部资料卡 */}
        <div className="bg-white rounded-2xl border p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-black to-gray-700 text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shrink-0 shadow-md">
            {user.nickname.charAt(0)}
          </div>
          <div className="text-center sm:text-left min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold truncate">{user.nickname}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">ID: {user.id}</p>
            <p className="text-sm text-muted-foreground mt-0.5 truncate">{user.signature || "这个人很懒，什么都没写~"}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-xs text-muted-foreground">
              {user.email && <span className="flex items-center gap-1"><Mail size={12} />{user.email}</span>}
              {user.phone && <span className="flex items-center gap-1"><Phone size={12} />{user.phone}</span>}
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="shrink-0 text-gray-700 border-gray-300 hover:bg-gray-100 rounded-lg sm:self-start">
            <LogOut size={16} /> 退出
          </Button>
        </div>

        {/* 标签导航 */}
        <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${tab === t.key ? "bg-black text-white shadow-md" : "bg-white text-gray-600 border hover:bg-gray-50"
                }`}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        {/* Toast 消息 */}
        {msg && (
          <div className={`mb-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm ${msg.t === "ok" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
            }`}>
            {msg.t === "ok" ? <Check size={16} /> : <AlertTriangle size={16} />}
            {msg.text}
          </div>
        )}

        {/* 个人资料 */}
        {tab === "profile" && (
          <div className="bg-white rounded-2xl border p-4 sm:p-6 lg:p-8">
            <h2 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6">编辑个人资料</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4 sm:space-y-5">

                <div>
                  <label className="text-xs sm:text-sm font-medium mb-1.5 block text-muted-foreground">昵称</label>
                  <Input value={nickname} onChange={e => setNickname(e.target.value)} className="rounded-xl h-10 sm:h-11" />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium mb-1.5 block text-muted-foreground">个人签名</label>
                  <Input value={signature} onChange={e => setSignature(e.target.value)} placeholder="写一句签名..." className="rounded-xl h-10 sm:h-11" />
                </div>
                <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto rounded-xl h-10 sm:h-11 px-6 sm:px-8">
                  {saving ? "保存中..." : "保存资料"}
                </Button>
              </div>
              <div className="hidden lg:flex items-center justify-center bg-gray-50 rounded-2xl border border-dashed p-8 text-center">
                <div>
                  <User size={48} className="mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">修改后点击保存即可生效</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 订单中心 */}
        {tab === "orders" && (
          <div>
            {orders === null ? (
              <div className="text-center py-16 text-muted-foreground">加载中...</div>
            ) : (orders ?? []).length === 0 ? (
              <div className="bg-white rounded-2xl border p-12 sm:p-16 text-center">
                <Package size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-1">暂无订单</p>
                <p className="text-sm text-muted-foreground mb-6">快去选购心仪的商品吧</p>
                <Button onClick={() => router.push("/")}>去首页</Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {orders.map((o) => (
                  <OrderCard key={o.id} order={o} onPay={handlePay} onDelete={handleDelete} onTip={(id) => router.push(`/pay/tip?orderId=${id}`)} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 安全中心 */}
        {tab === "security" && (
          <div className="space-y-4 sm:space-y-6">
            {/* 绑定信息 */}
            <div className="bg-white rounded-2xl border p-4 sm:p-6 lg:p-8">
              <h2 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6">安全中心</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-1.5 text-muted-foreground flex items-center gap-1.5">
                      <Mail size={14} /> 邮箱
                    </label>
                    <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="输入邮箱地址" className="rounded-xl h-10 sm:h-11" />
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-1.5 text-muted-foreground flex items-center gap-1.5">
                      <Phone size={14} /> 手机号
                    </label>
                    <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="输入手机号码" className="rounded-xl h-10 sm:h-11" />
                  </div>
                  <Button onClick={handleBind} disabled={saving} className="rounded-xl h-10 sm:h-11 px-6 sm:px-8">
                    {saving ? "保存中..." : "保存安全设置"}
                  </Button>
                </div>
                <div className="space-y-4 sm:space-y-5">
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-1.5 text-muted-foreground flex items-center gap-1.5">
                      <AtSign size={14} /> 用户名
                    </label>
                    <Input value={user.username} disabled className="rounded-xl h-10 sm:h-11 bg-gray-50" />
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-1.5 text-muted-foreground flex items-center gap-1.5">
                      <CalendarDays size={14} /> 注册时间
                    </label>
                    <Input value={new Date(user.createdAt).toLocaleString("zh-CN")} disabled className="rounded-xl h-10 sm:h-11 bg-gray-50" />
                  </div>
                </div>
              </div>
            </div>

            {/* 修改密码 */}
            <div className="bg-white rounded-2xl border p-4 sm:p-6 lg:p-8">
              <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-5 flex items-center gap-2">
                <Key size={18} /> 修改密码
              </h3>

              {/* 方式选择 */}
              <div className="flex gap-2 mb-4">
                <button onClick={() => { setPwMethod("email"); setPwTarget(""); setPwCode(""); setPwNewPassword(""); setPwMsg(null); }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${pwMethod === "email" ? "bg-black text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}>
                  <Mail size={14} /> 邮箱验证
                </button>
                <button onClick={() => { setPwMethod("phone"); setPwTarget(""); setPwCode(""); setPwNewPassword(""); setPwMsg(null); }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${pwMethod === "phone" ? "bg-black text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}>
                  <Smartphone size={14} /> 手机验证
                </button>
              </div>

              {pwMsg && (
                <div className={`mb-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm ${pwMsg.t === "ok" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                  {pwMsg.t === "ok" ? <Check size={16} /> : <AlertTriangle size={16} />}
                  {pwMsg.text}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-1.5 block text-muted-foreground">
                      {pwMethod === "email" ? "绑定邮箱" : "绑定手机号"}
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type={pwMethod === "email" ? "email" : "tel"}
                        value={pwTarget}
                        onChange={e => setPwTarget(e.target.value)}
                        placeholder={pwMethod === "email" ? "请输入绑定邮箱" : "请输入绑定手机号"}
                        className="rounded-xl h-10 sm:h-11 flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="shrink-0 rounded-xl h-10 sm:h-11 px-3 sm:px-4 text-xs"
                        onClick={handleSendCode}
                        disabled={pwSending || pwCountdown > 0}
                      >
                        {pwSending ? "发送中..." : pwCountdown > 0 ? `${pwCountdown}s` : <><Send size={14} /> 发送</>}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-1.5 block text-muted-foreground">验证码</label>
                    <Input value={pwCode} onChange={e => setPwCode(e.target.value)} placeholder="输入验证码" className="rounded-xl h-10 sm:h-11" />
                  </div>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-1.5 block text-muted-foreground">新密码</label>
                    <Input type="password" value={pwNewPassword} onChange={e => setPwNewPassword(e.target.value)} placeholder="至少3个字符" className="rounded-xl h-10 sm:h-11" />
                  </div>
                  <Button onClick={handleChangePassword} disabled={saving} className="rounded-xl h-10 sm:h-11 px-6 sm:px-8">
                    <Lock size={14} /> {saving ? "修改中..." : "确认修改"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 删除确认弹窗 */}
      <Dialog open={!!deleteTarget} onOpenChange={(v) => { if (!v) setDeleteTarget(null); }}>
        <DialogContent showCloseButton={false} className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>此操作不可恢复，确认要删除此订单吗？</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)} className="rounded-xl">取消</Button>
            <Button onClick={confirmDelete} className="rounded-xl">确认删除</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
