import api from "@/utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "..";

const ActionType = {
  RECEIVE_THREADS: "RECEIVE_THREADS",
  ADD_THREAD: "ADD_THREAD",
  ADD_THREAD_COMMENT: "ADD_THREAD_COMMENT",
  UP_VOTE_THREAD: "UP_VOTE_THREAD",
  DOWN_VOTE_THREAD: "DOWN_VOTE_THREAD",
  NEUTRAL_VOTE_THREAD: "NEUTRAL_VOTE_THREAD",
};

const receiveThreadsActionCreator = (threads: Thread[]) => {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
};

const addThreadActionCreator = (thread: Thread) => {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
};

const addThreadCommentActionCreator = (threadId: string) => {
  return {
    type: ActionType.ADD_THREAD_COMMENT,
    payload: {
      threadId,
    },
  };
};

const upVoteThreadActionCreator = (threadId: string, userId: string) => {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
};

const downVoteThreadActionCreator = (threadId: string, userId: string) => {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
};

const neutralVoteThreadActionCreator = (threadId: string, userId: string) => {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
};

const asyncAddThread = ({ body, title, category }: CreateThreadParams) => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await api.createThread({ body, title, category });

      dispatch(addThreadActionCreator(thread));
    } catch (error: any) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
};

const asyncUpVoteThread = (threadId: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { authUser } = getState();
    dispatch(showLoading());

    dispatch(upVoteThreadActionCreator(threadId, authUser.id));

    try {
      await api.upVoteThread(threadId);
    } catch (error: any) {
      dispatch(neutralVoteThreadActionCreator(threadId, authUser.id));
      console.log(error);
    }

    dispatch(hideLoading());
  };
};

const asyncDownVoteThread = (threadId: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { authUser } = getState();
    dispatch(showLoading());

    dispatch(downVoteThreadActionCreator(threadId, authUser.id));

    try {
      await api.downVoteThread(threadId);
    } catch (error: any) {
      dispatch(neutralVoteThreadActionCreator(threadId, authUser.id));
      console.log(error);
    }

    dispatch(hideLoading());
  };
};

const asyncNeutralVoteThread = (threadId: string) => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    const { authUser } = getState();
    dispatch(showLoading());

    dispatch(neutralVoteThreadActionCreator(threadId, authUser.id));

    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error: any) {
      console.log(error);
    }

    dispatch(hideLoading());
  };
};

export {
  ActionType,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralVoteThreadActionCreator,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncAddThread,
  addThreadCommentActionCreator,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
};
