"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import TopNotice from "@/components/layout/TopNotice";
import SideMenu from "@/components/layout/SideMenu";
import Footer from "@/components/layout/Footer";
import LoginDialog from "@/components/shared/LoginDialog";
import { AuthProvider } from "@/app/context/AuthContext";

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const isSearchPage = pathname === "/search";
  const isOperationsNavPage = pathname.startsWith("/category/opsnav");

  const handleOpenSearchFromMenu = () => {
    setSearchOpen(true);
    setMenuOpen(false);
  };

  const content = (
    <>
      {!isSearchPage && !isOperationsNavPage && <TopNotice />}
      {!isSearchPage && !isOperationsNavPage && (
        <SideMenu
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          onSearchOpen={handleOpenSearchFromMenu}
        />
      )}
      {!isSearchPage && !isOperationsNavPage && (
        <Header
          onMenuOpen={() => setMenuOpen(true)}
          searchOpen={searchOpen}
          onSearchOpenChange={setSearchOpen}
        />
      )}
      <main className="flex-1">{children}</main>
      {!isSearchPage && !isOperationsNavPage && <Footer />}
      <LoginDialog />
    </>
  );

  return <AuthProvider>{content}</AuthProvider>;
}