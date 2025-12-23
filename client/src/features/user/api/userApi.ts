import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
  GetUserResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "@shared/api-types";
import { fetchJson } from "@/shared/api/http";

export const userApi = {
  getProfile: async (): Promise<GetUserResponse> => {
    return fetchJson<GetUserResponse>("/user", {}, { auth: true });
  },

  updateProfile: async (
    data: UpdateProfileRequest,
  ): Promise<UpdateProfileResponse> => {
    return fetchJson<UpdateProfileResponse>(
      "/user/profile",
      { method: "PATCH", body: JSON.stringify(data) },
      { auth: true },
    );
  },

  changePassword: async (
    data: ChangePasswordRequest,
  ): Promise<ChangePasswordResponse> => {
    return fetchJson<ChangePasswordResponse>(
      "/auth/change-password",
      { method: "POST", body: JSON.stringify(data) },
      { auth: true },
    );
  },
};


