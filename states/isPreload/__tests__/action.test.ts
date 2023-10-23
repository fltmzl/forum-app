import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "@/utils/api";
import { asyncSetIsPreload, setIsPreloadActionCreator } from "../action";
import { setAuthUserActionCreator } from "@/states/authUser/action";

describe("isPreload action", () => {
  describe("asyncSetIsPreload thunk function", () => {
    const fakeAuthUser = {
      id: "john_doe",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    };

    const fakeErrorResponse = new Error("Ups, something went wrong");

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should dispatch action correctly when get own profile success", async () => {
      // arrange
      jest.spyOn(api, "getOwnProfile").mockImplementation(() => Promise.resolve(fakeAuthUser));
      const dispatch = jest.fn();

      // action
      await asyncSetIsPreload()(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUser));
      expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should dispatch action correctly when get own profile failed", async () => {
      // arrange
      jest.spyOn(api, "getOwnProfile").mockImplementation(() => Promise.reject(fakeErrorResponse));
      const dispatch = jest.fn();

      // action
      await asyncSetIsPreload()(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
      expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
