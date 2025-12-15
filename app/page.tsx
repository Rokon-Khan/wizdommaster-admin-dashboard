"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { Leaf, Maximize2, Send, Plus, Clock } from "lucide-react";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("Daily");
    const [progressData, setProgressData] = useState<Array<{ day: number; value: number }>>([]);
    const [aiInput, setAiInput] = useState("");

    // Generate progress heatmap data only on client to avoid hydration mismatch
    useEffect(() => {
        const data = Array.from({ length: 30 }, (_, i) => ({
            day: i + 1,
            value: Math.random() > 0.5 ? Math.floor(Math.random() * 3) : 0,
        }));
        setProgressData(data);
    }, []);

    // Stress/Recovery balance data
    const stressRecoveryData = [
        { name: "Sun", value: 0.2 },
        { name: "Mon", value: 0.3 },
        { name: "Tue", value: 0.25 },
        { name: "Wed", value: 0.4 },
        { name: "Thu", value: 0.35 },
        { name: "Fri", value: 0.45 },
        { name: "Sat", value: 0.34 },
    ];

    // HRV data with colors
    const hrvData = [
        { name: "Jan", value: 45, color: "#FB923C" },
        { name: "Fev", value: 52, color: "#A78BFA" },
        { name: "Mar", value: 48, color: "#4B5563" },
    ];

    // Sleep data
    const sleepData = [
        { name: "Deep Sleep", value: 21, color: "#A78BFA" },
        { name: "Light Sleep", value: 79, color: "#FDE68A" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 pl-0 md:pl-20">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
                    {/* Your Wellness Progress - Top Left */}
                    <div className="lg:col-span-4">
                        <Card className="bg-white h-full flex flex-col">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Leaf className="w-4 h-4 text-gray-600" />
                                        <CardTitle className="text-sm sm:text-base text-gray-900">Your Wellness Progress</CardTitle>
                                    </div>
                                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">64%</div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {/* Tabs */}
                                <div className="flex gap-2 sm:gap-4 mb-4 border-b border-gray-200 flex-wrap flex-shrink-0">
                                    {["Daily", "Monthly", "Weekly", "Yearly"].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`pb-2 text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                                                activeTab === tab
                                                    ? "text-gray-900 border-b-2 border-gray-900"
                                                    : "text-gray-500 hover:text-gray-700"
                                            }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                {/* Progress Heatmap */}
                                <div className="grid grid-cols-7 gap-1 mb-4 flex-shrink-0">
                                    {progressData.length > 0 ? (
                                        progressData.slice(0, 28).map((item, index) => (
                                            <div
                                                key={index}
                                                className={`aspect-square rounded ${
                                                    item.value === 0
                                                        ? "bg-gray-100"
                                                        : item.value === 1
                                                        ? "bg-[#FB923C]"
                                                        : item.value === 2
                                                        ? "bg-[#A78BFA]"
                                                        : "bg-[#4B5563]"
                                                }`}
                                            />
                                        ))
                                    ) : (
                                        Array.from({ length: 28 }).map((_, index) => (
                                            <div
                                                key={index}
                                                className="aspect-square rounded bg-gray-100 animate-pulse"
                                            />
                                        ))
                                    )}
                                </div>

                                {/* Insight Card */}
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 relative">
                                    <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                                        <Maximize2 className="w-4 h-4" />
                                    </button>
                                    <div className="flex items-start gap-2 pr-6">
                                        <Leaf className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                                        <p className="text-xs sm:text-sm text-gray-700">
                                            If you maintain your habits, HRV may reach 72ms next week.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Stress / Recovery Balance - Top Center */}
                    <div className="lg:col-span-4">
                        <Card className="bg-white h-full flex flex-col">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm sm:text-base text-gray-900">Stress / Recovery Balance</CardTitle>
                                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">+0.34</div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <div className="h-32 sm:h-40 mb-3 flex-shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={stressRecoveryData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                            <XAxis 
                                                dataKey="name" 
                                                stroke="#6B7280"
                                                style={{ fontSize: '11px' }}
                                            />
                                            <YAxis 
                                                stroke="#6B7280"
                                                style={{ fontSize: '11px' }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#FFFFFF',
                                                    border: '1px solid #E5E7EB',
                                                    borderRadius: '8px',
                                                    color: '#111827'
                                                }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#A78BFA"
                                                strokeWidth={2}
                                                dot={{ fill: '#A78BFA', r: 3 }}
                                                activeDot={{ r: 5 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Leaf className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        You're recovering faster than average — gentle activity and mindful breathing will keep you in balance.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* HRV - Mid Right */}
                    <div className="lg:col-span-2">
                        <Card className="bg-white h-full flex flex-col">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm sm:text-base text-gray-900">HRV</CardTitle>
                                    <div className="text-xl sm:text-2xl font-bold text-gray-900">+8%</div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="h-32 sm:h-40">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={hrvData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                            <XAxis 
                                                dataKey="name" 
                                                stroke="#6B7280"
                                                style={{ fontSize: '11px' }}
                                            />
                                            <YAxis 
                                                stroke="#6B7280"
                                                style={{ fontSize: '11px' }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#FFFFFF',
                                                    border: '1px solid #E5E7EB',
                                                    borderRadius: '8px',
                                                    color: '#111827'
                                                }}
                                            />
                                            <Bar
                                                dataKey="value"
                                                radius={[6, 6, 0, 0]}
                                            >
                                                {hrvData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Glucose - Mid Right */}
                    <div className="lg:col-span-2">
                        <Card className="bg-white h-full flex flex-col">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm sm:text-base text-gray-900">Glucose</CardTitle>
                                    <div className="text-xl sm:text-2xl font-bold text-gray-900">-5%</div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 flex items-center justify-center">
                                <div className="h-32 sm:h-40 w-full flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">94</div>
                                        <div className="text-xs text-gray-500">mg/dL Avg Glucose</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Luma AI Assistant - Top Right, Large */}
                    <div className="lg:col-span-6">
                        <Card className="bg-white relative overflow-hidden h-full flex flex-col">
                            {/* Background Image Effect */}
                            <div className="absolute inset-0 opacity-20">
                                <div className="w-full h-full bg-gradient-to-br from-orange-200 via-amber-100 to-orange-300" />
                            </div>
                            
                            <CardHeader className="relative z-10 pb-3">
                                <CardTitle className="text-2xl sm:text-3xl text-gray-900 mb-1">Luma</CardTitle>
                                <p className="text-xs sm:text-sm text-gray-600">Your personal AI assistant</p>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                {/* Suggested Prompts */}
                                <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
                                    {[
                                        "Why is my HRV low?",
                                        "Am I balanced now?",
                                        "How's my recovery today?",
                                    ].map((suggestion, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setAiInput(suggestion)}
                                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>

                                {/* Input Field */}
                                <div className="relative flex-shrink-0">
                                    <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        value={aiInput}
                                        onChange={(e) => setAiInput(e.target.value)}
                                        placeholder="Ask something..."
                                        className="w-full pl-10 pr-10 sm:pr-12 py-2 sm:py-3 bg-white border border-gray-300 rounded-lg text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                    />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-all">
                                        <Send className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Integrations & Sources Panel - Bottom Left, Large */}
                    <div className="lg:col-span-6">
                        <Card className="bg-white relative overflow-hidden h-full flex flex-col">
                            {/* Background Image Effect */}
                            <div className="absolute inset-0 opacity-20">
                                <div className="w-full h-full bg-gradient-to-br from-orange-300 via-red-200 to-orange-400" />
                            </div>

                            <CardHeader className="relative z-10 pb-3">
                                <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-1">Integrations & Sources Panel</CardTitle>
                                <p className="text-xs sm:text-sm text-gray-600">Bring all your wellness signals together</p>
                            </CardHeader>
                            <CardContent className="relative z-10 flex-1 flex flex-col">
                                {/* Legend */}
                                <div className="flex gap-2 sm:gap-4 mb-4 text-xs flex-wrap flex-shrink-0">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        <span className="text-gray-600">low</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                                        <span className="text-gray-600">normal</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                                        <span className="text-gray-600">high</span>
                                    </div>
                                </div>

                                {/* Chart placeholder */}
                                <div className="h-24 sm:h-32 mb-4 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
                                    <p className="text-xs text-gray-500">Chart visualization</p>
                                </div>

                                {/* Integrations List */}
                                <div className="space-y-2 sm:space-y-3 mb-4 flex-1">
                                    {[
                                        { name: "Connected via Apple Health", time: "2 h ago", icon: "○" },
                                        { name: "Real-time glucose tracking.", time: "5 h ago", icon: "□" },
                                        { name: "Body metrics made simple.", time: "today 08:24", icon: "✦" },
                                    ].map((integration, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs">
                                                    {integration.icon}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-900 font-medium">{integration.name}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Clock className="w-3 h-3" />
                                                <span>{integration.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Add App Button */}
                                <button className="w-full px-4 py-2 sm:py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm sm:text-base flex-shrink-0">
                                    <Plus className="w-4 h-4" />
                                    Add app
                                </button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sleep Quality & Recovery - Bottom Right */}
                    <div className="lg:col-span-6">
                        <Card className="bg-white h-full flex flex-col">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm sm:text-base text-gray-900">Sleep (Quality & Recovery)</CardTitle>
                                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">+6%</div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col">
                                <div className="h-48 sm:h-64 relative mb-4 flex-shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={sleepData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={3}
                                                dataKey="value"
                                            >
                                                {sleepData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#FFFFFF',
                                                    border: '1px solid #E5E7EB',
                                                    borderRadius: '8px',
                                                    color: '#111827'
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-xl sm:text-2xl font-bold text-gray-900">7h 42m</div>
                                            <div className="text-xs text-gray-500">Duration</div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Recovery Index */}
                                <div className="mb-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-gray-600">Recovery Index</span>
                                        <span className="text-lg font-bold text-gray-900">85/100</span>
                                    </div>
                                </div>

                                {/* Insight */}
                                <div className="flex items-start gap-2">
                                    <Leaf className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        You reached optimal recovery. Keeping your bedtime consistent will sustain this.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
