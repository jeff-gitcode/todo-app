import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { fireEvent, waitFor } from '@testing-library/dom';
import TodoForm from './todo-item';
import { useCreateTodo, useUpdateTodo } from '@/app/presentation/hooks/use-todos';

// Mock the useCreateTodo and useUpdateTodo hooks
jest.mock('@/app/presentation/hooks/use-todos', () => ({
    useCreateTodo: jest.fn(),
    useUpdateTodo: jest.fn()
}));

const mockUseCreateTodo = useCreateTodo as jest.Mock;
const mockUseUpdateTodo = useUpdateTodo as jest.Mock;

describe('TodoForm', () => {
    const mockOnSuccess = jest.fn();

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Mock the mutate functions for create and update
        mockUseCreateTodo.mockReturnValue({ mutate: jest.fn() });
        mockUseUpdateTodo.mockReturnValue({ mutate: jest.fn() });
    });

    it('renders the form with default values when no todo is provided', () => {
        const screen = render(<TodoForm onSuccess={mockOnSuccess} />);
        // screen.debug();
        // Check if the form is rendered with the correct placeholder
        expect(screen.getByPlaceholderText('Enter a todo')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Create Todo' })).toBeInTheDocument();
    });

    it('renders the form with pre-filled values when a todo is provided', () => {
        const todo = { id: 1, title: 'Existing Todo' };
        const screen = render(<TodoForm todo={todo} onSuccess={mockOnSuccess} />);

        // Check if the form is pre-filled with the existing todo title
        expect(screen.getByDisplayValue('Existing Todo')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Update Todo' })).toBeInTheDocument();
    });

    it('calls createTodo when the form is submitted with a new todo', async () => {
        const createTodoMutate = jest.fn();
        mockUseCreateTodo.mockReturnValue({ mutate: createTodoMutate });

        const screen = render(<TodoForm onSuccess={mockOnSuccess} />);

        // Simulate user input
        fireEvent.change(screen.getByPlaceholderText('Enter a todo'), {
            target: { value: 'New Todo' }
        });

        // Simulate form submission
        fireEvent.click(screen.getByRole('button', { name: 'Create Todo' }));

        // Wait for the form submission to complete
        await waitFor(() => {
            expect(createTodoMutate).toHaveBeenCalledWith(
                { title: 'New Todo' },
                { onSuccess: mockOnSuccess }
            );
        });
    });

    it('calls updateTodo when the form is submitted with an existing todo', async () => {
        const updateTodoMutate = jest.fn();
        mockUseUpdateTodo.mockReturnValue({ mutate: updateTodoMutate });

        const todo = { id: 1, title: 'Existing Todo' };
        const screen = render(<TodoForm todo={todo} onSuccess={mockOnSuccess} />);

        // Simulate user input
        fireEvent.change(screen.getByPlaceholderText('Enter a todo'), {
            target: { value: 'Updated Todo' }
        });

        // Simulate form submission
        fireEvent.click(screen.getByRole('button', { name: 'Update Todo' }));

        // Wait for the form submission to complete
        await waitFor(() => {
            expect(updateTodoMutate).toHaveBeenCalledWith(
                { id: 1, title: 'Updated Todo' },
                { onSuccess: mockOnSuccess }
            );
        });
    });

    it('shows validation error when the form is submitted with an empty title', async () => {
        const screen = render(<TodoForm onSuccess={mockOnSuccess} />);

        // Simulate form submission without entering a title
        fireEvent.click(screen.getByRole('button', { name: 'Create Todo' }));

        // Wait for the validation error to appear
        await waitFor(() => {
            expect(screen.getByText('Title is required')).toBeInTheDocument();
        });
    });
});