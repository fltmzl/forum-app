import api from "@/utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { Dispatch } from "@reduxjs/toolkit";
import { receiveUserActionCreator } from "../users/action";
import { addThreadCommentActionCreator, downVoteThreadActionCreator, neutralVoteThreadActionCreator, receiveThreadsActionCreator, upVoteThreadActionCreator } from "../threads/action";
import { addCommentDetailThreadActionCreator } from "../detailThread/action";
import { RootState } from "..";

const asyncPopulateThreadsAndUsers = () => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoading());

    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUserActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error: any) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
};

const asyncAddCommentThread = ({ content, threadId }: CreateCommentParams) => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoading());

    try {
      const comment: CommentThread = await api.createComment({ content, threadId });

      dispatch(addCommentDetailThreadActionCreator(comment));
      dispatch(addThreadCommentActionCreator(threadId));
    } catch (error: any) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
};

export { asyncPopulateThreadsAndUsers, asyncAddCommentThread };
