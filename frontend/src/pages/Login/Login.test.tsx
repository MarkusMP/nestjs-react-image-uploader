import { render, screen, fireEvent } from "../../tests/utils/test-utils";
import Login from "./Login";

describe("Login", () => {
  test("should render Login component", () => {
    render(<Login />);
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /register/i })).toBeInTheDocument();
  });
  test("input is typeable", () => {
    render(<Login />);
    const input = screen.getByLabelText(/email/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test" } });
    expect(input.value).toBe("test");
  });
});
