"use client";

import {
  BarChart3,
  Bell,
  ChevronLeft,
  FileText,
  Settings,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type SidebarProps = {
  isCollapsed: boolean;
};

export default function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsedState, setIsCollapsedState] = useState(isCollapsed);

  const navItems = [
    { icon: BarChart3, href: "/analytics", label: "Dashboard" },
    { icon: Users, href: "/users", label: "Users" },
    { icon: FileText, href: "/content", label: "Content" },
    // { icon: Grid, href: "/apps", label: "Apps" },
    { icon: Settings, href: "/settings", label: "Settings" },
    { icon: User, href: "/profile", label: "Profile" },
    { icon: Bell, href: "/notifications", label: "Notifications" },
  ];

  return (
    <aside
      className={`h-screen bg-sidebar border-r border-sidebar-border z-40 shadow-sm transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Sidebar Content */}

      <div className="flex flex-col h-full py-6">
        {/* Logo */}
        <div className="px-4 mb-8">
          <Link href="/analytics">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <div className="w-5 h-5 rounded bg-primary-foreground"></div>
              </div>
              {!isCollapsed && (
                <span className="text-sidebar-foreground font-semibold text-lg">
                  WizdomMaster
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/analytics" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
                title={item.label}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Button */}
        <div className="px-3 mt-4">
          <button
            onClick={() => setIsCollapsedState(!isCollapsedState)}
            className="flex items-center justify-center w-full p-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-all duration-200"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft
              className={`w-5 h-5 transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}
