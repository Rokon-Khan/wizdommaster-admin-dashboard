const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

// Types
export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  categoryId: string;
  thumbnail?: string;
  difficulty?: string;
  timeLimit?: number;
  questions?: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface FunFact {
  id: string;
  title: string;
  content: string;
  image?: string;
  categoryId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  name: string;
  description?: string;
  certificate?: string;
  quizId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: "user" | "admin";
  avatar_url?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Analytics {
  totalUsers: number;
  totalQuizzes: number;
  totalCategories: number;
  totalFunFacts: number;
  totalCertificates: number;
  recentUsers?: User[];
  quizCompletions?: number;
  activeUsers?: number;
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

export const adminApi = {
  // ==================== Category Routes ====================
  async getAllCategories(): Promise<PaginatedResponse<Category>> {
    return authFetch(`${API_BASE_URL}/admin/categories`);
  },

  async getCategoryById(id: string): Promise<ApiResponse<Category>> {
    return authFetch(`${API_BASE_URL}/admin/categories/${id}`);
  },

  async createCategory(data: {
    name: string;
    description?: string;
  }): Promise<ApiResponse<Category>> {
    return authFetch(`${API_BASE_URL}/admin/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  async updateCategory(
    id: string,
    data: { name?: string; description?: string }
  ): Promise<ApiResponse<Category>> {
    return authFetch(`${API_BASE_URL}/admin/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  },

  async deleteCategory(id: string): Promise<ApiResponse> {
    return authFetch(`${API_BASE_URL}/admin/categories/${id}`, {
      method: "DELETE",
    });
  },

  // ==================== Quiz Routes ====================
  async getAllQuizzes(params?: {
    page?: number;
    limit?: number;
    categoryId?: string;
  }): Promise<PaginatedResponse<Quiz>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.categoryId)
      searchParams.append("categoryId", params.categoryId);

    const query = searchParams.toString();
    return authFetch(
      `${API_BASE_URL}/admin/quizzes${query ? `?${query}` : ""}`
    );
  },

  async getQuizById(id: string): Promise<ApiResponse<Quiz>> {
    return authFetch(`${API_BASE_URL}/admin/quizzes/${id}`);
  },

  async createQuiz(data: FormData): Promise<ApiResponse<Quiz>> {
    return authFetch(`${API_BASE_URL}/admin/quizzes`, {
      method: "POST",
      body: data,
    });
  },

  async updateQuiz(id: string, data: FormData): Promise<ApiResponse<Quiz>> {
    return authFetch(`${API_BASE_URL}/admin/quizzes/${id}`, {
      method: "PUT",
      body: data,
    });
  },

  async deleteQuiz(id: string): Promise<ApiResponse> {
    return authFetch(`${API_BASE_URL}/admin/quizzes/${id}`, {
      method: "DELETE",
    });
  },

  // ==================== Fun Facts Routes ====================
  async getAllFunFacts(params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<FunFact>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());

    const query = searchParams.toString();
    return authFetch(
      `${API_BASE_URL}/admin/funfacts${query ? `?${query}` : ""}`
    );
  },

  async getFunFactById(id: string): Promise<ApiResponse<FunFact>> {
    return authFetch(`${API_BASE_URL}/admin/funfacts/${id}`);
  },

  async createFunFact(data: FormData): Promise<ApiResponse<FunFact>> {
    return authFetch(`${API_BASE_URL}/admin/funfacts`, {
      method: "POST",
      body: data,
    });
  },

  async updateFunFact(
    id: string,
    data: FormData
  ): Promise<ApiResponse<FunFact>> {
    return authFetch(`${API_BASE_URL}/admin/funfacts/${id}`, {
      method: "PUT",
      body: data,
    });
  },

  async deleteFunFact(id: string): Promise<ApiResponse> {
    return authFetch(`${API_BASE_URL}/admin/funfacts/${id}`, {
      method: "DELETE",
    });
  },

  // ==================== Certificate Routes ====================
  async getAllCertificates(params?: {
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Certificate>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());

    const query = searchParams.toString();
    return authFetch(
      `${API_BASE_URL}/admin/certificates${query ? `?${query}` : ""}`
    );
  },

  async getCertificateById(id: string): Promise<ApiResponse<Certificate>> {
    return authFetch(`${API_BASE_URL}/admin/certificates/${id}`);
  },

  async createCertificate(data: FormData): Promise<ApiResponse<Certificate>> {
    return authFetch(`${API_BASE_URL}/admin/certificates`, {
      method: "POST",
      body: data,
    });
  },

  async updateCertificate(
    id: string,
    data: FormData
  ): Promise<ApiResponse<Certificate>> {
    return authFetch(`${API_BASE_URL}/admin/certificates/${id}`, {
      method: "PUT",
      body: data,
    });
  },

  async deleteCertificate(id: string): Promise<ApiResponse> {
    return authFetch(`${API_BASE_URL}/admin/certificates/${id}`, {
      method: "DELETE",
    });
  },

  // ==================== Analytics Routes ====================
  async getAnalytics(): Promise<ApiResponse<Analytics>> {
    return authFetch(`${API_BASE_URL}/admin/analytics`);
  },

  // ==================== User Management Routes ====================
  async getAllUsers(params?: {
    page?: number;
    limit?: number;
    role?: string;
  }): Promise<PaginatedResponse<User>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.role) searchParams.append("role", params.role);

    const query = searchParams.toString();
    return authFetch(`${API_BASE_URL}/admin/users${query ? `?${query}` : ""}`);
  },

  async getUserById(id: string): Promise<ApiResponse<User>> {
    return authFetch(`${API_BASE_URL}/admin/users/${id}`);
  },
};
