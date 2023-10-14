import { ActionType } from "./action";

const usersReducer = (users: User[] = [], action: any = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_USERS:
      return action.payload.users;
    default:
      return users;
  }
};

export default usersReducer;
