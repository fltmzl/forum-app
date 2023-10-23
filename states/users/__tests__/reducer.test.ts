import { ActionType } from "../action";
import usersReducer from "../reducer";

describe("usersReducer function", () => {
  it("should return the initial value when given unknown action", () => {
    const initialState: User[] = [];
    const action = {
      type: "UNKNOWN ACTION",
    };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the users when given by RECEIVE_USERS", () => {
    const initialState: User[] = [];
    const users = [
      {
        id: "john_doe",
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://generated-image-url.jpg",
      },
      {
        id: "jane_doe",
        name: "Jane Doe",
        email: "jane@example.com",
        avatar: "https://generated-image-url.jpg",
      },
    ];
    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: {
        users,
      },
    };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(users);
  });
});
