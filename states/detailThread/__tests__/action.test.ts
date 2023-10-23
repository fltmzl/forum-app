import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "@/utils/api";
import { asyncReceiveDetailThread, receiveDetailThreadActionCreator } from "../action";

describe("detailThread action", () => {
  describe("asyncReceiveDetailThread thunk function", () => {
    const fakeDetailThreadResponse = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: "comment-1",
          content: "Ini adalah komentar pertama",
          createdAt: "2021-06-21T07:00:00.000Z",
          owner: {
            id: "users-1",
            name: "John Doe",
            avatar: "https://generated-image-url.jpg",
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const fakeErrorResponse = new Error("Ups, something went wrong");

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should dispatch action correctly when fetching success", async () => {
      // arrange
      jest.spyOn(api, "getDetailThread").mockImplementation(() => Promise.resolve(fakeDetailThreadResponse));

      const dispatch = jest.fn();

      // action
      await asyncReceiveDetailThread("thread-1")(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(receiveDetailThreadActionCreator(fakeDetailThreadResponse));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should dispatch action correctly and show alert when fetching failed", async () => {
      // arrange
      jest.spyOn(api, "getDetailThread").mockImplementation(() => Promise.reject(fakeErrorResponse));

      const dispatch = jest.fn();
      window.alert = jest.fn();

      // action
      await asyncReceiveDetailThread("thread-1")(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
