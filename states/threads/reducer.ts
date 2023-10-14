import { ActionType } from "./action";

const threadsReducer = (threads: Thread[] = [], action: any = {}) => {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;

    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];

    case ActionType.ADD_THREAD_COMMENT:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            totalComments: thread.totalComments + 1,
          };
        }

        return thread;
      });

    case ActionType.UP_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: [action.payload.userId, ...thread.upVotesBy],
          };
        }

        return thread;
      });

    case ActionType.NEUTRAL_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((userId) => userId !== action.payload.userId),
            downVotesBy: thread.downVotesBy.filter((userId) => userId !== action.payload.userId),
          };
        }

        return thread;
      });

    case ActionType.DOWN_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy: [action.payload.userId, ...thread.downVotesBy],
          };
        }

        return thread;
      });

    default:
      return threads;
  }
};

export default threadsReducer;
