"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Save, Plus, X, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function CreateQuizPage() {
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        category: "",
        description: "",
        difficulty: "Medium",
        totalLevels: 3,
        questionsPerLevel: 5,
        estimatedTime: "10 min",
        imageUrl: "",
    });

    const [levels, setLevels] = useState([
        {
            levelNumber: 1,
            questions: [
                {
                    id: "1",
                    questionText: "",
                    type: "multiple-choice",
                    options: [
                        { id: "1", text: "", isCorrect: false },
                        { id: "2", text: "", isCorrect: false },
                        { id: "3", text: "", isCorrect: false },
                        { id: "4", text: "", isCorrect: false },
                    ],
                    correctAnswer: "",
                    explanation: "",
                },
            ],
        },
    ]);

    const categories = ["Nature", "Science", "Geography", "History", "Books and Movies"];
    const difficulties = ["Easy", "Medium", "Hard"];

    const handleInputChange = (field: string, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const addQuestion = (levelIndex: number) => {
        const newLevels = [...levels];
        newLevels[levelIndex].questions.push({
            id: Date.now().toString(),
            questionText: "",
            type: "multiple-choice",
            options: [
                { id: "1", text: "", isCorrect: false },
                { id: "2", text: "", isCorrect: false },
                { id: "3", text: "", isCorrect: false },
                { id: "4", text: "", isCorrect: false },
            ],
            correctAnswer: "",
            explanation: "",
        });
        setLevels(newLevels);
    };

    const removeQuestion = (levelIndex: number, questionIndex: number) => {
        const newLevels = [...levels];
        newLevels[levelIndex].questions.splice(questionIndex, 1);
        setLevels(newLevels);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 pl-20">
            <div className="container mx-auto max-w-6xl">
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/content"
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Quiz</h1>
                            <p className="text-gray-600">Build engaging quizzes for your platform</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-[#1E40AF] hover:bg-[#1e3a8a] text-white rounded-lg transition-all font-medium">
                        <Save className="w-4 h-4" />
                        Save Quiz
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <Card className="bg-white">
                            <CardHeader>
                                <CardTitle className="text-gray-900">Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange("title", e.target.value)}
                                        placeholder="Enter quiz title"
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1E40AF]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                                    <input
                                        type="text"
                                        value={formData.subtitle}
                                        onChange={(e) => handleInputChange("subtitle", e.target.value)}
                                        placeholder="Optional subtitle"
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1E40AF]"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => handleInputChange("category", e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#1E40AF]"
                                        >
                                            <option value="">Select category</option>
                                            {categories.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty *</label>
                                        <select
                                            value={formData.difficulty}
                                            onChange={(e) => handleInputChange("difficulty", e.target.value)}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#1E40AF]"
                                        >
                                            {difficulties.map((diff) => (
                                                <option key={diff} value={diff}>
                                                    {diff}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        placeholder="Describe your quiz..."
                                        rows={4}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1E40AF] resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                                    <input
                                        type="url"
                                        value={formData.imageUrl}
                                        onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1E40AF]"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quiz Structure */}
                        <Card className="bg-white">
                            <CardHeader>
                                <CardTitle className="text-gray-900">Quiz Structure</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Levels</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={formData.totalLevels}
                                            onChange={(e) => handleInputChange("totalLevels", parseInt(e.target.value))}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#1E40AF]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Questions per Level</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="20"
                                            value={formData.questionsPerLevel}
                                            onChange={(e) => handleInputChange("questionsPerLevel", parseInt(e.target.value))}
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#1E40AF]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Time</label>
                                        <input
                                            type="text"
                                            value={formData.estimatedTime}
                                            onChange={(e) => handleInputChange("estimatedTime", e.target.value)}
                                            placeholder="10 min"
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1E40AF]"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Questions */}
                        {levels.map((level, levelIndex) => (
                            <Card key={levelIndex} className="bg-white">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-gray-900">Level {level.levelNumber} Questions</CardTitle>
                                        <button
                                            onClick={() => addQuestion(levelIndex)}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm font-medium border border-blue-200"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add Question
                                        </button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {level.questions.map((question, questionIndex) => (
                                        <div
                                            key={question.id}
                                            className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-600">
                                                    Question {questionIndex + 1}
                                                </span>
                                                {level.questions.length > 1 && (
                                                    <button
                                                        onClick={() => removeQuestion(levelIndex, questionIndex)}
                                                        className="p-1 text-red-600 hover:text-red-700 transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Question Text *
                                                </label>
                                                <textarea
                                                    placeholder="Enter your question..."
                                                    rows={2}
                                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1E40AF] resize-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Options *</label>
                                                <div className="space-y-2">
                                                    {question.options.map((option, optIndex) => (
                                                        <div key={option.id} className="flex items-center gap-2">
                                                            <input
                                                                type="radio"
                                                                name={`question-${questionIndex}`}
                                                                className="w-4 h-4 text-[#1E40AF]"
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder={`Option ${optIndex + 1}`}
                                                                className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1E40AF]"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Explanation</label>
                                                <textarea
                                                    placeholder="Explain the correct answer..."
                                                    rows={2}
                                                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1E40AF] resize-none"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="bg-white">
                            <CardHeader>
                                <CardTitle className="text-gray-900">Quiz Preview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="aspect-video bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                                        {formData.imageUrl ? (
                                            <img
                                                src={formData.imageUrl}
                                                alt="Quiz preview"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <span className="text-gray-500">No image</span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-gray-900 font-bold text-lg mb-1">
                                            {formData.title || "Quiz Title"}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-2">
                                            {formData.subtitle || "Subtitle"}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.category && (
                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                                                    {formData.category}
                                                </span>
                                            )}
                                            {formData.difficulty && (
                                                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium border border-orange-200">
                                                    {formData.difficulty}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white">
                            <CardHeader>
                                <CardTitle className="text-gray-900">Quiz Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Levels</span>
                                    <span className="text-gray-900 font-medium">{formData.totalLevels}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Questions per Level</span>
                                    <span className="text-gray-900 font-medium">{formData.questionsPerLevel}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Questions</span>
                                    <span className="text-gray-900 font-medium">
                                        {formData.totalLevels * formData.questionsPerLevel}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Estimated Time</span>
                                    <span className="text-gray-900 font-medium">{formData.estimatedTime}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
