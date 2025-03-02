import "@testing-library/jest-dom";
import { useTodos, useTodoById, useCreateTodo, useUpdateTodo, useDeleteTodo } from './use-todos';
import { renderHook, act } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import fetchMock from 'jest-fetch-mock';
import { render } from "@testing-library/react";
import TodoList from "../components/todo-list";

fetchMock.enableMocks();

const queryClient = new QueryClient();

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useTodos', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it("renders correctly", () => {
        const screen = render(
            <QueryClientProvider client={queryClient}>
                <TodoList />
            </QueryClientProvider>
        );

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it('fetches todos successfully', async () => {
        const todos = [{ id: 1, title: 'Test Todo' }];
        fetchMock.mockResponseOnce(JSON.stringify(todos));

        const { result, waitFor } = renderHook(() => useTodos(), { wrapper });

        await waitFor(() => result.current.isSuccess);

        expect(result.current.data).toEqual(todos);
    });

    it('handles fetch todos error', async () => {
        fetchMock.mockRejectOnce(new Error('Failed to fetch todos'));

        const { result, waitFor } = renderHook(() => useTodos(), { wrapper });

        await waitFor(() => result.current.isError);

        expect(result.current.error).toEqual(new Error('Failed to fetch todos'));
    });
});

describe('useTodoById', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('fetches a todo by ID successfully', async () => {
        const todo = { id: 1, title: 'Test Todo' };
        fetchMock.mockResponseOnce(JSON.stringify(todo));

        const { result, waitFor } = renderHook(() => useTodoById(1), { wrapper });

        await waitFor(() => result.current.isSuccess);

        expect(result.current.data).toEqual(todo);
    });

    it('handles fetch todo by ID error', async () => {
        fetchMock.mockRejectOnce(new Error('Failed to fetch todo'));

        const { result, waitFor } = renderHook(() => useTodoById(1), { wrapper });

        await waitFor(() => result.current.isError);

        expect(result.current.error).toEqual(new Error('Failed to fetch todo'));
    });
});

describe('useCreateTodo', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('creates a new todo successfully', async () => {
        const newTodo = { title: 'New Todo' };
        fetchMock.mockResponseOnce(JSON.stringify(newTodo));

        const { result, waitFor } = renderHook(() => useCreateTodo(), { wrapper });

        act(() => {
            result.current.mutate(newTodo);
        });

        await waitFor(() => result.current.isSuccess);

        expect(fetchMock).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
            method: 'POST',
            body: JSON.stringify(newTodo),
        }));
    });

    it('handles create todo error', async () => {
        fetchMock.mockRejectOnce(new Error('Failed to create todo'));

        const { result, waitFor } = renderHook(() => useCreateTodo(), { wrapper });

        act(() => {
            result.current.mutate({ title: 'New Todo' });
        });

        await waitFor(() => result.current.isError);

        expect(result.current.error).toEqual(new Error('Failed to create todo'));
    });
});

describe('useUpdateTodo', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('updates a todo successfully', async () => {
        const updatedTodo = { id: 1, title: 'Updated Todo' };
        fetchMock.mockResponseOnce(JSON.stringify(updatedTodo));

        const { result, waitFor } = renderHook(() => useUpdateTodo(), { wrapper });

        act(() => {
            result.current.mutate(updatedTodo);
        });

        await waitFor(() => result.current.isSuccess);

        expect(fetchMock).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
            method: 'PATCH',
            body: JSON.stringify(updatedTodo),
        }));
    });

    it('handles update todo error', async () => {
        fetchMock.mockRejectOnce(new Error('Failed to update todo'));

        const { result, waitFor } = renderHook(() => useUpdateTodo(), { wrapper });

        act(() => {
            result.current.mutate({ id: 1, title: 'Updated Todo' });
        });

        await waitFor(() => result.current.isError);

        expect(result.current.error).toEqual(new Error('Failed to update todo'));
    });
});

describe('useDeleteTodo', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('deletes a todo successfully', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({}));

        const { result, waitFor } = renderHook(() => useDeleteTodo(), { wrapper });

        act(() => {
            result.current.mutate(1);
        });

        await waitFor(() => result.current.isSuccess);

        expect(fetchMock).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
            method: 'DELETE',
        }));
    });

    it('handles delete todo error', async () => {
        fetchMock.mockRejectOnce(new Error('Failed to delete todo'));

        const { result, waitFor } = renderHook(() => useDeleteTodo(), { wrapper });

        act(() => {
            result.current.mutate(1);
        });

        await waitFor(() => result.current.isError);

        expect(result.current.error).toEqual(new Error('Failed to delete todo'));
    });
});