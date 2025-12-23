import type {
  SigninRequest,
  SignupRequest,
  AuthResponse,
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  ApiResponse,
} from "./api-types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem("auth_token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "Request failed" };
    }

    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Network error" };
  }
}

export const authApi = {
  signin: (data: SigninRequest) =>
    request<AuthResponse>("/auth/signin", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  signup: (data: SignupRequest) =>
    request<AuthResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export const todoApi = {
  list: () => request<Todo[]>("/todo/list"),

  create: (data: CreateTodoRequest) =>
    request<Todo>("/todo", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: UpdateTodoRequest) =>
    request<Todo>(`/todo/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    request<void>(`/todo/${id}`, {
      method: "DELETE",
    }),
};
