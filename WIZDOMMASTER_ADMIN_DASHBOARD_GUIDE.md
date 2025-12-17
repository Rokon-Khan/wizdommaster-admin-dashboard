# Admin Dashboard Development Guide

## Quiz Application - WizdomMaster Admin Panel

---

## 📋 Project Overview

### **Purpose**

Build a modern, responsive web-based admin dashboard for managing quiz content, users, and analytics for the Interactive Quiz Application.

### **Core Requirements**

1. **Content Management**: Create, edit, delete quizzes, questions, and categories
2. **Question Types Support**: Handle Multiple Choice, Checkbox, and Yes/No questions
3. **Media Management**: Upload and manage images for questions and answers
4. **User Management**: View users, track progress, analyze performance
5. **Analytics Dashboard**: Real-time statistics and reporting
6. **Configurable Settings**: Set quiz parameters without code changes

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                   Admin Dashboard (Browser)              │
│                    Next.js 16 + React 19                 │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    Frontend Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Pages      │  │  Components  │  │    Stores    │  │
│  │  (Routes)    │  │   (UI/UX)    │  │   (State)    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    Built in Next.js Fetch
│                    Next.js Fetch
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    Backend REST API                      │
│                  (See Backend Guide)                     │
└─────────────────────────────────────────────────────────┘
```

### **Technology Stack**

- **Framework**: Next.js 16.0.7+ (App Router)
- **UI Library**: React 19+
- **Language**: TypeScript 5.3+
- **Shadcn UI compones**: Latest Shadcn UI Components
- **State Management**: Redux Toolkit
- **Forms**: React Hook Form 7.68.0 + Zod 4.1.13
- **Tables**: ShadCN Table
- **Charts**: Recharts 2.10+
- **Authentication**: NextAuth.js 4.24+

---

## 📊 Dashboard Pages & Features

### **1. Authentication**

```
/admin/login          - Admin login page
/admin/forgot-password - Password reset
```

### **2. Dashboard Home**

```
/admin/dashboard      - Overview with statistics
```

**Features**:

- Total users, quizzes, attempts, certificates
- Recent activity feed
- Quick actions (Create Quiz, Add Question)
- Performance charts (daily/weekly/monthly)

### **3. Category Management**

```
/admin/categories     - List all categories
/admin/categories/new - Create category
/admin/categories/:id - Edit category
```

**Features**:

- Create/edit/delete categories
- Upload category icons
- Reorder categories (drag & drop)
- Toggle active/inactive status

### **4. Quiz Management**

```
/admin/quizzes        - List all quizzes
/admin/quizzes/new    - Create quiz
/admin/quizzes/:id    - Edit quiz
```

**Features**:

- Create/edit/delete quizzes
- Set quiz parameters:
  - Questions per attempt (configurable)
  - Time limit
  - Passing score
  - Difficulty level
- Upload quiz thumbnails
- Publish/unpublish toggle
- Filter by category, difficulty, status
- Search quizzes

### **5. Question Bank**

```
/admin/questions      - List all questions
/admin/questions/new  - Create question
/admin/questions/:id  - Edit question
```

**Features**:

- Create/edit/delete questions
- Support all 3 question types:
  - Multiple Choice (single answer)
  - Checkbox (multiple answers)
  - Yes/No (binary)
- Upload images for:
  - Question prompt
  - Answer options
- Add/edit fun facts
- Dynamic answer options (add/remove)
- Question preview
- Filter by quiz, type
- Bulk operations

### **6. User Management**

```
/admin/users          - List all users
/admin/users/:id      - User detail view
```

**Features**:

- View all users
- User details (email, name, role, join date)
- User progress tracking
- Attempt history
- Certificates earned
- Activate/deactivate users
- Search and filter users

### **7. Analytics & Reports**

```
/admin/analytics      - Analytics dashboard
```

**Features**:

- User engagement metrics
- Quiz performance statistics
- Completion rates
- Average scores by quiz/category
- Time-based charts
- Export reports (CSV)

### **8. Settings**

```
/admin/settings       - App configuration
```

**Features**:

- Admin profile management
- Change password
- App settings
- Email templates (future)

---

## 🗂️ Project Structure

```
quiz-admin/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── categories/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── quizzes/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── questions/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── users/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── analytics/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── forms/
│   │   ├── CategoryForm.tsx
│   │   ├── QuizForm.tsx
│   │   └── QuestionForm.tsx
│   ├── tables/
│   │   ├── CategoryTable.tsx
│   │   ├── QuizTable.tsx
│   │   ├── QuestionTable.tsx
│   │   └── UserTable.tsx
│   ├── charts/
│   │   ├── PerformanceChart.tsx
│   │   └── EngagementChart.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── Card.tsx
│   └── shared/
│       ├── ImageUpload.tsx
│       ├── LoadingSpinner.tsx
│       └── ErrorBoundary.tsx
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   ├── categories.ts
│   │   ├── quizzes.ts
│   │   ├── questions.ts
│   │   ├── users.ts
│   │   └── analytics.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCategories.ts
│   │   ├── useQuizzes.ts
│   │   └── useQuestions.ts
│   ├── store/
│   │   ├── authStore.ts
│   │   ├── categoryStore.ts
│   │   └── quizStore.ts
│   ├── utils/
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── helpers.ts
│   └── types/
│       └── index.ts
├── public/
│   ├── images/
│   └── icons/
├── styles/
│   └── globals.css
├── .env.local
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎨 UI/UX Design Guidelines

### **Color Scheme**

```typescript
const theme = {
  primary: "#6366F1", // Indigo
  secondary: "#8B5CF6", // Purple
  success: "#10B981", // Green
  error: "#EF4444", // Red
  warning: "#F59E0B", // Amber
  info: "#3B82F6", // Blue
  background: "#F9FAFB", // Light gray
  surface: "#FFFFFF", // White
  text: {
    primary: "#111827",
    secondary: "#6B7280",
  },
};
```

### **Typography**

```css
Font Family: 'Inter', 'Roboto', sans-serif

Headings:
  h1: 32px, bold
  h2: 24px, bold
  h3: 20px, semibold
  h4: 18px, semibold

Body:
  Large: 18px
  Regular: 16px
  Small: 14px
  Caption: 12px
```

### **Layout**

- **Sidebar**: Fixed left sidebar (240px width)
- **Header**: Top header with breadcrumbs, notifications, profile
- **Content Area**: Main content with padding
- **Responsive**: Collapse sidebar on mobile

---

## 📦 Key Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@mui/material": "^5.14.20",
    "@mui/icons-material": "^5.14.19",
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "zustand": "^4.4.7",
    "react-hook-form": "^7.49.2",
    "zod": "^3.22.4",
    "axios": "^1.6.2",
    "@tanstack/react-table": "^8.11.2",
    "@tanstack/react-query": "^5.14.2",
    "recharts": "^2.10.3",
    "next-auth": "^4.24.5",
    "date-fns": "^3.0.6",
    "react-dropzone": "^14.2.3",
    "react-beautiful-dnd": "^13.1.1",
    "sonner": "^1.2.4"
  },
  "devDependencies": {
    "@types/react": "^18.2.45",
    "@types/node": "^20.10.5",
    "typescript": "^5.3.3",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.0.4",
    "prettier": "^3.1.1",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

---

## 🔌 API Integration

### **API Client Setup**

```typescript
// lib/api/client.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (add auth token)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handle errors)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or logout
      localStorage.removeItem("accessToken");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### **API Service Examples**

```typescript
// lib/api/quizzes.ts
import apiClient from "./client";

export const quizApi = {
  getAll: async (params?: any) => {
    const { data } = await apiClient.get("/admin/quizzes", { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get(`/admin/quizzes/${id}`);
    return data;
  },

  create: async (quizData: any) => {
    const { data } = await apiClient.post("/admin/quizzes", quizData);
    return data;
  },

  update: async (id: string, quizData: any) => {
    const { data } = await apiClient.put(`/admin/quizzes/${id}`, quizData);
    return data;
  },

  delete: async (id: string) => {
    const { data } = await apiClient.delete(`/admin/quizzes/${id}`);
    return data;
  },
};
```

---

## 📝 Key Components

### **1. Quiz Form Component**

```typescript
// components/forms/QuizForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const quizSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  category_id: z.string().uuid("Invalid category"),
  difficulty_level: z.enum(["easy", "medium", "hard"]),
  questions_per_attempt: z.number().min(1).max(100),
  time_limit_minutes: z.number().min(0),
  passing_score: z.number().min(0).max(100),
  is_published: z.boolean(),
});

type QuizFormData = z.infer<typeof quizSchema>;

export default function QuizForm({ initialData, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("title")} placeholder="Quiz Title" />
      {errors.title && <span>{errors.title.message}</span>}

      <select {...register("difficulty_level")}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <input
        type="number"
        {...register("questions_per_attempt", { valueAsNumber: true })}
        placeholder="Questions per attempt"
      />

      <button type="submit">Save Quiz</button>
    </form>
  );
}
```

### **2. Question Form Component**

```typescript
// components/forms/QuestionForm.tsx
"use client";

import { useState } from "react";
import { useFieldArray } from "react-hook-form";

export default function QuestionForm() {
  const [questionType, setQuestionType] = useState("multiple_choice");
  const { fields, append, remove } = useFieldArray({
    name: "options",
  });

  return (
    <div>
      <select
        value={questionType}
        onChange={(e) => setQuestionType(e.target.value)}
      >
        <option value="multiple_choice">Multiple Choice</option>
        <option value="checkbox">Checkbox</option>
        <option value="yes_no">Yes/No</option>
      </select>

      <textarea placeholder="Question text" />

      <ImageUpload label="Question Image (optional)" />

      {/* Answer Options */}
      <div>
        <h3>Answer Options</h3>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input placeholder={`Option ${index + 1}`} />
            <ImageUpload label="Option Image" />
            <input
              type={questionType === "checkbox" ? "checkbox" : "radio"}
              name="correct"
            />
            <button onClick={() => remove(index)}>Remove</button>
          </div>
        ))}
        <button onClick={() => append({})}>Add Option</button>
      </div>

      {/* Fun Fact */}
      <div>
        <h3>Fun Fact (optional)</h3>
        <input placeholder="Fun fact title" />
        <textarea placeholder="Fun fact content" />
        <ImageUpload label="Fun Fact Image" />
      </div>
    </div>
  );
}
```

### **3. Image Upload Component**

```typescript
// components/shared/ImageUpload.tsx
"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function ImageUpload({ onUploadComplete }: Props) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // Show preview
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);

      // Upload to server
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      try {
        const { data } = await axios.post(
          "/api/v1/admin/upload/image",
          formData
        );
        onUploadComplete(data.url);
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setUploading(false);
      }
    },
    [onUploadComplete]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {preview ? (
        <img src={preview} alt="Preview" />
      ) : (
        <p>{isDragActive ? "Drop image here" : "Click or drag image"}</p>
      )}
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
```

---

## 🚀 Implementation Guide

### **Day 1-2: Project Setup**

```bash
# Create Next.js project
npx create-next-app@latest quiz-admin --typescript --app --tailwind

# Install dependencies
npm install @mui/material @emotion/react @emotion/styled
npm install zustand react-hook-form zod @hookform/resolvers/zod
npm install axios @tanstack/react-query
npm install recharts date-fns

# Install dev dependencies
npm install -D @types/react @types/node
```

### **Day 3-4: Authentication & Layout**

- Set up NextAuth.js
- Create login page
- Build dashboard layout (sidebar, header)
- Implement protected routes
- Set up API client with interceptors

### **Day 5-7: Category & Quiz Management**

- Category CRUD pages
- Quiz CRUD pages
- Form validation with Zod
- Image upload component
- Table components with sorting/filtering

### **Day 8-10: Question Management**

- Question form with dynamic options
- Support for all 3 question types
- Image upload for questions/answers
- Fun fact editor
- Question preview

### **Day 11-12: User Management & Analytics**

- User list page
- User detail view
- Analytics dashboard
- Charts and graphs
- Export functionality

### **Day 13-14: Testing & Polish**

- Component testing
- E2E testing
- UI polish and animations
- Responsive design
- Performance optimization

---

## 🧪 Testing Strategy

```typescript
// Example: Quiz Form Test
import { render, screen, fireEvent } from "@testing-library/react";
import QuizForm from "@/components/forms/QuizForm";

describe("QuizForm", () => {
  it("should validate required fields", async () => {
    render(<QuizForm onSubmit={jest.fn()} />);

    const submitButton = screen.getByText("Save Quiz");
    fireEvent.click(submitButton);

    expect(
      await screen.findByText("Title must be at least 3 characters")
    ).toBeInTheDocument();
  });

  it("should submit valid data", async () => {
    const onSubmit = jest.fn();
    render(<QuizForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Quiz Title"), {
      target: { value: "Test Quiz" },
    });

    fireEvent.click(screen.getByText("Save Quiz"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
```

---

## 🔒 Security Checklist

- ✅ HTTPS only (enforced by hosting)
- ✅ JWT token stored in httpOnly cookies or secure storage
- ✅ CSRF protection (NextAuth.js)
- ✅ Input validation on client and server
- ✅ XSS protection (React escapes by default)
- ✅ Role-based access control
- ✅ API rate limiting
- ✅ Secure file uploads (type/size validation)

---

## 🌐 Deployment

### **Option 1: Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Environment Variables**:

```bash
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
NEXTAUTH_URL=https://admin.yourdomain.com
NEXTAUTH_SECRET=your-secret-key
```

### **Option 2: Netlify**

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

### **Option 3: Self-Hosted**

```bash
# Build
npm run build

# Start
npm start

# Or with PM2
pm2 start npm --name "quiz-admin" -- start
```

---

## 📊 Performance Targets

- First Contentful Paint (FCP): < 1.5s
- Time to Interactive (TTI): < 3s
- Lighthouse Score: > 90
- Bundle Size: < 500KB (gzipped)

---

## 🚀 Future Scope (Phase 2 & Beyond)

The following features are **excluded from the current implementation** and are planned for future phases:

### **Advanced Content Management**

- ❌ **Bulk Import/Export**: Import questions from CSV/Excel
- ❌ **Question Templates**: Reusable question templates
- ❌ **Version Control**: Track changes to quizzes/questions
- ❌ **Content Scheduling**: Schedule quiz publish/unpublish
- ❌ **Duplicate Detection**: Identify duplicate questions

### **Enhanced Analytics**

- ❌ **Advanced Reporting**: Custom date ranges, filters
- ❌ **Export to PDF/Excel**: Detailed reports
- ❌ **User Segmentation**: Analyze by demographics
- ❌ **Funnel Analysis**: User journey tracking
- ❌ **A/B Testing**: Test different quiz formats

### **Collaboration Features**

- ❌ **Multi-Admin Support**: Role-based permissions
- ❌ **Activity Logs**: Audit trail of all changes
- ❌ **Comments**: Add notes to quizzes/questions
- ❌ **Approval Workflow**: Review before publishing
- ❌ **Team Management**: Invite/manage team members

### **Communication Tools**

- ❌ **Email Templates**: Customizable email notifications
- ❌ **Push Notifications**: Send to mobile apps
- ❌ **Announcements**: In-app announcements
- ❌ **User Messaging**: Direct message users

### **Advanced Features**

- ❌ **AI-Powered Insights**: Recommendations, predictions
- ❌ **Question Generator**: AI-generated questions
- ❌ **Plagiarism Detection**: Check for duplicate content
- ❌ **Multi-Language**: Manage content in multiple languages
- ❌ **White-Label**: Customize branding per client

### **Integration & Automation**

- ❌ **Webhooks**: Event-driven notifications
- ❌ **API Access**: Public API for integrations
- ❌ **Zapier Integration**: Automate workflows
- ❌ **Calendar Integration**: Schedule content
- ❌ **CRM Integration**: Sync with CRM systems

---

## 📝 Phase 2 Implementation Notes

**When to Implement Phase 2:**

- After Phase 1 is fully delivered and tested
- When admin team grows (multi-admin support needed)
- When content volume increases (bulk operations needed)
- When advanced analytics are requested

**Component Examples for Phase 2:**

```typescript
// Bulk Import Component
export function BulkImportQuestions() {
  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    await axios.post("/api/v1/admin/questions/bulk-import", formData);
  };

  return <FileUpload accept=".csv,.xlsx" onUpload={handleFileUpload} />;
}

// Activity Log Component
export function ActivityLog() {
  const { data: activities } = useQuery({
    queryKey: ["activities"],
    queryFn: () => axios.get("/api/v1/admin/activity-log"),
  });

  return (
    <Table>
      {activities?.map((activity) => (
        <TableRow key={activity.id}>
          <TableCell>{activity.user}</TableCell>
          <TableCell>{activity.action}</TableCell>
          <TableCell>{activity.timestamp}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}
```

---

_Admin Dashboard Guide Version: 1.0_
