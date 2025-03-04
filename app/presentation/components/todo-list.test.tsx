/**
 * @jest-environment jsdom
 */
import React from 'react';
import '@testing-library/jest-dom';
import { render } from "@testing-library/react";
import { fireEvent, waitFor } from '@testing-library/dom';
import TodoList from '@/app/presentation/components/todo-list';
import { useTodos, useDeleteTodo } from '@/app/presentation/hooks/use-todos';
import { useRouter } from 'next/navigation';

jest.mock('@/app/presentation/hooks/use-todos', () => ({
    useTodos: jest.fn(),
    useDeleteTodo: jest.fn(),
}));

const mockUseTodos = useTodos as jest.Mock;
const mockUseDeleteTodo = useDeleteTodo as jest.Mock;

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe("TodoList", () => {
    const mockRouterPush = jest.fn(() => Promise.resolve(true));

    beforeEach(() => {
        jest.clearAllMocks();

        (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
        mockUseDeleteTodo.mockReturnValue({ mutate: jest.fn() });
    });

    it("renders loading state", () => {
        mockUseTodos.mockReturnValue({ data: null, isLoading: true, error: null });

        const screen = render(<TodoList />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it("renders error state", () => {
        const error = { message: 'Failed to fetch todos' };
        mockUseTodos.mockReturnValue({ data: null, isLoading: false, error });

        const screen = render(<TodoList />);

        expect(screen.getByText(`Error: ${error.message}`)).toBeInTheDocument();
    });

    it("renders todo list", () => {
        const todos = [{ id: 1, title: 'Test Todo' }];
        mockUseTodos.mockReturnValue({ data: todos, isLoading: false, error: null });

        const screen = render(<TodoList />);

        expect(screen.getByText('Test Todo')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /New/i })).toBeInTheDocument();
    });

    it("calls deleteTodo on delete button click", async () => {
        const todos = [{ id: 1, title: 'Test Todo' }];
        const deleteTodoMutate = jest.fn();
        mockUseTodos.mockReturnValue({ data: todos, isLoading: false, error: null });
        mockUseDeleteTodo.mockReturnValue({ mutate: deleteTodoMutate });

        const screen = render(<TodoList />);

        fireEvent.click(screen.getByRole('button', { name: /Delete/i }));

        await waitFor(() => {
            expect(deleteTodoMutate).toHaveBeenCalledWith(1, { onSuccess: expect.any(Function) });
        });
    });

    it("redirects to home on successful delete", async () => {
        const todos = [{ id: 1, title: 'Test Todo' }];
        const deleteTodoMutate = jest.fn((id, { onSuccess }) => onSuccess());
        mockUseTodos.mockReturnValue({ data: todos, isLoading: false, error: null });
        mockUseDeleteTodo.mockReturnValue({ mutate: deleteTodoMutate });

        const screen = render(<TodoList />);

        fireEvent.click(screen.getByRole('button', { name: /Delete/i }));

        await waitFor(() => {
            expect(mockRouterPush).toHaveBeenCalledWith('/');
        });
    });

    it("redirects to todo edit page on edit button click", async () => {
        const todos = [{ id: 1, title: 'Test Todo' }];
        mockUseTodos.mockReturnValue({ data: todos, isLoading: false, error: null });

        const screen = render(<TodoList />);

        fireEvent.click(screen.getByRole('button', { name: /Edit/i }));
        expect(screen.getByRole('button', { name: /Edit/i }).closest('a')).toHaveAttribute('href', '/presentation/pages/protected/todos/1');
        await waitFor(() => {
            expect(mockRouterPush).toHaveBeenCalledWith('/presentation/pages/protected/todos/1');
        });
    });

    it("redirects to todo create page on new button click", async () => {
        mockUseTodos.mockReturnValue({ data: [], isLoading: false, error: null });

        const screen = render(<TodoList />);

        fireEvent.click(screen.getByRole('button', { name: /New/i }));
        expect(screen.getByRole('button', { name: /New/i }).closest('a')).toHaveAttribute('href', '/presentation/pages/protected/todos/0');

        await waitFor(() => {
            expect(mockRouterPush).toHaveBeenCalledWith('/presentation/pages/protected/todos/new');
        });
    });
});