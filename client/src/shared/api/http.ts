import { clearStoredAuth } from "@/shared/store/auth";
import { getStoredToken } from "@/shared/store/auth";

const API_BASE_URL =
  import.meta.env.VITE_TASK_APP_BASE_URL ||
  "https://906db7c7fc2a.ngrok-free.app";

export function getApiBaseUrl(): string {
  return API_BASE_URL;
}

export async function fetchJson<T>(
  path: string,
  options: RequestInit = {},
  opts: { auth?: boolean } = {},
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (opts.auth) {
    const token = getStoredToken();
    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearStoredAuth();
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `Error: ${response.status}`);
  }

  return response.json() as Promise<T>;
}


