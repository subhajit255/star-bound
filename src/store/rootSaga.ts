import { all } from "redux-saga/effects";
import authWatchers from "./sagas/authSaga";
import userWatchers from "./sagas/userSaga";

const combinedWatchers = [...authWatchers, ...userWatchers];

export default function* rootSaga() {
  yield all(combinedWatchers);
}
