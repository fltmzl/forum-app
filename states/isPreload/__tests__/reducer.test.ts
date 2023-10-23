import { ActionType } from "../action";
import isPreloadReducer from "../reducer";

describe("isPreloadReducer function", () => {
  it("should return the initial value when given unknown action", () => {
    const initialState = true;
    const action = {
      type: "UNKNOWN ACTION",
    };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the isPreload state correctly when given by SET_IS_PRELOAD action", () => {
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload: false,
      },
    };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(action.payload.isPreload);
  });
});
