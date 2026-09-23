import { call, put, takeLatest, delay } from "redux-saga/effects";
import { authService } from "@/services/authService";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  getProfileRequest,
  getProfileSuccess,
  getProfileFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} from "../slices/authSlice";
import { LoginCredentials } from "@/types";
import { LoginResponse, ProfileResponse } from "@/types";
import type { SagaIterator } from "redux-saga";
import toast from "react-hot-toast";
import { AxiosResponse } from "axios";

function* handleLogin(action: ReturnType<typeof loginRequest>): SagaIterator {
  try {
    const { email, password } = action.payload;
    const response: AxiosResponse<LoginResponse> = yield call(
      authService.login,
      email,
      password,
    );
    toast.success("Successfully logged in");
    const { user, accessToken } = response.data;
    yield put(loginSuccess({ user, token: accessToken }));
  } catch (error: any) {
    const message = error.response?.data?.message || "Invalid credentials";
    console.error("Login Failed:", message);
    toast.error(message); // Use toastError, not toastSuccess
    yield put(loginFailure(message));
  }
}

function* handleGetProfile(): SagaIterator {
  try {
    const response: AxiosResponse<any> = yield call(authService.getProfile);
    // Assuming response.data contains the user object or response.data.user
    const user = response.data.user || response.data;
    yield put(getProfileSuccess(user));
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to load profile";
    console.error("Get Profile Failed:", message);
    yield put(getProfileFailure(message));
  }
}
function* handleLogout(): SagaIterator {
  try {
    yield put(logoutSuccess());
    toast.success("Successfully logged out");
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  } catch (error: any) {
    yield put(logoutFailure("Logout failed"));
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest(loginRequest.type, handleLogin);
    yield takeLatest(getProfileRequest.type, handleGetProfile);
    yield takeLatest(logoutRequest.type, handleLogout);
  })(),
];

export default watchFunction;
