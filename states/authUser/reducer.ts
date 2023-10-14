import { ActionType } from "./action";

const authUserReducer = (authUser: User | null = null, action: any = {}) => {
  switch (action.type) {
    case ActionType.SET_AUTH_USER:
      return action.payload.authUser;
    case ActionType.UNSET_AUTH_USER:
      return null;
    default:
      return authUser;
  }
};

export default authUserReducer;
