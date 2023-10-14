import { ActionType } from "./action";

const LeaderboardsReducer = (leaderboards: Leaderboard[] = [], action: any = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_LEADERBOARDS:
      return action.payload.leaderboards;
    default:
      return leaderboards;
  }
};

export default LeaderboardsReducer;
