import { render, screen } from "../../tests/utils/test-utils";
import Header from "./Header";

describe("Header", () => {
  test("should render Header component", () => {
    render(<Header />);
    expect(screen.getByText("Stories")).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /register/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
  });
});
