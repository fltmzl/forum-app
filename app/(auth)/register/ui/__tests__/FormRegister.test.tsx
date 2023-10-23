import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormRegister from "../FormRegister";

describe("FormRegister Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle name typing correctly", async () => {
    // arrange
    render(<FormRegister register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText("Your Name");

    // action
    await userEvent.type(nameInput, "John Doe");

    // assert
    expect(nameInput).toHaveValue("John Doe");
  });

  it("should handle email typing correctly", async () => {
    // arrange
    render(<FormRegister register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText("name@email.com");

    // action
    await userEvent.type(emailInput, "emailtest@gmail.com");

    // assert
    expect(emailInput).toHaveValue("emailtest@gmail.com");
  });

  it("should handle password typing correctly", async () => {
    // arrange
    render(<FormRegister register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText("Your Password");

    // action
    await userEvent.type(passwordInput, "passwordtest");

    // assert
    expect(passwordInput).toHaveValue("passwordtest");
  });

  it("should call register function when submit button is clicked", async () => {
    // arrange
    const mockRegister = jest.fn();
    render(<FormRegister register={mockRegister} />);

    const nameInput = await screen.getByPlaceholderText("Your Name");
    await userEvent.type(nameInput, "Admin");

    const emailInput = await screen.getByPlaceholderText("name@email.com");
    await userEvent.type(emailInput, "admin123@gmail.com");

    const passwordInput = await screen.getByPlaceholderText("Your Password");
    await userEvent.type(passwordInput, "admin123");

    const buttonSubmit = await screen.getByText("REGISTER");

    // action
    await userEvent.click(buttonSubmit);

    // assert
    expect(mockRegister).toHaveBeenCalledWith({
      name: "Admin",
      email: "admin123@gmail.com",
      password: "admin123",
    });
  });
});
