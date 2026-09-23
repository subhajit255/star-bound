import { AxiosResponse } from "axios";
import apiClient from "./apiClient";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";
import { UsersResponse } from "@/store/slices/userSlice"; 

export const userService = {
  fetchUsers: (page: number = 1, size: number = 10): Promise<AxiosResponse<UsersResponse>> => {
    return apiClient.get(`${API_ENDPOINTS.USERS.GET_ALL}?page=${page}&size=${size}`);
  }
};
