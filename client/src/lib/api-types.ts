import { z } from "zod";

// Auth types
export const signinSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SigninRequest = z.infer<typeof signinSchema>;
export type SignupRequest = z.infer<typeof signupSchema>;

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Todo types
export type TodoStatus = "pending" | "inprogress" | "completed";

export interface Todo {
  id: number;
  title: string;
  description: string | null;
  status: TodoStatus;
  due_date: string | null;
  user_id: number;
}

export const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  due_date: z.string().optional(),
});

export type CreateTodoRequest = z.infer<typeof createTodoSchema>;

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  status?: TodoStatus;
  due_date?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
