import { loadingBarReducer } from "react-redux-loading-bar";
import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";
import usersReducer from "./users/reducer";
import threadsReducer from "./threads/reducer";
import detailThreadReducer from "./detailThread/reducer";
import LeaderboardsReducer from "./leaderboards/reducer";
import customReduxMiddleware from "./customReduxMiddleware";

export const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    loadingBar: loadingBarReducer,
    users: usersReducer,
    threads: threadsReducer,
    detailThread: detailThreadReducer,
    leaderboards: LeaderboardsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customReduxMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
