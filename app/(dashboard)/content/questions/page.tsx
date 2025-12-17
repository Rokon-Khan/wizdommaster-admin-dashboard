"use client";

import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Question, questionApi } from "@/lib/api/questionApi";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const fetchQuestions = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const response = await questionApi.getAllQuestions({
        page,
        limit: pagination.limit,
      });
      if (response.success && response.data) {
        setQuestions(response?.data);
        setPagination((prev) => ({
          ...prev,
          page,
          total: response.meta?.total || 0,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handlePageChange = (page: number) => {
    fetchQuestions(page);
  };

  const handleSearch = (query: string) => {
    fetchQuestions(1, query);
  };

  const handleView = (id: string) => {
    console.log("View question:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit question:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete question:", id);
  };

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case "multiple_choice":
        return "default";
      case "checkbox":
        return "secondary";
      case "yes_no":
        return "outline";
      default:
        return "secondary";
    }
  };

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (question: Question) => (
        <div className="w-12 h-8 rounded overflow-hidden bg-muted">
          {question.question_image_url ? (
            <img
              src={question.question_image_url}
              alt="Question"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs">
              Q
            </div>
          )}
        </div>
      ),
    },
    {
      key: "question_text",
      label: "Question",
      render: (question: Question) => (
        <div className="max-w-xs truncate" title={question.question_text}>
          {question.question_text}
        </div>
      ),
    },
    {
      key: "quiz",
      label: "Quiz",
      render: (question: Question) => question.quiz?.title || "No Quiz",
    },
    {
      key: "question_type",
      label: "Type",
      render: (question: Question) => (
        <Badge variant={getQuestionTypeColor(question.question_type) as any}>
          {question.question_type.replace("_", " ")}
        </Badge>
      ),
    },
    {
      key: "points",
      label: "Points",
    },
    {
      key: "display_order",
      label: "Order",
    },
    {
      key: "actions",
      label: "Actions",
      render: (question: Question) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleView(question.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(question.id)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(question.id)}
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
          <h1 className="text-3xl font-bold">Questions</h1>
          <p className="text-muted-foreground">
            Manage quiz questions and answers
          </p>
        </div>
        <Link href="/content/questions/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </Link>
      </div>

      <DataTable
        data={questions}
        columns={columns}
        searchKey="questions"
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
