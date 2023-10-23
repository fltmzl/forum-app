import { ActionType } from "../action";
import authUserReducer from "../reducer";

describe("authUserReducer function", () => {
  it("should the initial state when given by unknown action", () => {
    const initialState: User | null = null;
    const action = { type: "UNKNOWN ACTION" };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the authorized user when given by SET_AUTH_USER action", () => {
    const initialState: User | null = null;
    const authUser = {
      id: "john_doe",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    };
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser,
      },
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(authUser);
  });

  it("should set the authUser state to null when given by UNSET_AUTH_USER action", () => {
    const initialState: User | null = {
      id: "john_doe",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(null);
  });
});
