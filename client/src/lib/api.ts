import { getStoredToken } from "./auth";
import type {
  SignupRequest,
  SigninRequest,
  SignupResponse,
  SigninResponse,
  ListTodosResponse,
  CreateTodoRequest,
  CreateTodoResponse,
  UpdateTodoRequest,
  UpdateTodoResponse,
  DeleteTodoResponse,
  GetUserResponse,
} from "@shared/api-types";

const API_BASE_URL = import.meta.env.VITE_Task_APP_BASE_URL || "http://localhost:8080";

async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getStoredToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem("todo_auth_token");
    localStorage.removeItem("todo_auth_user");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  return response;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `Error: ${response.status}`);
  }
  return response.json();
}

export const authApi = {
  signup: async (data: SignupRequest): Promise<SignupResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<SignupResponse>(response);
  },

  signin: async (data: SigninRequest): Promise<SigninResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<SigninResponse>(response);
  },
};

export const userApi = {
  getProfile: async (): Promise<GetUserResponse> => {
    const response = await fetchWithAuth("/user");
    return handleResponse<GetUserResponse>(response);
  },
};

export const todoApi = {
  list: async (): Promise<ListTodosResponse> => {
    const response = await fetchWithAuth("/todo/list");
    return handleResponse<ListTodosResponse>(response);
  },

  create: async (data: CreateTodoRequest): Promise<CreateTodoResponse> => {
    const response = await fetchWithAuth("/todo", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return handleResponse<CreateTodoResponse>(response);
  },

  update: async (id: number, data: UpdateTodoRequest): Promise<UpdateTodoResponse> => {
    const response = await fetchWithAuth(`/todo/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return handleResponse<UpdateTodoResponse>(response);
  },

  delete: async (id: number): Promise<DeleteTodoResponse> => {
    const response = await fetchWithAuth(`/todo/${id}`, {
      method: "DELETE",
    });
    return handleResponse<DeleteTodoResponse>(response);
  },
};
