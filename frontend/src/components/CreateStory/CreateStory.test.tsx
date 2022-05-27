import { render, screen, fireEvent } from "../../tests/utils/test-utils";
import CreateStory from "./CreateStory";

describe("CreateStory", () => {
  test("should render CreateStory component", () => {
    render(<CreateStory />);

    expect(
      screen.getByRole("textbox", { name: /create a new story/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/upload photo/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /create post/i })
    ).toBeInTheDocument();
  });

  test("input should be typable", () => {
    render(<CreateStory />);

    const input = screen.getByRole("textbox", { name: /create a new story/i });
    expect(input).toHaveValue("");

    fireEvent.change(input, { target: { value: "new story" } });
    expect(input).toHaveValue("new story");
  });
});
