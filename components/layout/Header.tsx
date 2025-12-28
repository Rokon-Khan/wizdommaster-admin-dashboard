"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/auth-context";
import {
  ArrowRightIcon,
  Bell,
  LayoutDashboard,
  LogOut,
  PanelLeftIcon,
  Search,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../shared/theme-toggle";

type HeaderProps = {
  isCollapsed: boolean;
  onToggleSidebar: () => void;
};

export default function Header({ isCollapsed, onToggleSidebar }: HeaderProps) {
  const { user, logout } = useAuth();

  // Get current date
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleDateString("en-US", { month: "short" });
  const dayOfWeek = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <header className="bg-card border-b border-border sticky top-0 z-30 shadow-sm">
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left: User Profile */}
          {/* <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-medium">
              {user?.full_name?.charAt(0) || "A"}
            </div>
            <div className="flex-col hidden sm:flex">
              <span className="text-xs sm:text-sm font-medium text-gray-900">
                {user?.full_name || "Admin"}
              </span>
              <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-600">
                <span className="capitalize">{user?.role || "admin"}</span>
              </div>
            </div>
          </div> */}
          <PanelLeftIcon
            onClick={onToggleSidebar}
            className={`w-5 h-5 transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
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
            {/* <button className="flex items-center gap-1 sm:gap-2 bg-[#1E40AF] hover:bg-[#1e3a8a] text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Add Data Source</span>
            </button> */}

            <div className="flex items-center gap-2">
              <ThemeToggle />

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={user.avatar_url || "/placeholder.svg"}
                          alt={user.full_name}
                        />
                        <AvatarFallback>
                          {user.full_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center gap-2 p-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.avatar_url || "/placeholder.svg"}
                          alt={user.full_name}
                        />
                        <AvatarFallback>
                          {user.full_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {user.full_name}
                        </span>
                        <span className="text-xs text-muted-foreground capitalize">
                          {user.role}
                        </span>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href={"/profile/"}
                        className="flex items-center gap-2"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/analytics"
                        className="flex items-center gap-2"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    {user.role === "admin" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link
                            href="/users"
                            className="flex items-center gap-2"
                          >
                            <Users className="h-4 w-4" />
                            Manage Users
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-destructive focus:text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden items-center gap-2 sm:flex">
                  <Link href="/login">
                    <Button variant="ghost">
                      Log in <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-linear-to-r from-blue-600 to-purple-600">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              {/* <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button> */}
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
      </div>
    </header>
  );
}
