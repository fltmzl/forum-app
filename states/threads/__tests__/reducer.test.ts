import { ActionType } from "../action";
import threadsReducer from "../reducer";

describe("threadsReducer function", () => {
  it("should return the initial value state when given by unknown action", () => {
    // arrange
    const initialState: Thread[] = [];
    const action = { type: "UNKNOWN TYPE" };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return the threads when given by RECEIVE_THREADS action", () => {
    // arrange
    const initialState: Thread[] = [];
    const threads = [
      {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: "thread-2",
        title: "Thread Kedua",
        body: "Ini adalah thread kedua",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-2",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads,
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(threads);
  });

  it("should return the threads with the new thread when given by ADD_THREADS action", () => {
    // arrange
    const initialState: Thread[] = [
      {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: "thread-2",
        title: "Thread Kedua",
        body: "Ini adalah thread kedua",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-2",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const newThread = {
      id: "thread-3",
      title: "Thread Ketiga",
      body: "Ini adalah thread ketiga",
      category: "React",
      createdAt: "2021-09-21T07:00:00.000Z",
      ownerId: "users-2",
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };

    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: newThread,
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([newThread, ...initialState]);
  });

  it("should return the total of comments correctly when given by ADD_THREAD_COMMENT", () => {
    const initialState: Thread[] = [
      {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: ActionType.ADD_THREAD_COMMENT,
      payload: {
        threadId: "thread-1",
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].totalComments).toEqual(1);
  });

  it("should return the list of upVotesBy correctly when given by UP_VOTE_THREAD", () => {
    const initialState: Thread[] = [
      {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        threadId: "thread-1",
        userId: "user-2",
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toContain("user-2");
  });

  it("should return the list of downVotesBy correctly when given by DOWN_VOTE_THREAD", () => {
    const initialState: Thread[] = [
      {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        threadId: "thread-1",
        userId: "user-2",
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].downVotesBy).toContain("user-2");
  });

  it("should neutralize the thread vote correctly when given by NEUTRAL_VOTE_THREAD", () => {
    const initialState: Thread[] = [
      {
        id: "thread-1",
        title: "Thread Pertama",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "users-1",
        upVotesBy: ["user-2"],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: ActionType.NEUTRAL_VOTE_THREAD,
      payload: {
        threadId: "thread-1",
        userId: "user-2",
      },
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).not.toContain("user-2");
    expect(nextState[0].downVotesBy).not.toContain("user-2");
  });
});
