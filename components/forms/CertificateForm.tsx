"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminApi, Certificate } from "@/lib/api/adminApi";
import { Quiz, User } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const certificateSchema = z.object({
  user_id: z.string().min(1, "User is required"),
  quiz_id: z.string().min(1, "Quiz is required"),
  score_achieved: z.number().int().min(0).max(100, "Score must be between 0-100"),
});

type CertificateFormData = z.infer<typeof certificateSchema>;

interface CertificateFormProps {
  certificate?: Certificate;
  onSubmit: (data: FormData) => Promise<void>;
  isLoading?: boolean;
}

export function CertificateForm({
  certificate,
  onSubmit,
  isLoading,
}: CertificateFormProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(
    certificate?.certificate_url || null
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CertificateFormData>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      user_id: certificate?.user_id || "",
      quiz_id: certificate?.quiz_id || "",
      score_achieved: certificate?.score_achieved || 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, quizzesResponse] = await Promise.all([
          adminApi.getAllUsers(),
          adminApi.getAllQuizzes(),
        ]);
        
        if (usersResponse.success && usersResponse.data) {
          setUsers(usersResponse.data);
        }
        if (quizzesResponse.success && quizzesResponse.data) {
          setQuizzes(quizzesResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCertificateFile(file);
      const reader = new FileReader();
      reader.onload = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setCertificateFile(null);
    setFilePreview(null);
  };

  const handleFormSubmit = async (data: CertificateFormData) => {
    const formData = new FormData();
    
    formData.append("user_id", data.user_id);
    formData.append("quiz_id", data.quiz_id);
    formData.append("score_achieved", data.score_achieved.toString());
    
    if (certificateFile) {
      formData.append("certificate", certificateFile);
    }

    await onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {certificate ? "Edit Certificate" : "Create Certificate"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="user_id">User *</Label>
              <Controller
                name="user_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.user_id && (
                <p className="text-destructive text-sm">
                  {errors.user_id.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="quiz_id">Quiz *</Label>
              <Controller
                name="quiz_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quiz" />
                    </SelectTrigger>
                    <SelectContent>
                      {quizzes.map((quiz) => (
                        <SelectItem key={quiz.id} value={quiz.id}>
                          {quiz.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.quiz_id && (
                <p className="text-destructive text-sm">
                  {errors.quiz_id.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="score_achieved">Score Achieved (%) *</Label>
            <Input
              id="score_achieved"
              type="number"
              min="0"
              max="100"
              {...register("score_achieved", { valueAsNumber: true })}
            />
            {errors.score_achieved && (
              <p className="text-destructive text-sm">
                {errors.score_achieved.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Certificate File</Label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              {filePreview && (
                <div className="relative">
                  <div className="w-20 h-20 border rounded flex items-center justify-center bg-gray-50">
                    <span className="text-xs text-gray-500">Certificate</span>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 p-0"
                    onClick={removeFile}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : certificate ? "Update" : "Create"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}