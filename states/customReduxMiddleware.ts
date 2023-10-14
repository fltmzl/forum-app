import { Middleware } from "@reduxjs/toolkit";
import { ActionType, neutralVoteThreadActionCreator } from "./threads/action";

const customReduxMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === ActionType.UP_VOTE_THREAD || action.type === ActionType.DOWN_VOTE_THREAD) {
    store.dispatch(neutralVoteThreadActionCreator(action.payload.threadId, store.getState().authUser.id));
  }

  return next(action);
};

export default customReduxMiddleware;
