"use client";

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { Provider, useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getProfileRequest } from "./slices/authSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    // If we have a token but no user data yet, fetch the profile on load
    if (token && !user) {
      dispatch(getProfileRequest());
    }
  }, [dispatch, token, user]);

  return <>{children}</>;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
