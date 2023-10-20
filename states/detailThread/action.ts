import { Dispatch } from "@reduxjs/toolkit";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "@/utils/api";
import { RootState } from "..";

const ActionType = {
  RECEIVE_DETAIL_THREAD: "RECEIVE_DETAIL_THREAD",
  CLEAR_DETAIL_THREAD: "CLEAR_DETAIL_THREAD",
  UP_VOTE_DETAIL_THREAD: "UP_VOTE_DETAIL_THREAD",
  DOWN_VOTE_DETAIL_THREAD: "DOWN_VOTE_DETAIL_THREAD",
  NEUTRAL_VOTE_DETAIL_THREAD: "NEUTRAL_VOTE_DETAIL_THREAD",
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

const upVoteDetailThreadActionCreator = (userId: string) => {
  return {
    type: ActionType.UP_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
};

const downVoteDetailThreadActionCreator = (userId: string) => {
  return {
    type: ActionType.DOWN_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
  };
};

const neutralVoteDetailThreadActionCreator = (userId: string) => {
  return {
    type: ActionType.NEUTRAL_VOTE_DETAIL_THREAD,
    payload: {
      userId,
    },
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

const upVoteCommentDetailThreadActionCreator = (commentId: string, userId: string) => {
  return {
    type: ActionType.UP_VOTE_COMMENT_DETAIL_THREAD,
    payload: {
      commentId,
      userId,
    },
  };
};

const downVoteCommentDetailThreadActionCreator = (commentId: string, userId: string) => {
  return {
    type: ActionType.DOWN_VOTE_COMMENT_DETAIL_THREAD,
    payload: {
      commentId,
      userId,
    },
  };
};

const neutralVoteCommentDetailThreadActionCreator = (commentId: string, userId: string) => {
  return {
    type: ActionType.NEUTRAL_VOTE_COMMENT_DETAIL_THREAD,
    payload: {
      commentId,
      userId,
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

const asyncUpVoteDetailThread = (threadId: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { authUser } = getState();
    dispatch(showLoading());

    dispatch(upVoteDetailThreadActionCreator(authUser.id));

    try {
      await api.upVoteThread(threadId);
    } catch (error: any) {
      dispatch(neutralVoteDetailThreadActionCreator(authUser.id));
      console.log(error);
    }

    dispatch(hideLoading());
  };
};

const asyncDownVoteDetailThread = (threadId: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { authUser } = getState();
    dispatch(showLoading());

    dispatch(downVoteDetailThreadActionCreator(authUser.id));

    try {
      await api.downVoteThread(threadId);
    } catch (error: any) {
      dispatch(neutralVoteDetailThreadActionCreator(authUser.id));
      console.log(error);
    }

    dispatch(hideLoading());
  };
};

const asyncNeutralVoteDetailThread = (threadId: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { authUser } = getState();
    dispatch(showLoading());

    dispatch(neutralVoteDetailThreadActionCreator(authUser.id));

    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error: any) {
      console.log(error);
    }

    dispatch(hideLoading());
  };
};

const asyncUpVoteCommentDetailThread = ({ commentId, threadId }: { commentId: string; threadId: string }) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { authUser } = getState();
    dispatch(upVoteCommentDetailThreadActionCreator(commentId, authUser.id));

    dispatch(showLoading());

    try {
      await api.upVoteComment(threadId, commentId);
    } catch (error) {
      dispatch(downVoteCommentDetailThreadActionCreator(commentId, authUser.id));
    }

    dispatch(hideLoading());
  };
};

const asyncDownVoteCommentDetailThread = ({ commentId, threadId }: { commentId: string; threadId: string }) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { authUser } = getState();
    dispatch(downVoteCommentDetailThreadActionCreator(commentId, authUser.id));

    dispatch(showLoading());

    try {
      await api.downVoteComment(threadId, commentId);
    } catch (error) {
      dispatch(upVoteCommentDetailThreadActionCreator(commentId, authUser.id));
    }

    dispatch(hideLoading());
  };
};

const asyncNeutralVoteCommentDetailThread = ({ commentId, threadId }: { commentId: string; threadId: string }) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { authUser } = getState();
    dispatch(neutralVoteCommentDetailThreadActionCreator(commentId, authUser.id));

    dispatch(showLoading());

    try {
      await api.neutralizeVoteComment(threadId, commentId);
    } catch (error) {
      console.log(error);
    }

    dispatch(hideLoading());
  };
};

export {
  ActionType,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  upVoteDetailThreadActionCreator,
  downVoteDetailThreadActionCreator,
  neutralVoteDetailThreadActionCreator,
  neutralVoteCommentDetailThreadActionCreator,
  addCommentDetailThreadActionCreator,
  asyncReceiveDetailThread,
  asyncUpVoteDetailThread,
  asyncDownVoteDetailThread,
  asyncNeutralVoteDetailThread,
  asyncUpVoteCommentDetailThread,
  asyncDownVoteCommentDetailThread,
  asyncNeutralVoteCommentDetailThread,
};
