"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Plus, Search, Filter, FileText, Edit, Trash2, Eye, MoreVertical, CheckCircle, Clock, Users } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface Quiz {
    id: string;
    title: string;
    category: string;
    difficulty: string;
    totalLevels: number;
    questionsPerLevel: number;
    status: "published" | "draft" | "archived";
    totalAttempts: number;
    averageScore: number;
    createdAt: string;
    updatedAt: string;
    imageUrl?: string;
}

const mockQuizzes: Quiz[] = [
    {
        id: "1",
        title: "The Ultimate Bee Quiz",
        category: "Nature",
        difficulty: "Medium",
        totalLevels: 3,
        questionsPerLevel: 5,
        status: "published",
        totalAttempts: 1245,
        averageScore: 78,
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20",
    },
    {
        id: "2",
        title: "Plant Kingdom Mastery",
        category: "Nature",
        difficulty: "Easy",
        totalLevels: 2,
        questionsPerLevel: 4,
        status: "published",
        totalAttempts: 892,
        averageScore: 82,
        createdAt: "2024-01-10",
        updatedAt: "2024-01-18",
    },
    {
        id: "3",
        title: "Wildlife Wonders",
        category: "Nature",
        difficulty: "Hard",
        totalLevels: 4,
        questionsPerLevel: 6,
        status: "draft",
        totalAttempts: 0,
        averageScore: 0,
        createdAt: "2024-01-25",
        updatedAt: "2024-01-25",
    },
    {
        id: "4",
        title: "Ocean Depths Exploration",
        category: "Science",
        difficulty: "Medium",
        totalLevels: 3,
        questionsPerLevel: 5,
        status: "published",
        totalAttempts: 567,
        averageScore: 71,
        createdAt: "2024-01-12",
        updatedAt: "2024-01-19",
    },
    {
        id: "5",
        title: "Frozen Worlds",
        category: "Geography",
        difficulty: "Hard",
        totalLevels: 3,
        questionsPerLevel: 5,
        status: "published",
        totalAttempts: 423,
        averageScore: 65,
        createdAt: "2024-01-08",
        updatedAt: "2024-01-17",
    },
];

export default function ContentPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");

    const categories = ["All", "Nature", "Science", "Geography", "History", "Books and Movies"];
    const statuses = ["All", "Published", "Draft", "Archived"];

    const filteredQuizzes = mockQuizzes.filter((quiz) => {
        const matchesSearch =
            quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            quiz.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || quiz.category === selectedCategory;
        const matchesStatus =
            selectedStatus === "All" ||
            quiz.status.toLowerCase() === selectedStatus.toLowerCase();

        return matchesSearch && matchesCategory && matchesStatus;
    });


    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 pl-0 md:pl-20">
            <div className="container mx-auto max-w-7xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Management</h1>
                        <p className="text-gray-600">Create, edit, and manage all your quizzes</p>
                    </div>
                    <Link
                        href="/content/create"
                        className="flex items-center gap-2 px-4 py-2 bg-[#1E40AF] hover:bg-[#1e3a8a] text-white rounded-lg transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Create Quiz
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card className="bg-white">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <FileText className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl text-gray-900">{mockQuizzes.length}</CardTitle>
                                    <p className="text-sm text-gray-500">Total Quizzes</p>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card className="bg-white">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl text-gray-900">
                                        {mockQuizzes.filter((q) => q.status === "published").length}
                                    </CardTitle>
                                    <p className="text-sm text-gray-500">Published</p>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card className="bg-white">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl text-gray-900">
                                        {mockQuizzes.reduce((sum, q) => sum + q.totalAttempts, 0).toLocaleString()}
                                    </CardTitle>
                                    <p className="text-sm text-gray-500">Total Attempts</p>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card className="bg-white">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl text-gray-900">
                                        {Math.round(
                                            mockQuizzes
                                                .filter((q) => q.averageScore > 0)
                                                .reduce((sum, q) => sum + q.averageScore, 0) /
                                                mockQuizzes.filter((q) => q.averageScore > 0).length
                                        ) || 0}
                                        %
                                    </CardTitle>
                                    <p className="text-sm text-gray-500">Avg Score</p>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                </div>

                {/* Search and Filters */}
                <Card className="mb-6 bg-white">
                    <CardContent className="pt-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search quizzes by title or category..."
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
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            selectedCategory === cat
                                                ? "bg-[#1E40AF] text-white"
                                                : "bg-white text-gray-600 hover:text-gray-900 border border-gray-300"
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                                {statuses.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setSelectedStatus(status)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            selectedStatus === status
                                                ? "bg-[#A78BFA] text-white"
                                                : "bg-white text-gray-600 hover:text-gray-900 border border-gray-300"
                                        }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quizzes Table */}
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="text-gray-900">All Quizzes ({filteredQuizzes.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Quiz</th>
                                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Category</th>
                                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Difficulty</th>
                                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Levels</th>
                                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Status</th>
                                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Attempts</th>
                                        <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Avg Score</th>
                                        <th className="text-right py-4 px-4 text-sm font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredQuizzes.map((quiz) => (
                                        <tr
                                            key={quiz.id}
                                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="py-4 px-4">
                                                <div>
                                                    <p className="text-gray-900 font-medium">{quiz.title}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {quiz.questionsPerLevel} Q × {quiz.totalLevels} levels
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                                                    {quiz.category}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                                        quiz.difficulty.toLowerCase() === "easy"
                                                            ? "bg-blue-100 text-blue-700 border-blue-200"
                                                            : quiz.difficulty.toLowerCase() === "medium"
                                                            ? "bg-orange-100 text-orange-700 border-orange-200"
                                                            : "bg-purple-100 text-purple-700 border-purple-200"
                                                    }`}
                                                >
                                                    {quiz.difficulty}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-gray-700">{quiz.totalLevels}</td>
                                            <td className="py-4 px-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                                        quiz.status === "published"
                                                            ? "bg-green-100 text-green-700 border-green-200"
                                                            : quiz.status === "draft"
                                                            ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                                            : "bg-gray-100 text-gray-600 border-gray-200"
                                                    }`}
                                                >
                                                    {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-gray-700">{quiz.totalAttempts.toLocaleString()}</td>
                                            <td className="py-4 px-4 text-gray-700">
                                                {quiz.averageScore > 0 ? `${quiz.averageScore}%` : "-"}
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                                                        title="View"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-all"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-all"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
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

