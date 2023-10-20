import { ActionType } from "./action";

const detailThreadReducer = (detailThread: DetailThread | null = null, action: any = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread;

    case ActionType.CLEAR_DETAIL_THREAD:
      return null;

    case ActionType.UP_VOTE_DETAIL_THREAD:
      return {
        ...detailThread,
        upVotesBy: [action.payload.userId, ...detailThread!.upVotesBy],
      };

    case ActionType.DOWN_VOTE_DETAIL_THREAD:
      return {
        ...detailThread,
        downVotesBy: [action.payload.userId, ...detailThread!.downVotesBy],
      };

    case ActionType.NEUTRAL_VOTE_DETAIL_THREAD:
      return {
        ...detailThread,
        upVotesBy: detailThread?.upVotesBy.filter((userId) => userId !== action.payload.userId),
        downVotesBy: detailThread?.downVotesBy.filter((userId) => userId !== action.payload.userId),
      };

    case ActionType.ADD_COMMENT_DETAIL_THREAD:
      return {
        ...detailThread,
        comments: [action.payload.comment, ...detailThread!.comments],
      };

    case ActionType.UP_VOTE_COMMENT_DETAIL_THREAD:
      return {
        ...detailThread,
        comments: detailThread?.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: [action.payload.userId, ...comment.upVotesBy],
            };
          }

          return comment;
        }),
      };

    case ActionType.DOWN_VOTE_COMMENT_DETAIL_THREAD:
      return {
        ...detailThread,
        comments: detailThread?.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: [action.payload.userId, ...comment.downVotesBy],
            };
          }

          return comment;
        }),
      };

    case ActionType.NEUTRAL_VOTE_COMMENT_DETAIL_THREAD:
      return {
        ...detailThread,
        comments: detailThread?.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter((userId) => userId !== action.payload.userId),
              downVotesBy: comment.downVotesBy.filter((userId) => userId !== action.payload.userId),
            };
          }

          return comment;
        }),
      };
    default:
      return detailThread;
  }
};

export default detailThreadReducer;
