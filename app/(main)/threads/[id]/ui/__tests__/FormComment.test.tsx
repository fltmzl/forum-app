import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormComment from "../FormComment";

describe("FormComment Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render the component correctly", async () => {
    render(<FormComment threadId="thread-1" addComment={() => {}} />);

    const commentInput = await screen.getByPlaceholderText("Tulis komentar anda");
    const submitButton = await screen.getByRole("button", {
      name: "Kirim",
    });

    expect(commentInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should handle comment typing correctly", async () => {
    render(<FormComment threadId="thread-1" addComment={() => {}} />);
    const commentInput = await screen.getByPlaceholderText("Tulis komentar anda");

    await userEvent.type(commentInput, "komentar satu");

    expect(commentInput).toHaveValue("komentar satu");
  });

  it("should call addComment function when submit button is clicked", async () => {
    // arrange
    const mockAddComment = jest.fn();
    render(<FormComment threadId="thread-1" addComment={mockAddComment} />);

    const commentInput = await screen.getByPlaceholderText("Tulis komentar anda");
    await userEvent.type(commentInput, "Komentar test satu");

    const submitButton = await screen.getByRole("button", {
      name: "Kirim",
    });

    // action
    await userEvent.click(submitButton);

    // assert
    expect(mockAddComment).toHaveBeenCalledWith({
      content: "Komentar test satu",
      threadId: "thread-1",
    });
  });
});
