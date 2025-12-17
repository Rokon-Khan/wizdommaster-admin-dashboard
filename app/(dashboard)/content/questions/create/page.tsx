"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionForm } from "@/components/forms/QuestionForm";
import { questionApi } from "@/lib/api/questionApi";
import { toast } from "sonner";

export default function CreateQuestionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const response = await questionApi.createQuestion(formData);
      if (response.success) {
        toast.success("Question created successfully!");
        router.push("/content/questions");
      } else {
        toast.error(response.message || "Failed to create question");
      }
    } catch (error) {
      console.error("Failed to create question:", error);
      toast.error("Failed to create question");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Question</h1>
        <p className="text-muted-foreground">Add a new question to your quiz</p>
      </div>
      <QuestionForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
