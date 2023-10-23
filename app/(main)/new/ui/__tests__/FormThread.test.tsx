import userEvent from "@testing-library/user-event";
import { cleanup, render, screen } from "@testing-library/react";
import FormThread from "../FormThread";

const fakeAuthUser = {
  id: "john_doe",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://generated-image-url.jpg",
};

jest.mock("next/navigation");

describe("FormThread Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render form input correctly", async () => {
    render(<FormThread authUser={fakeAuthUser} createNewThread={() => {}} />);

    const threadTitleInput = await screen.getByPlaceholderText("Judul Thread");
    const threadCategoryInput = await screen.getByPlaceholderText("Kategori");
    const threadBodyInput = await screen.getByPlaceholderText("Apa yang anda pikirkan");
    const threadSubmitButton = await screen.getByRole("button", { name: "Buat Thread" });

    expect(threadTitleInput).toBeInTheDocument();
    expect(threadCategoryInput).toBeInTheDocument();
    expect(threadBodyInput).toBeInTheDocument();
    expect(threadSubmitButton).toBeInTheDocument();
  });

  it("should handle title typing correctly", async () => {
    // arrange
    render(<FormThread authUser={fakeAuthUser} createNewThread={() => {}} />);
    const threadTitleInput = await screen.getByPlaceholderText("Judul Thread");

    // action
    await userEvent.type(threadTitleInput, "Test judul thread");

    // assert
    expect(threadTitleInput).toHaveValue("Test judul thread");
  });

  it("should handle category typing correctly", async () => {
    // arrange
    render(<FormThread authUser={fakeAuthUser} createNewThread={() => {}} />);
    const threadCategoryInput = await screen.getByPlaceholderText("Kategori");

    // action
    await userEvent.type(threadCategoryInput, "new category");

    // assert
    expect(threadCategoryInput).toHaveValue("new category");
  });

  it("should handle body typing correctly", async () => {
    // arrange
    render(<FormThread authUser={fakeAuthUser} createNewThread={() => {}} />);

    const threadBodyInput = await screen.getByPlaceholderText("Apa yang anda pikirkan");

    // action
    await userEvent.type(threadBodyInput, "isi dari thread nya");

    // assert
    expect(threadBodyInput).toHaveValue("isi dari thread nya");
  });

  it("should call createNewThread function when submit button is clicked", async () => {
    // arrange
    const mockCreateNewThread = jest.fn();
    render(<FormThread authUser={fakeAuthUser} createNewThread={mockCreateNewThread} />);

    const threadTitleInput = await screen.getByPlaceholderText("Judul Thread");
    await userEvent.type(threadTitleInput, "judul dari thread");

    const threadCategoryInput = await screen.getByPlaceholderText("Kategori");
    await userEvent.type(threadCategoryInput, "kategori baru");

    const threadBodyInput = await screen.getByPlaceholderText("Apa yang anda pikirkan");
    await userEvent.type(threadBodyInput, "isi dari thread");

    const threadSubmitButton = await screen.getByRole("button", { name: "Buat Thread" });

    // action
    await userEvent.click(threadSubmitButton);

    // assert
    expect(mockCreateNewThread).toHaveBeenCalledWith({
      title: "judul dari thread",
      category: "kategori baru",
      body: "isi dari thread",
    });
  });
});
