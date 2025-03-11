import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, act } from "@testing-library/react-hooks";
import fetchMock from "jest-fetch-mock";
import { useCreateTodo, useDeleteTodo, useUpdateTodo } from "./use-todos";
import { TodoFormData } from "../validation/todo-schema";

fetchMock.enableMocks();

const queryClient = new QueryClient();

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useCreateTodo", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("creates a new todo successfully", async () => {
    const mockTodo: TodoFormData = { title: "Test Todo" };
    fetchMock.mockResponseOnce(JSON.stringify(mockTodo));

    const { result, waitFor } = renderHook(() => useCreateTodo(), { wrapper });

    act(() => {
      result.current.mutate(mockTodo);
    });

    await waitFor(() => result.current.isSuccess);

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(mockTodo),
      }),
    );
    console.log(result.current.data);
    expect(result.current.data).toEqual(mockTodo);
  });

  it("handles error when creating a new todo", async () => {
    fetchMock.mockRejectOnce(new Error("Failed to create todo"));

    const { result, waitFor } = renderHook(() => useCreateTodo(), { wrapper });

    act(() => {
      result.current.mutate({ title: "Test Todo" });
    });

    await waitFor(() => result.current.isError);

    expect(result.current.error).toEqual(new Error("Failed to create todo"));
  });
});

describe("useUpdateTodo", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("updates an existing todo successfully", async () => {
    const mockTodo = { id: 1, title: "Updated Todo" };
    fetchMock.mockResponseOnce(JSON.stringify(mockTodo));

    const { result, waitFor } = renderHook(() => useUpdateTodo(), { wrapper });

    act(() => {
      result.current.mutate(mockTodo);
    });

    await waitFor(() => result.current.isSuccess);

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify(mockTodo),
      }),
    );
    expect(result.current.data).toEqual(mockTodo);
  });

  it("handles error when updating an existing todo", async () => {
    fetchMock.mockRejectOnce(new Error("Failed to update todo"));

    const { result, waitFor } = renderHook(() => useUpdateTodo(), { wrapper });

    act(() => {
      result.current.mutate({ id: 1, title: "Updated Todo" });
    });

    await waitFor(() => result.current.isError);

    expect(result.current.error).toEqual(new Error("Failed to update todo"));
  });
});

describe("useDeleteTodo", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("deletes a todo successfully", async () => {
    fetchMock.mockResponseOnce("");

    const { result, waitFor } = renderHook(() => useDeleteTodo(), { wrapper });

    act(() => {
      result.current.mutate(1);
    });

    await waitFor(() => result.current.isSuccess);

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "DELETE",
      }),
    );
  });

  it("handles error when deleting a todo", async () => {
    fetchMock.mockRejectOnce(new Error("Failed to delete todo"));

    const { result, waitFor } = renderHook(() => useDeleteTodo(), { wrapper });

    act(() => {
      result.current.mutate(1);
    });

    await waitFor(() => result.current.isError);

    expect(result.current.error).toEqual(new Error("Failed to delete todo"));
  });
});
