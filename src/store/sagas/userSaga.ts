import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { userService } from "@/services/userService";
import {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  UsersResponse,
} from "@/store/slices/userSlice";

function* handleGetUsers(action: ReturnType<typeof getUsersRequest>) {
  try {
    const { page, size } = action.payload;
    const response: AxiosResponse<UsersResponse> = yield call(
      userService.fetchUsers,
      page,
      size
    );
    yield put(getUsersSuccess(response.data));
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to fetch users";
    console.error("Get Users Failed:", message);
    yield put(getUsersFailure(message));
  }
}

const userWatchers = [
  takeLatest(getUsersRequest.type, handleGetUsers),
];

export default userWatchers;
