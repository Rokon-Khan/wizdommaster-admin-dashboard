"use client";

import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminApi } from "@/lib/api/adminApi";
import { Quiz } from "@/lib/types";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const fetchQuizzes = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const response = await adminApi.getAllQuizzes({
        page,
        limit: pagination.limit,
      });
      if (response.success && response.data) {
        setQuizzes(response.data);
        setPagination((prev) => ({
          ...prev,
          page,
          total: response.meta?.total || 0,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handlePageChange = (page: number) => {
    fetchQuizzes(page);
  };

  const handleSearch = (query: string) => {
    fetchQuizzes(1, query);
  };

  const handleView = (id: string) => {
    console.log("View quiz:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit quiz:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete quiz:", id);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "success";
      case "medium":
        return "warning";
      case "hard":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const columns = [
    {
      key: "thumbnail",
      label: "Thumbnail",
      render: (quiz: Quiz) => (
        <div className="w-12 h-8 rounded overflow-hidden bg-muted">
          {quiz.thumbnail_url ? (
            <img
              src={quiz.thumbnail_url}
              alt={quiz.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs">
              {quiz.title.charAt(0)}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "title",
      label: "Title",
    },
    {
      key: "category",
      label: "Category",
      render: (quiz: Quiz) => quiz.category?.name || "No Category",
    },
    {
      key: "difficulty_level",
      label: "Difficulty",
      render: (quiz: Quiz) => (
        <Badge variant={getDifficultyColor(quiz.difficulty_level) as any}>
          {quiz.difficulty_level}
        </Badge>
      ),
    },
    {
      key: "questions_per_attempt",
      label: "Questions",
    },
    {
      key: "time_limit_minutes",
      label: "Time (min)",
    },
    {
      key: "passing_score",
      label: "Pass %",
    },
    {
      key: "is_published",
      label: "Status",
      render: (quiz: Quiz) => (
        <Badge variant={quiz.is_published ? "success" : "secondary"}>
          {quiz.is_published ? "Published" : "Draft"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (quiz: Quiz) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleView(quiz.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(quiz.id)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(quiz.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quizzes</h1>
          <p className="text-muted-foreground">
            Manage quiz content and settings
          </p>
        </div>
        <Link href="/content/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Quiz
          </Button>
        </Link>
      </div>

      <DataTable
        data={quizzes}
        columns={columns}
        searchKey="quizzes"
        pagination={{
          ...pagination,
          onPageChange: handlePageChange,
        }}
        onSearch={handleSearch}
        loading={loading}
      />
    </div>
  );
}
