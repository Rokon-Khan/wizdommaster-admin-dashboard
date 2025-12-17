"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuizForm } from "@/components/forms/QuizForm";
import { adminApi } from "@/lib/api/adminApi";

export default function CreateQuizPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const response = await adminApi.createQuiz(formData);
      if (response.success) {
        router.push("/content/quizzes");
      }
    } catch (error) {
      console.error("Failed to create quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Quiz</h1>
        <p className="text-muted-foreground">Add a new quiz to your collection</p>
      </div>
      <QuizForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}