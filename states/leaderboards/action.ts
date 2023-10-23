import { Dispatch } from "@reduxjs/toolkit";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "@/utils/api";

const ActionType = {
  RECEIVE_LEADERBOARDS: "RECEIVE_LEADERBOARDS",
};

const receiveLeaderboardsActionCreator = (leaderboards: Leaderboard[]) => {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
};

const asyncReceiveLeaderboards = () => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoading());

    try {
      const leaderboards = await api.getLeaderboards();

      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error: any) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
};

export { ActionType, receiveLeaderboardsActionCreator, asyncReceiveLeaderboards };
