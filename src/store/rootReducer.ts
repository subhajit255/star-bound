import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  // other reducers will go here (e.g. users, constellations)
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
