"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { File, FileText, FolderOpen, HelpCircle, Plus } from "lucide-react";
import Link from "next/link";

export default function ContentPage() {
  const contentSections = [
    {
      title: "Categories",
      description: "Organize quizzes into categories",
      href: "/content/categories",
      icon: FolderOpen,
      count: "16 categories",
    },
    {
      title: "Quizzes",
      description: "Create and manage quiz content",
      href: "/content/quizzes",
      icon: FileText,
      count: "101 quizzes",
    },
    {
      title: "Questions",
      description: "Manage individual quiz questions",
      href: "/content/questions",
      icon: HelpCircle,
      count: "103 questions",
    },
    {
      title: "Certificates",
      description: "Manage individual quiz certificates",
      href: "/content/certificates",
      icon: File,
      count: "10 certificates",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-muted-foreground">
          Manage your quiz content, categories, and questions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contentSections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title} className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {section.count}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button asChild className="flex-1">
                  <Link href={section.href}>Manage</Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
