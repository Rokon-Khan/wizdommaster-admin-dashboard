"use client";

import {
  Bell,
  ChevronRight,
  Grid3x3,
  Heart,
  Home,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { icon: Home, href: "/", label: "Home" },
    { icon: Grid3x3, href: "/apps", label: "Apps" },
    { icon: Settings, href: "/settings", label: "Settings" },
    { icon: Bell, href: "/notifications", label: "Notifications" },
    { icon: Heart, href: "/favorites", label: "Favorites" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full bg-white border-r border-gray-200 w-16 md:w-20 z-40 shadow-sm hidden md:flex flex-col">
      <div className="flex flex-col h-full py-4 md:py-6">
        {/* Logo */}
        <div className="px-2 md:px-4 mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gray-900 flex items-center justify-center">
              <div className="w-4 h-4 md:w-5 md:h-5 rounded bg-white"></div>
            </div>
          </div>
          <span className="text-gray-900 font-semibold text-xs md:text-sm hidden lg:block">
            Wellmetrix
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col items-center gap-2 md:gap-4 px-2 md:px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`p-2 md:p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gray-100 text-gray-900 fill-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                title={item.label}
              >
                <Icon
                  className={`w-4 h-4 md:w-5 md:h-5 ${
                    isActive ? "fill-gray-900" : ""
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mx-auto p-1.5 md:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200 mb-2 md:mb-4"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronRight
            className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </aside>
  );
}
