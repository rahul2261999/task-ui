import type {
  CreateTodoRequest,
  CreateTodoResponse,
  DeleteTodoResponse,
  ListTodosResponse,
  UpdateTodoRequest,
  UpdateTodoResponse,
} from "@shared/api-types";
import { fetchJson } from "@/shared/api/http";

export const todoApi = {
  list: async (): Promise<ListTodosResponse> => {
    return fetchJson<ListTodosResponse>("/todo/list", {}, { auth: true });
  },

  create: async (data: CreateTodoRequest): Promise<CreateTodoResponse> => {
    return fetchJson<CreateTodoResponse>(
      "/todo",
      { method: "POST", body: JSON.stringify(data) },
      { auth: true },
    );
  },

  update: async (id: number, data: UpdateTodoRequest): Promise<UpdateTodoResponse> => {
    return fetchJson<UpdateTodoResponse>(
      `/todo/${id}`,
      { method: "PATCH", body: JSON.stringify(data) },
      { auth: true },
    );
  },

  delete: async (id: number): Promise<DeleteTodoResponse> => {
    return fetchJson<DeleteTodoResponse>(
      `/todo/${id}`,
      { method: "DELETE" },
      { auth: true },
    );
  },
};


