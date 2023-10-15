import { Middleware } from "@reduxjs/toolkit";
import { ActionType as ActionTypeThread, neutralVoteThreadActionCreator } from "./threads/action";
import { ActionType as ActionTypeDetailThread, neutralVoteCommentDetailThreadActionCreator } from "./detailThread/action";

const customReduxMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === ActionTypeThread.UP_VOTE_THREAD || action.type === ActionTypeThread.DOWN_VOTE_THREAD) {
    store.dispatch(neutralVoteThreadActionCreator(action.payload.threadId, store.getState().authUser.id));
  }

  if (action.type === ActionTypeDetailThread.UP_VOTE_COMMENT_DETAIL_THREAD || action.type === ActionTypeDetailThread.DOWN_VOTE_COMMENT_DETAIL_THREAD) {
    store.dispatch(neutralVoteCommentDetailThreadActionCreator(action.payload.commentId, store.getState().authUser.id));
  }

  return next(action);
};

export default customReduxMiddleware;
