import { ActionType } from "../action";
import LeaderboardsReducer from "../reducer";

describe("usersReducer function", () => {
  it("should return the initial value when given unknown action", () => {
    const initialState: Leaderboard[] = [];
    const action = {
      type: "UNKNOWN ACTION",
    };

    const nextState = LeaderboardsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the leaderboard list when given by RECEIVE_LEADERBOARDS", () => {
    const initialState: Leaderboard[] = [];
    const leaderboards = [
      {
        user: {
          id: "users-1",
          name: "John Doe",
          email: "john@example.com",
          avatar: "https://generated-image-url.jpg",
        },
        score: 10,
      },
      {
        user: {
          id: "users-2",
          name: "Jane Doe",
          email: "jane@example.com",
          avatar: "https://generated-image-url.jpg",
        },
        score: 5,
      },
    ];
    const action = {
      type: ActionType.RECEIVE_LEADERBOARDS,
      payload: {
        leaderboards,
      },
    };

    const nextState = LeaderboardsReducer(initialState, action);

    expect(nextState).toEqual(leaderboards);
  });
});
