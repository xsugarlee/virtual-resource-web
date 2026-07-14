// app/components/SideMenu.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { X, User as UserIcon } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

interface SideMenuProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly onSearchOpen: () => void;
}

export default function SideMenu({ open, onClose, onSearchOpen }: SideMenuProps) {
  const { user, setShowLogin } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <>
      {/* 遮罩 */}
      {open && (
        <button
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
          aria-label="关闭菜单"
        />
      )}

      {/* 侧边菜单 */}
      <aside
        className={`fixed top-0 left-0 w-72 h-full bg-white z-50 border-r border-gray-100 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-end px-7 py-4">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="关闭菜单"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-7">
          <ul className="space-y-2">
            {/* 电商资源 */}
            <li>
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer py-2 text-base text-gray-800 hover:text-black hover:bg-gray-50 rounded px-2 transition-colors list-none">
                  <span>电商资源</span>
                  <span className="group-open:rotate-180 transition-transform">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <div className="pl-4 mt-1">
                  <Link href="/category/ecomats/csinfo" onClick={onClose} className="block py-3 text-sm text-gray-700 hover:text-black">
                    客服资源
                  </Link>
                  <Link href="/category/ecomats/opsdata" onClick={onClose} className="block py-3 text-sm text-gray-700 hover:text-black">
                    运营资源
                  </Link>
                </div>
              </details>
            </li>

            {/* 求职干货 */}
            <li>
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer py-2 text-base text-gray-800 hover:text-black hover:bg-gray-50 rounded px-2 transition-colors list-none">
                  <span>求职干货</span>
                  <span className="group-open:rotate-180 transition-transform">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <div className="pl-4 mt-1">
                  <Link href="/category/jobtips/resume" onClick={onClose} className="block py-3 text-sm text-gray-700 hover:text-black">简历优化</Link>
                  <Link href="/category/jobtips/intskills" onClick={onClose} className="block py-3 text-sm text-gray-700 hover:text-black">面试技巧</Link>
                </div>
              </details>
            </li>

            {/* 问题咨询 */}
            <li>
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer py-2 text-base text-gray-800 hover:text-black hover:bg-gray-50 rounded px-2 transition-colors list-none">
                  <span>问题咨询</span>
                  <span className="group-open:rotate-180 transition-transform">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <div className="pl-4 mt-1">
                  <Link
                    href="/category/consult/custsvc"
                    onClick={onClose}
                    className="block py-3 text-sm text-gray-700 hover:text-black"
                  >
                    定制服务
                  </Link>
                  <Link
                    href="/category/consult/q&a"
                    onClick={onClose}
                    className="block py-3 text-sm text-gray-700 hover:text-black"
                  >
                    问题答疑
                  </Link>
                </div>
              </details>
            </li>
          </ul>

          <div className="border-t border-gray-100 my-4" />
          <ul className="space-y-1 pb-8">
            <li>
              <button
                onClick={() => { onClose(); user ? router.push("/account") : setShowLogin(true); }}
                className="block w-full text-left py-2 text-base text-gray-800 hover:text-black hover:bg-gray-50 rounded px-2 transition-colors"
              >
                {mounted ? (user ? <><UserIcon size={16} className="inline mr-1.5 -mt-0.5" />{user.nickname}</> : "登陆") : "登陆"}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onSearchOpen();
                  onClose();
                }}
                className="block w-full text-left py-2 text-base text-gray-800 hover:text-black hover:bg-gray-50 rounded px-2 transition-colors"
              >
                搜索
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}