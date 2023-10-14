import { ActionType } from "./action";

const detailThreadReducer = (detailThread: DetailThread | null = null, action: any = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread;

    case ActionType.CLEAR_DETAIL_THREAD:
      return null;

    case ActionType.ADD_COMMENT_DETAIL_THREAD:
      return {
        ...detailThread,
        comments: [action.payload.comment, ...detailThread!.comments],
      };

    case ActionType.UP_VOTE_COMMENT_DETAIL_THREAD:
      return {
        ...detailThread,
        comments: // menambah upvote dan downvote
      }
    default:
      return detailThread;
  }
};

export default detailThreadReducer;
