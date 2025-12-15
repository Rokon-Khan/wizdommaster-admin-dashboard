"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Search, Filter, MoreVertical, UserPlus } from "lucide-react";
import { useState } from "react";

const users = [
    {
        id: 1,
        name: "Alex Johnson",
        email: "alex@example.com",
        role: "Admin",
        status: "Active",
        lastActive: "2 hours ago",
        avatar: "AJ",
    },
    {
        id: 2,
        name: "Sarah Williams",
        email: "sarah@example.com",
        role: "User",
        status: "Active",
        lastActive: "5 hours ago",
        avatar: "SW",
    },
    {
        id: 3,
        name: "Michael Brown",
        email: "michael@example.com",
        role: "User",
        status: "Inactive",
        lastActive: "2 days ago",
        avatar: "MB",
    },
    {
        id: 4,
        name: "Emily Davis",
        email: "emily@example.com",
        role: "Moderator",
        status: "Active",
        lastActive: "1 hour ago",
        avatar: "ED",
    },
    {
        id: 5,
        name: "David Wilson",
        email: "david@example.com",
        role: "User",
        status: "Active",
        lastActive: "30 minutes ago",
        avatar: "DW",
    },
];

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 pl-0 md:pl-20">
            <div className="container mx-auto max-w-7xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
                        <p className="text-gray-600">Manage and monitor all platform users</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1E40AF] hover:bg-[#1e3a8a] text-white rounded-lg transition-all">
                        <UserPlus className="w-4 h-4" />
                        Add User
                    </button>
                </div>

                {/* Search and Filters */}
                <Card className="mb-6 bg-white">
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search users by name or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1E40AF]"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all">
                                <Filter className="w-4 h-4" />
                                Filters
                            </button>
                        </div>
                    </CardContent>
                </Card>

                {/* Users Table */}
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="text-gray-900">All Users ({filteredUsers.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">User</th>
                                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Role</th>
                                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Status</th>
                                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Last Active</th>
                                        <th className="text-right py-4 px-4 text-sm font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-gray-900 font-semibold">
                                                        {user.avatar}
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-900 font-medium">{user.name}</p>
                                                        <p className="text-sm text-gray-500">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        user.status === "Active"
                                                            ? "bg-green-100 text-green-700 border border-green-200"
                                                            : "bg-gray-100 text-gray-600 border border-gray-200"
                                                    }`}
                                                >
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-gray-600 text-sm">{user.lastActive}</td>
                                            <td className="py-4 px-4 text-right">
                                                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
