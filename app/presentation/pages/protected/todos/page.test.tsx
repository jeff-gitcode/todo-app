import { render, screen } from "@testing-library/react";
import TodoPage from "./page";

jest.mock("@/app/presentation/components/todo-list", () =>
  jest.fn(() => <div>TodoList Component</div>),
);

describe("TodoPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders TodoList component", () => {
    render(<TodoPage />);

    expect(screen.getByText(/todolist component/i)).toBeInTheDocument();
  });
});
