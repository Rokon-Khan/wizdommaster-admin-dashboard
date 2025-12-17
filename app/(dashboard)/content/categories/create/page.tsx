"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryForm } from "@/components/forms/CategoryForm";
import { adminApi } from "@/lib/api/adminApi";

export default function CreateCategoryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await adminApi.createCategory(data);
      if (response.success) {
        router.push("/content/categories");
      }
    } catch (error) {
      console.error("Failed to create category:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Category</h1>
        <p className="text-muted-foreground">Add a new quiz category</p>
      </div>
      <CategoryForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}