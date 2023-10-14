import api from "@/utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { Dispatch } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const ActionType = {
  RECEIVE_USERS: "RECEIVE_USERS",
};

const receiveUserActionCreator = (users: User[]) => {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
};

const asyncRegisterUser = ({ email, name, password }: UserRegisterParams) => {
  return async (dispatch: Dispatch) => {
    dispatch(showLoading());

    try {
      await api.register({ name, email, password });
      Cookies.set("register-success-message", "Register berhasil, silahkan Login ke akun anda");
      const msg = Cookies.get("register-success-message");
      console.log(msg);
    } catch (error: any) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
};

export { ActionType, receiveUserActionCreator, asyncRegisterUser };
