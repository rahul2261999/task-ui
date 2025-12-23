import { z } from "zod";

export interface ApiResponse<T = unknown> {
  message: string;
  data?: T;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export type UserStatus = "pending" | "active" | "inactive" | "suspended" | "deleted";
export type UserType = "regular" | "admin";

export interface User {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
  type: UserType;
}

export interface AuthPayload {
  user: User;
  token: string;
}

export type TodoStatus = "pending" | "inprogress" | "completed" | "cancelled";

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  user_id: number;
  due_date: string | null;
  created_at: string;
  updated_at: string;
  created_by: number;
  updated_by: number;
}

export const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  due_date: z.string().optional(),
});

export const updateTodoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["pending", "inprogress", "completed", "cancelled"]).optional(),
  due_date: z.string().optional(),
});

export type SignupRequest = z.infer<typeof signupSchema>;
export type SigninRequest = z.infer<typeof signinSchema>;
export type CreateTodoRequest = z.infer<typeof createTodoSchema>;
export type UpdateTodoRequest = z.infer<typeof updateTodoSchema>;

export type SignupResponse = ApiResponse<AuthPayload>;
export type SigninResponse = ApiResponse<AuthPayload>;
export type GetUserResponse = ApiResponse<User>;
export type ListTodosResponse = ApiResponse<Todo[]>;
export type CreateTodoResponse = ApiResponse<Todo>;
export type GetTodoResponse = ApiResponse<Todo>;
export type UpdateTodoResponse = ApiResponse<Todo>;
export type DeleteTodoResponse = ApiResponse<null>;
