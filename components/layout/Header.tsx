"use client";

import { useAuth } from "@/lib/auth-context";
import { Bell, LogOut, Plus, Search } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();

  // Get current date
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleDateString("en-US", { month: "short" });
  const dayOfWeek = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 pl-0 md:pl-20 shadow-sm">
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left: User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-medium">
              {user?.full_name?.charAt(0) || "A"}
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="text-xs sm:text-sm font-medium text-gray-900">
                {user?.full_name || "Admin"}
              </span>
              <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-600">
                <span className="capitalize">{user?.role || "admin"}</span>
              </div>
            </div>
          </div>

          {/* Center: Date */}
          <div className="text-xs sm:text-sm text-gray-700">
            <span className="hidden sm:inline">
              {day} {month}, {dayOfWeek}
            </span>
            <span className="sm:hidden">
              {day} {month}
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Search */}
            <button
              className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Notifications */}
            <button
              className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Add Data Source Button */}
            <button className="flex items-center gap-1 sm:gap-2 bg-[#1E40AF] hover:bg-[#1e3a8a] text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Add Data Source</span>
            </button>

            {/* Logout */}
            <button
              onClick={logout}
              className="p-1.5 sm:p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
