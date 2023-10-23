import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormLogin from "../FormLogin";

describe("FormLogin Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle email typing correctly", async () => {
    // arrange
    render(<FormLogin login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText("name@email.com");

    // action
    await userEvent.type(emailInput, "emailtest@gmail.com");

    // assert
    expect(emailInput).toHaveValue("emailtest@gmail.com");
  });

  it("should handle password typing correctly", async () => {
    // arrange
    render(<FormLogin login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText("Your Password");

    // action
    await userEvent.type(passwordInput, "passwordtest");

    // assert
    expect(passwordInput).toHaveValue("passwordtest");
  });

  it("should call login function when submit button is clicked", async () => {
    // arrange
    const mockLogin = jest.fn();
    render(<FormLogin login={mockLogin} />);

    const emailInput = await screen.getByPlaceholderText("name@email.com");
    await userEvent.type(emailInput, "admin123@gmail.com");

    const passwordInput = await screen.getByPlaceholderText("Your Password");
    await userEvent.type(passwordInput, "admin123");

    const buttonSubmit = await screen.getByText("LOGIN");

    // action
    await userEvent.click(buttonSubmit);

    // assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: "admin123@gmail.com",
      password: "admin123",
    });
  });
});
