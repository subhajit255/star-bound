import { AxiosResponse } from "axios";
import apiClient from "./apiClient";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import { LoginResponse } from "@/types";

export const authService = {
  login: (email: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
  },
  
  getProfile: (): Promise<AxiosResponse<any>> => {
    return apiClient.get(API_ENDPOINTS.AUTH.PROFILE);
  }
};
