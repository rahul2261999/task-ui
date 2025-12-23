import type {
  SigninRequest,
  SigninResponse,
  SignupRequest,
  SignupResponse,
} from "@shared/api-types";
import { fetchJson } from "@/shared/api/http";

export const authApi = {
  signup: async (data: SignupRequest): Promise<SignupResponse> => {
    return fetchJson<SignupResponse>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  signin: async (data: SigninRequest): Promise<SigninResponse> => {
    return fetchJson<SigninResponse>("/auth/signin", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};


