import { render, screen } from "@testing-library/react";
import EditTodoPage from "./page";
import { usePathname } from "next/navigation";
import { useTodoById } from "@/app/presentation/hooks/use-todos";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("@/app/presentation/hooks/use-todos", () => ({
  useTodoById: jest.fn(),
}));

jest.mock("@/app/presentation/components/todo-item", () =>
  jest.fn(() => <div>TodoItem Component</div>),
);

describe("EditTodoPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (usePathname as jest.Mock).mockReturnValue("/protected/todos/1");
    (useTodoById as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<EditTodoPage />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    (usePathname as jest.Mock).mockReturnValue("/protected/todos/1");
    (useTodoById as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<EditTodoPage />);

    expect(screen.getByText(/error fetching todo/i)).toBeInTheDocument();
  });

  it("renders TodoItem component with todo data", () => {
    const mockTodo = { id: 1, title: "Test Todo" };
    (usePathname as jest.Mock).mockReturnValue("/protected/todos/1");
    (useTodoById as jest.Mock).mockReturnValue({
      data: mockTodo,
      isLoading: false,
      isError: false,
    });

    render(<EditTodoPage />);

    expect(screen.getByText(/edit todo/i)).toBeInTheDocument();
    expect(screen.getByText(/todoitem component/i)).toBeInTheDocument();
  });
});
