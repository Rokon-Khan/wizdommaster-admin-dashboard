"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/Card";
import { Save, Bell, Shield, Palette, Globe } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: false,
    });

    const [theme, setTheme] = useState("dark");
    const [language, setLanguage] = useState("en");

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 pl-0 md:pl-20">
            <div className="container mx-auto max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                    <p className="text-gray-600">Manage your account and platform preferences</p>
                </div>

                {/* Notifications */}
                <Card className="mb-6 bg-white">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Bell className="w-5 h-5 text-[#1E40AF]" />
                            <CardTitle className="text-gray-900">Notifications</CardTitle>
                        </div>
                        <CardDescription className="text-gray-600">Configure how you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div>
                                <p className="text-gray-900 font-medium">Email Notifications</p>
                                <p className="text-sm text-gray-500">Receive updates via email</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={notifications.email}
                                    onChange={(e) =>
                                        setNotifications({ ...notifications, email: e.target.checked })
                                    }
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E40AF]"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div>
                                <p className="text-gray-900 font-medium">Push Notifications</p>
                                <p className="text-sm text-gray-500">Receive browser push notifications</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={notifications.push}
                                    onChange={(e) =>
                                        setNotifications({ ...notifications, push: e.target.checked })
                                    }
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E40AF]"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div>
                                <p className="text-gray-900 font-medium">SMS Notifications</p>
                                <p className="text-sm text-gray-500">Receive updates via SMS</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={notifications.sms}
                                    onChange={(e) =>
                                        setNotifications({ ...notifications, sms: e.target.checked })
                                    }
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E40AF]"></div>
                            </label>
                        </div>
                    </CardContent>
                </Card>

                {/* Appearance */}
                <Card className="mb-6 bg-white">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Palette className="w-5 h-5 text-[#A78BFA]" />
                            <CardTitle className="text-gray-900">Appearance</CardTitle>
                        </div>
                        <CardDescription className="text-gray-600">Customize the look and feel</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#1E40AF]"
                            >
                                <option value="dark">Dark</option>
                                <option value="light">Light</option>
                                <option value="auto">Auto</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* Language */}
                <Card className="mb-6 bg-white">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Globe className="w-5 h-5 text-[#FB923C]" />
                            <CardTitle className="text-gray-900">Language & Region</CardTitle>
                        </div>
                        <CardDescription className="text-gray-600">Set your preferred language</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#1E40AF]"
                            >
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* Security */}
                <Card className="mb-6 bg-white">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-green-600" />
                            <CardTitle className="text-gray-900">Security</CardTitle>
                        </div>
                        <CardDescription className="text-gray-600">Manage your security settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <button className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 hover:bg-gray-100 transition-all text-left">
                            <p className="font-medium">Change Password</p>
                            <p className="text-sm text-gray-500">Update your account password</p>
                        </button>
                        <button className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 hover:bg-gray-100 transition-all text-left">
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </button>
                    </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button className="flex items-center gap-2 px-6 py-3 bg-[#1E40AF] hover:bg-[#1e3a8a] text-white rounded-lg transition-all font-medium">
                        <Save className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
