"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { useScrolled } from "@/hooks/useScrolled";
import { LogoIcon } from "@/components/shared/LogoIcon";

interface NavbarProps {
  onContributeClick: () => void;
}

const NAV_LINKS = [
  { label: "Trang Chủ", href: "/" },
  { label: "Thư Viện Học Liệu", href: "/library" },
  { label: "Bản Đồ Ký Ức", href: "/map" },
];

export function Navbar({ onContributeClick }: NavbarProps) {
  const scrolled = useScrolled();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] h-[68px]",
        "transition-all duration-500",
        scrolled
          ? "bg-[#0F172A] border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
          : "bg-transparent border-b border-transparent",
      )}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2.5 no-underline cursor-pointer"
      >
        <LogoIcon size={36} />
        <span className="font-serif text-xl font-bold text-white tracking-[0.03em] leading-none">
          VIỆT SỬ <span className="text-gold">SỐ</span>
        </span>
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={clsx(
                "text-sm font-medium tracking-[0.02em] no-underline transition-colors duration-200",
                isActive(link.href)
                  ? "text-white"
                  : "text-white/70 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={onContributeClick}
            className="bg-red-vss text-white px-5 py-2.5 rounded-full text-sm font-semibold
                       transition-all duration-200 hover:bg-red-light hover:-translate-y-px
                       cursor-pointer shadow-[0_2px_12px_rgba(185,28,28,0.4)]"
          >
            Đóng Góp Ký Ức
          </button>
        </li>
      </ul>

      {/* Hamburger */}
      <button
        className="md:hidden text-white p-1 cursor-pointer"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="absolute top-[68px] left-0 right-0 bg-[#0F172A]
                     flex flex-col gap-4 px-[5vw] py-5 md:hidden
                     border-t border-white/[0.08]
                     shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={clsx(
                "text-sm font-medium no-underline transition-colors py-1",
                isActive(link.href)
                  ? "text-white"
                  : "text-white/70 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              onContributeClick();
            }}
            className="bg-red-vss text-white px-5 py-3 rounded-full text-sm font-semibold
                       text-center cursor-pointer mt-1"
          >
            Đóng Góp Ký Ức
          </button>
        </div>
      )}
    </nav>
  );
}
