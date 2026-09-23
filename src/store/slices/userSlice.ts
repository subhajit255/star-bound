"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, PaginationMeta } from "@/types";

export interface UsersResponse {
  items?: User[];
  data?: User[];
  pagination?: PaginationMeta;
  total?: number;
  page?: number;
  size?: number;
  totalPages?: number;
}

// 2. Use a status enum instead of a boolean for more predictable loading states
export type FetchStatus = "idle" | "loading" | "succeeded" | "failed";

export interface UserState {
  data: User[];
  pagination: PaginationMeta;
  status: FetchStatus;
  error: string | null;
  action_status: string | null;
}

const initialPagination: PaginationMeta = {
  total: 0,
  page: 1,
  size: 10,
  totalPages: 1,
};

const initialState: UserState = {
  data: [],
  pagination: initialPagination,
  status: "idle",
  error: null,
  action_status: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsersRequest: (
      state,
      action: PayloadAction<{ page: number; size: number }>,
    ) => {
      state.action_status = getUsersRequest.type;
      state.status = "loading";
      state.error = null;
    },
    getUsersSuccess: (state, action: PayloadAction<UsersResponse>) => {
      state.action_status = getUsersSuccess.type;
      state.status = "succeeded";

      // Cleanly separate data from pagination meta.
      // Many APIs return the array under "data" instead of "items".
      const itemsArray = action.payload.items || action.payload.data || [];
      const paginationMeta = action.payload.pagination || {
        total: action.payload.total || initialPagination.total,
        page: action.payload.page || initialPagination.page,
        size: action.payload.size || initialPagination.size,
        totalPages: action.payload.totalPages || initialPagination.totalPages,
      };
      
      state.data = itemsArray;
      state.pagination = paginationMeta;
    },
    getUsersFailure: (state, action: PayloadAction<string>) => {
      state.action_status = getUsersFailure.type;
      state.status = "failed";
      state.error = action.payload;
    },
    // 3. Enterprise standard: Always provide a way to reset the slice to its initial state
    clearUsersState: () => initialState,
  },
});

export const {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailure,
  clearUsersState,
} = userSlice.actions;

// 4. Enterprise standard: Export memoized or basic selectors so components don't rely on the raw state shape
export const selectUsers = (state: { users: UserState }) => state.users.data;
export const selectUsersPagination = (state: { users: UserState }) =>
  state.users.pagination;
export const selectUsersStatus = (state: { users: UserState }) =>
  state.users.status;
export const selectUsersError = (state: { users: UserState }) =>
  state.users.error;

export default userSlice.reducer;
