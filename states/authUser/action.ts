import { Dispatch } from "@reduxjs/toolkit";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "@/utils/api";

const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

const setAuthUserActionCreator = (authUser: User | null) => {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
};

const unsetAuthUserActionCreator = () => {
  return {
    type: ActionType.UNSET_AUTH_USER,
  };
};

const asyncSetAuthUser = ({ email, password }: UserLoginParams) => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoading());

    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);

      const user = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(user));
    } catch (error: any) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
};

const asyncUnsetAuthUser = () => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoading());

    try {
      api.putAccessToken("");
      dispatch(unsetAuthUserActionCreator());
    } catch (error: any) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
};

export { ActionType, setAuthUserActionCreator, unsetAuthUserActionCreator, asyncSetAuthUser, asyncUnsetAuthUser };
