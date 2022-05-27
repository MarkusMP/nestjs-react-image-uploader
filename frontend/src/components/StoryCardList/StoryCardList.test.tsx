import { render, screen } from "../../tests/utils/test-utils";
import StoryCardList from "./StoryCardList";

describe("StoryCardList", () => {
  test("should render StoryCardList component", () => {
    render(<StoryCardList />);
    expect(
      screen.getByRole("heading", { name: /stories/i })
    ).toBeInTheDocument();
  });
});
