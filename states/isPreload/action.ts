import { showLoading, hideLoading } from "react-redux-loading-bar";
import { Dispatch } from "@reduxjs/toolkit";
import api from "@/utils/api";
import { setAuthUserActionCreator } from "../authUser/action";

const ActionType = {
  SET_IS_PRELOAD: "SET_IS_PRELOAD",
};

const setIsPreloadActionCreator = (isPreload: boolean) => {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
};

const asyncSetIsPreload = () => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoading());

    try {
      const user = await api.getOwnProfile();

      dispatch(setAuthUserActionCreator(user));
    } catch (error: any) {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }

    dispatch(hideLoading());
  };
};

export { ActionType, setIsPreloadActionCreator, asyncSetIsPreload };
