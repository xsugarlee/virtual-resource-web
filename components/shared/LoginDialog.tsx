"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/app/context/AuthContext";
import { consumePostAuthRedirect } from "@/lib/post-auth-redirect";
import Captcha from "@/components/shared/Captcha";

type Tab = "login" | "register" | "forgot";

export default function LoginDialog() {
  const { showLogin, setShowLogin, login, register } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPwd, setLoginPwd] = useState("");
  const [loginCaptcha, setLoginCaptcha] = useState("");
  const [loginCaptchaAns, setLoginCaptchaAns] = useState("");
  const [regNick, setRegNick] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regCode, setRegCode] = useState("");
  const [regPwd, setRegPwd] = useState("");
  const [regCaptcha, setRegCaptcha] = useState("");
  const [regCaptchaAns, setRegCaptchaAns] = useState("");
  const [fgEmail, setFgEmail] = useState("");
  const [fgCaptcha, setFgCaptcha] = useState("");
  const [fgCaptchaAns, setFgCaptchaAns] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSending, setCodeSending] = useState(false);
  const [codeCountdown, setCodeCountdown] = useState(0);
  const [codeSent, setCodeSent] = useState(false);
  const [fgCodeSent, setFgCodeSent] = useState(false);

  useEffect(() => {
    if (codeCountdown <= 0) return;
    const id = setInterval(() => setCodeCountdown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [codeCountdown]);

  const reset = () => {
    setLoginEmail(""); setLoginPwd(""); setLoginCaptcha(""); setLoginCaptchaAns("");
    setRegNick(""); setRegEmail(""); setRegCode(""); setRegPwd(""); setRegCaptcha(""); setRegCaptchaAns("");
    setFgEmail(""); setFgCaptcha(""); setFgCaptchaAns("");
    setError(""); setCodeSent(false); setFgCodeSent(false);
  };

  const switchTab = (t: Tab) => { setTab(t); reset(); };

  const handleLogin = async () => {
    if (!loginEmail.trim() || !loginPwd.trim()) { setError("请输入用户名/邮箱和密码"); return; }
    if (!loginCaptcha.trim()) { setError("请输入验证码"); return; }
    if (loginCaptcha.trim().toLowerCase() !== loginCaptchaAns.toLowerCase()) { setError("验证码错误"); return; }
    setLoading(true); setError("");
    setLoginCaptcha(""); setLoginCaptchaAns("");
    const err = await login(loginEmail, loginPwd);
    if (err) setError(err);
    else { reset(); setShowLogin(false); router.push(consumePostAuthRedirect() || "/account"); }
    setLoading(false);
  };

  const sendEmailCode = async (email: string) => {
    if (!email.trim()) { setError("请输入邮箱"); return; }
    setCodeSending(true); setError("");
    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: email, type: "email" }),
      });
      const d = await res.json();
      if (!res.ok) { setError(d.error || "发送失败"); return; }
      setCodeSent(true);
      setCodeCountdown(60);
    } catch { setError("网络错误"); }
    setCodeSending(false);
  };

  const handleRegister = async () => {
    if (!regNick.trim() || !regEmail.trim() || !regCode.trim() || !regPwd.trim()) {
      setError("请填写所有字段"); return;
    }
    if (regPwd.length < 3) { setError("密码至少3个字符"); return; }
    setLoading(true); setError("");
    const err = await register({
      username: regEmail,
      password: regPwd,
      nickname: regNick,
      email: regEmail,
      code: regCode,
    });
    if (err) setError(err);
    else { reset(); setShowLogin(false); router.push(consumePostAuthRedirect() || "/account"); }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!fgEmail.trim()) { setError("请输入邮箱"); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fgEmail }),
      });
      const d = await res.json();
      if (!res.ok) { setError(d.error || "发送失败"); return; }
      setFgCodeSent(true);
      setError("");
    } catch { setError("网络错误"); }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    if (tab === "login") handleLogin();
    else if (tab === "register") handleRegister();
    else handleForgotPassword();
  };

  return (
    <Dialog open={showLogin} onOpenChange={(v) => { if (!v) reset(); setShowLogin(v); }}>
      <DialogContent aria-describedby={undefined} className="w-[700px] max-w-none sm:max-w-[700px] p-0! overflow-hidden rounded-2xl" style={{ maxWidth: '700px' }}>
        <DialogTitle className="sr-only">登陆</DialogTitle>
        <div className="flex flex-row h-450px">
          {/* 左侧图片区 */}
          <div className="relative w-[240px] min-h-full overflow-hidden">
            <Image src="/images/login.webp" alt="Login cover" fill sizes="240px" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white text-lg font-semibold mb-1">精品资源库</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                海量电商资源<br />
                一站式获取
              </p>
            </div>
          </div>

          {/* 右侧操作区 */}
          <div className="w-[460px] px-5 py-4 flex flex-col justify-start">
            {tab === "login" && (
              <div className="space-y-3.5 min-h-[340px] flex flex-col justify-center" onKeyDown={handleKeyDown}>
                <div>
                  <h2 className="text-xl font-bold">登陆账号</h2>
                  <p className="text-sm text-muted-foreground mt-1">发现更多精品资源</p>
                </div>
                <div className="space-y-2.5">
                  <Input type="text" placeholder="用户名/邮箱" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} autoFocus className="h-10 rounded-xl focus-visible:ring-1 focus-visible:ring-black/15" />
                  <Input type="password" placeholder="密码" value={loginPwd} onChange={e => setLoginPwd(e.target.value)} className="h-10 rounded-xl focus-visible:ring-1 focus-visible:ring-black/15" />
                  <Captcha value={loginCaptcha} onChange={setLoginCaptcha} onCode={setLoginCaptchaAns} />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button className="w-full h-10 rounded-xl text-base font-semibold hover:bg-primary/90 active:scale-[0.98] transition-transform" onClick={handleLogin} disabled={loading}>
                  {loading ? "处理中..." : "登陆"}
                </Button>
                <div className="flex justify-between text-sm">
                  <button onClick={() => switchTab("register")} className="text-blue-600 hover:underline">注册新账号</button>
                  <button onClick={() => switchTab("forgot")} className="text-muted-foreground hover:text-black">忘记密码?</button>
                </div>
              </div>
            )}

            {tab === "register" && (
              <div className="space-y-3" onKeyDown={handleKeyDown}>
                <div>
                  <h2 className="text-xl font-bold">注册账号</h2>
                  <p className="text-sm text-muted-foreground mt-1">点击注册，立即获取精品资源</p>
                </div>
                <div className="space-y-2.5">
                  <Input placeholder="昵称" value={regNick} onChange={e => setRegNick(e.target.value)} autoFocus className="h-10 rounded-xl focus-visible:ring-1 focus-visible:ring-black/15" />
                  <Input type="email" placeholder="邮箱" value={regEmail} onChange={e => setRegEmail(e.target.value)} className="h-10 rounded-xl focus-visible:ring-1 focus-visible:ring-black/15" />
                  <div className="flex gap-2">
                    <Input placeholder="邮箱验证码" value={regCode} onChange={e => setRegCode(e.target.value)} className="h-10 rounded-xl flex-1 focus-visible:ring-1 focus-visible:ring-black/15" />
                    <Button
                      variant="outline" size="sm" className="shrink-0 h-10 rounded-xl px-4 text-xs"
                      onClick={() => sendEmailCode(regEmail)}
                      disabled={codeSending || codeCountdown > 0 || !regEmail.trim()}
                    >
                      {codeSending ? "发送中..." : codeCountdown > 0 ? `${codeCountdown}s` : "获取验证码"}
                    </Button>
                  </div>
                  <Input type="password" placeholder="密码" value={regPwd} onChange={e => setRegPwd(e.target.value)} className="h-10 rounded-xl focus-visible:ring-1 focus-visible:ring-black/15" />
                  <Captcha value={regCaptcha} onChange={setRegCaptcha} onCode={setRegCaptchaAns} />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button className="w-full h-10 rounded-xl text-base font-semibold hover:bg-primary/90 active:scale-[0.98] transition-transform" onClick={handleRegister} disabled={loading}>
                  {loading ? "处理中..." : "注册并登陆"}
                </Button>
                <div className="text-center text-sm">
                  <button onClick={() => switchTab("login")} className="text-blue-600 hover:underline">返回登陆</button>
                </div>
              </div>
            )}

            {tab === "forgot" && (
              <div className="space-y-3.5" onKeyDown={handleKeyDown}>
                <div>
                  <h2 className="text-xl font-bold">找回密码</h2>
                  <p className="text-sm text-muted-foreground mt-1">请输入您的邮箱接收重置链接</p>
                </div>
                {!fgCodeSent ? (
                  <div className="space-y-2.5">
                    <Input type="email" placeholder="邮箱" value={fgEmail} onChange={e => setFgEmail(e.target.value)} autoFocus className="h-10 rounded-xl focus-visible:ring-1 focus-visible:ring-black/15" />
                    <Captcha value={fgCaptcha} onChange={setFgCaptcha} onCode={setFgCaptchaAns} />
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <Button className="w-full h-10 rounded-xl text-base font-semibold hover:bg-primary/90 active:scale-[0.98] transition-transform" onClick={handleForgotPassword} disabled={loading}>
                      {loading ? "发送中..." : "发送重置邮件"}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <div className="p-3 bg-green-50 rounded-xl border border-green-200 text-sm text-green-700">
                      重置链接已发送到 <strong>{fgEmail}</strong>，请查收邮件
                    </div>
                    <Button variant="outline" className="w-full h-10 rounded-xl" onClick={() => switchTab("login")}>
                      返回登陆
                    </Button>
                  </div>
                )}
                <div className="text-center text-sm">
                  <button onClick={() => switchTab("login")} className="text-blue-600 hover:underline">返回登陆</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent >
    </Dialog >
  );
}
