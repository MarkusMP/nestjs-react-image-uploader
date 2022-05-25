import { render, screen, fireEvent } from "../../tests/utils/test-utils";
import Profile from "./Profile";

describe("Profile", () => {
  test("should render Profile correctly", () => {
    render(<Profile />);

    expect(
      screen.getByRole("heading", { name: /profile/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /username/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /update username/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /remove account/i })
    ).toBeInTheDocument();
  });
  test("input works correctly", () => {
    render(<Profile />);

    const input = screen.getByRole("textbox", { name: /username/i });
    fireEvent.change(input, { target: { value: "newUsername" } });
    expect(input).toHaveValue("newUsername");
  });
});
