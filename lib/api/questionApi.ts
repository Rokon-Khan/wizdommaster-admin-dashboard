const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type DifficultyLevel = "easy" | "medium" | "hard";
export type QuestionType = "multiple_choice" | "checkbox" | "yes_no";

interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

interface PaginatedResponse<T> {
  success: boolean;
  message?: string;
  data?: T[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface Question {
  id: string;
  quiz_id: string;
  question_type: QuestionType;
  question_text: string;
  question_image_url?: string;
  points: number;
  display_order: number;
  metadata?: string;
  created_at: string;
  updated_at: string;
  options: QuestionOption[];
  quiz?: {
    id: string;
    title: string;
  };
}

export interface QuestionOption {
  id: string;
  text: string;
  image?: string;
  is_correct: boolean;
}

export interface FunFact {
  id: string;
  title: string;
  content: string;
  image?: string;
}

// Helper function for authenticated requests
const authFetch = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
    },
  });
  return response.json();
};

export const questionApi = {
  // ==================== Admin Question Routes ====================
  async getAllQuestions(params?: {
    page?: number;
    limit?: number;
    quizId?: string;
  }): Promise<PaginatedResponse<Question>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.quizId) searchParams.append("quizId", params.quizId);

    const query = searchParams.toString();
    return authFetch(`${API_BASE_URL}/questions${query ? `?${query}` : ""}`);
  },

  async getQuestionById(id: string): Promise<ApiResponse<Question>> {
    return authFetch(`${API_BASE_URL}/questions/${id}`);
  },

  async createQuestion(data: FormData): Promise<ApiResponse<Question>> {
    return authFetch(`${API_BASE_URL}/questions`, {
      method: "POST",
      body: data,
    });
  },

  async updateQuestion(
    id: string,
    data: FormData
  ): Promise<ApiResponse<Question>> {
    return authFetch(`${API_BASE_URL}/questions/${id}`, {
      method: "PUT",
      body: data,
    });
  },

  async deleteQuestion(id: string): Promise<ApiResponse> {
    return authFetch(`${API_BASE_URL}/questions/${id}`, {
      method: "DELETE",
    });
  },
};
