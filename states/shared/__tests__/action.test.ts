import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "@/utils/api";
import { receiveUserActionCreator } from "@/states/users/action";
import { receiveThreadsActionCreator } from "@/states/threads/action";
import { asyncPopulateThreadsAndUsers } from "../action";

const fakeThreadsResponse = [
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

const fakeUsersResponse = [
  {
    id: "john_doe",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://generated-image-url.jpg",
  },
];

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("asyncAddThread thunk function", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // mock
    jest.spyOn(api, "getAllUsers").mockImplementation(() => Promise.resolve(fakeUsersResponse));
    jest.spyOn(api, "getAllThreads").mockImplementation(() => Promise.resolve(fakeThreadsResponse));

    // spy
    const dispatch = jest.fn();

    // action
    await asyncPopulateThreadsAndUsers()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUserActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and show alert when fetching failed", async () => {
    // arrange
    // mock
    jest.spyOn(api, "getAllUsers").mockImplementation(() => Promise.reject(fakeErrorResponse));
    jest.spyOn(api, "getAllThreads").mockImplementation(() => Promise.reject(fakeErrorResponse));

    // spy
    const dispatch = jest.fn();
    window.alert = jest.fn();

    // action
    await asyncPopulateThreadsAndUsers()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
