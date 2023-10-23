import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "@/utils/api";
import { asyncSetAuthUser, asyncUnsetAuthUser, setAuthUserActionCreator, unsetAuthUserActionCreator } from "../action";

describe("authUser action", () => {
  describe("asyncSetAuthUser thunk function", () => {
    const fakeUser = {
      email: "john@example.com",
      password: "john",
    };

    const fakeUserResponse = {
      id: "john_doe",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    };

    const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4.SflKxwRJSMeKKF2QT4fwpMeJf36";

    const fakeErrorResponse = new Error("Login failed");

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should dispatch action correctly when login success", async () => {
      // arrange
      jest.spyOn(api, "login").mockImplementation(() => Promise.resolve(fakeToken));
      jest.spyOn(api, "getOwnProfile").mockImplementation(() => Promise.resolve(fakeUserResponse));

      const dispatch = jest.fn();

      // action
      await asyncSetAuthUser({ email: fakeUser.email, password: fakeUser.password })(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUserResponse));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should dispatch action correctly and show alert when login failed", async () => {
      // arrange
      jest.spyOn(api, "login").mockImplementation(() => Promise.reject(fakeErrorResponse));
      jest.spyOn(api, "getOwnProfile").mockImplementation(() => Promise.reject(fakeErrorResponse));

      const dispatch = jest.fn();
      window.alert = jest.fn();

      // action
      await asyncSetAuthUser({ email: fakeUser.email, password: fakeUser.password })(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe("asyncUnsetAuthUser thunk function", () => {
    it("should dispatch action correctly when logout success", async () => {
      // arrange
      const dispatch = jest.fn();

      // action
      await asyncUnsetAuthUser()(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
