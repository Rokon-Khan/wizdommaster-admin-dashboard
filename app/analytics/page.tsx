"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from "recharts";

const monthlyData = [
    { name: "Jan", users: 1200, revenue: 45000, engagement: 65 },
    { name: "Feb", users: 1900, revenue: 52000, engagement: 72 },
    { name: "Mar", users: 3000, revenue: 61000, engagement: 78 },
    { name: "Apr", users: 2780, revenue: 58000, engagement: 75 },
    { name: "May", users: 3890, revenue: 72000, engagement: 82 },
    { name: "Jun", users: 4390, revenue: 85000, engagement: 88 },
];

const dailyData = [
    { name: "Mon", active: 1200, new: 150 },
    { name: "Tue", active: 1900, new: 200 },
    { name: "Wed", active: 3000, new: 250 },
    { name: "Thu", active: 2780, new: 180 },
    { name: "Fri", active: 3890, new: 300 },
    { name: "Sat", active: 2500, new: 120 },
    { name: "Sun", active: 2100, new: 100 },
];

export default function AnalyticsPage() {
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 pl-0 md:pl-20">
            <div className="container mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
                    <p className="text-gray-600">Comprehensive insights into your platform performance</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-sm text-gray-500">Total Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">18,920</div>
                            <p className="text-sm text-green-600 mt-2">+12.5% from last month</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-sm text-gray-500">Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">$372K</div>
                            <p className="text-sm text-green-600 mt-2">+8.2% from last month</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-sm text-gray-500">Active Sessions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">2,450</div>
                            <p className="text-sm text-green-600 mt-2">+15.3% from last month</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-sm text-gray-500">Engagement Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">82%</div>
                            <p className="text-sm text-green-600 mt-2">+5.1% from last month</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-gray-900">Monthly Growth</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={monthlyData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                        <XAxis dataKey="name" stroke="#6B7280" />
                                        <YAxis stroke="#6B7280" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#FFFFFF',
                                                border: '1px solid #E5E7EB',
                                                borderRadius: '8px',
                                                color: '#111827'
                                            }}
                                        />
                                        <Legend />
                                        <Area
                                            type="monotone"
                                            dataKey="users"
                                            stackId="1"
                                            stroke="#60A5FA"
                                            fill="#60A5FA"
                                            fillOpacity={0.6}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="revenue"
                                            stackId="2"
                                            stroke="#A78BFA"
                                            fill="#A78BFA"
                                            fillOpacity={0.6}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-gray-900">Daily Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={dailyData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                        <XAxis dataKey="name" stroke="#6B7280" />
                                        <YAxis stroke="#6B7280" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#FFFFFF',
                                                border: '1px solid #E5E7EB',
                                                borderRadius: '8px',
                                                color: '#111827'
                                            }}
                                        />
                                        <Legend />
                                        <Bar dataKey="active" fill="#60A5FA" radius={[8, 8, 0, 0]} />
                                        <Bar dataKey="new" fill="#FB923C" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Engagement Trend */}
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="text-gray-900">Engagement Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                    <XAxis dataKey="name" stroke="#6B7280" />
                                    <YAxis stroke="#6B7280" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#FFFFFF',
                                            border: '1px solid #E5E7EB',
                                            borderRadius: '8px',
                                            color: '#111827'
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="engagement"
                                        stroke="#A78BFA"
                                        strokeWidth={3}
                                        dot={{ fill: '#A78BFA', r: 5 }}
                                        activeDot={{ r: 7 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
