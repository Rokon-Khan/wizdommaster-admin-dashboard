"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Category } from "@/lib/types";

const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters long"),
  description: z.string().optional(),
  icon_url: z.string().url("Invalid icon URL").optional().or(z.literal("")),
  display_order: z.number().int().min(0, "Display order must be 0 or greater"),
  is_active: z.boolean(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  category?: Category;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  isLoading?: boolean;
}

export function CategoryForm({ category, onSubmit, isLoading }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      icon_url: category?.icon_url || "",
      display_order: category?.display_order || 0,
      is_active: category?.is_active ?? true,
    },
  });

  const isActive = watch("is_active");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{category ? "Edit Category" : "Create Category"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter category name"
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Enter category description"
              rows={3}
            />
            {errors.description && (
              <p className="text-destructive text-sm">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon_url">Icon URL</Label>
            <Input
              id="icon_url"
              {...register("icon_url")}
              placeholder="https://example.com/icon.png"
            />
            {errors.icon_url && (
              <p className="text-destructive text-sm">{errors.icon_url.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="display_order">Display Order</Label>
            <Input
              id="display_order"
              type="number"
              {...register("display_order", { valueAsNumber: true })}
              placeholder="0"
            />
            {errors.display_order && (
              <p className="text-destructive text-sm">{errors.display_order.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_active"
              checked={isActive}
              onCheckedChange={(checked) => setValue("is_active", !!checked)}
            />
            <Label htmlFor="is_active">Active</Label>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : category ? "Update" : "Create"}
            </Button>
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}