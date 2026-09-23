"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginCredentials, AuthUser } from "@/types";

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  action_status: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token:
    typeof window !== "undefined" ? localStorage.getItem("admin_token") : null,
  loading: false,
  error: null,
  action_status: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginCredentials>) => {
      state.action_status = loginRequest.type;
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: AuthUser; token: string }>,
    ) => {
      state.action_status = loginSuccess.type;
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_token", action.payload.token);
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.action_status = loginFailure.type;
      state.loading = false;
      state.error = action.payload;
    },

    getProfileRequest(state) {
      ((state.action_status = getProfileRequest.type), (state.loading = true));
      state.error = null;
    },

    getProfileSuccess(state, action: PayloadAction<AuthUser>) {
      state.action_status = getProfileSuccess.type;
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    getProfileFailure(state, action: PayloadAction<string>) {
      state.action_status = getProfileFailure.type;
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("admin_token");
    },

    logoutRequest: (state) => {
      state.action_status = logoutRequest.type;
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.action_status = logoutSuccess.type;
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("admin_token");
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.action_status = logoutFailure.type;
      state.loading = false;
      state.error = action.payload;
    },

    // Clear error and status
    clearAuthError: (state) => {
      state.error = null;
      state.action_status = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  getProfileRequest,
  getProfileSuccess,
  getProfileFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;
