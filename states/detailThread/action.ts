import api from "@/utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { Dispatch } from "@reduxjs/toolkit";

const ActionType = {
  RECEIVE_DETAIL_THREAD: "RECEIVE_DETAIL_THREAD",
  CLEAR_DETAIL_THREAD: "CLEAR_DETAIL_THREAD",
  ADD_COMMENT_DETAIL_THREAD: "ADD_COMMENT_DETAIL_THREAD",
  UP_VOTE_COMMENT_DETAIL_THREAD: "UP_VOTE_COMMENT_DETAIL_THREAD",
  DOWN_VOTE_COMMENT_DETAIL_THREAD: "DOWN_VOTE_COMMENT_DETAIL_THREAD",
  NEUTRAL_VOTE_COMMENT_DETAIL_THREAD: "NEUTRAL_VOTE_COMMENT_DETAIL_THREAD",
};

const receiveDetailThreadActionCreator = (detailThread: DetailThread) => {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
};

const clearDetailThreadActionCreator = () => {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
};

const addCommentDetailThreadActionCreator = (comment: CommentThread) => {
  return {
    type: ActionType.ADD_COMMENT_DETAIL_THREAD,
    payload: {
      comment,
    },
  };
};

const upVoteCommentDetailThreadActionCreator = (commentId: string) => {
  return {
    type: ActionType.UP_VOTE_COMMENT_DETAIL_THREAD,
    payload: {
      commentId,
    },
  };
};

const downVoteCommentDetailThreadActionCreator = (commentId: string) => {
  return {
    type: ActionType.DOWN_VOTE_COMMENT_DETAIL_THREAD,
    payload: {
      commentId,
    },
  };
};

const neutralVoteCommentDetailThreadActionCreator = (commentId: string) => {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT_DETAIL_THREAD,
    payload: {
      commentId,
    },
  };
};

const asyncReceiveDetailThread = (threadId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoading());

    try {
      const detailThread = await api.getDetailThread(threadId);

      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error: any) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
};

export { ActionType, receiveDetailThreadActionCreator, clearDetailThreadActionCreator, asyncReceiveDetailThread, addCommentDetailThreadActionCreator };
