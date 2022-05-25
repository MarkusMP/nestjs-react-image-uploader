import { render, screen, fireEvent } from "../../tests/utils/test-utils";
import Register from "./Register";

describe("Register", () => {
  test("should render Register component", () => {
    render(<Register />);
    expect(
      screen.getByRole("heading", { name: /register/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", {
        name: /username/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();

    expect(screen.getByLabelText(/passwordconfirm/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/already have an account\?/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
  });
  test("input is typeable", () => {
    render(<Register />);
    const input = screen.getByLabelText(/email/i) as HTMLInputElement;
    const input2 = screen.getByRole("textbox", {
      name: /username/i,
    }) as HTMLInputElement;
    const input3 = screen.getByLabelText(
      /passwordconfirm/i
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.change(input2, { target: { value: "test" } });
    fireEvent.change(input3, { target: { value: "test" } });
    expect(input.value).toBe("test");
    expect(input2.value).toBe("test");
    expect(input3.value).toBe("test");
  });
});
