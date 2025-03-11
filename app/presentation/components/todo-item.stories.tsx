import { act } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { fn, waitFor, within, expect, fireEvent } from '@storybook/test';
import TodoItem from './todo-item';
import { createMock, getMock, render } from 'storybook-addon-module-mock';
import * as actual from '../hooks/use-todos';

const mockTodo = { id: 1, title: 'Sample Todo' };

const meta = {
    title: 'Components/TodoItem',
    component: TodoItem,
    tags: ['autodocs'],
    parameters: {
        controls: { expanded: true },
        jest: ['todo-item.test.tsx'],
    },
} satisfies Meta<typeof TodoItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Create: Story = {
    beforeEach: () => {
        // Reset the mock before each test
        // useCreateTodo.mockClear();
        // useUpdateTodo.mockClear();
    },
    args: {
        todo: undefined,
        onSuccess: fn(),
    },
    parameters: {
        nextjs: {
            appDirectory: true,
        },
        moduleMock: {
            mock: () => {
                const useCreateTodo = actual.useCreateTodo;
                const useUpdateTodo = actual.useUpdateTodo;

                const mockUseCreateTodo = createMock(actual, 'useCreateTodo');
                mockUseCreateTodo.mockImplementation(useCreateTodo);

                const mockUseUpdateTodo = createMock(actual, 'useUpdateTodo');
                mockUseUpdateTodo.mockImplementation(useUpdateTodo);

                return [mockUseCreateTodo, mockUseUpdateTodo];
            },
        },
    },
    play: async ({ canvasElement, parameters }) => {
        const mockUseCreateTodo = getMock(parameters, actual, 'useCreateTodo');
        mockUseCreateTodo.mockImplementation(() => ({
            context: undefined,
            data: undefined,
            error: null,
            variables: undefined,
            submittedAt: 0,
            failureCount: 0,
            failureReason: null,
            status: 'idle',
            mutate: fn(),
            mutateAsync: fn(),
            isError: false,
            isSuccess: false,
            isPaused: false,
            isPending: false,
            isIdle: true,
            reset: fn(),
        }));

        const mockUseUpdateTodo = getMock(parameters, actual, 'useUpdateTodo');
        mockUseUpdateTodo.mockImplementation(() => ({
            context: undefined,
            data: undefined,
            error: null,
            variables: undefined,
            submittedAt: 0,
            failureCount: 0,
            failureReason: null,
            status: 'idle',
            mutate: fn(),
            mutateAsync: fn(),
            isError: false,
            isSuccess: false,
            isPaused: false,
            isPending: false,
            isIdle: true,
            reset: fn(),
        }));

        render(parameters);

        const canvas = within(canvasElement);

        const input = canvas.getByPlaceholderText('Enter a todo');
        expect(input).toBeInTheDocument();

        const button = canvas.getByRole('button', { name: 'Create Todo' });
        expect(button).toBeInTheDocument();

        act(() => {
            button.click();
        });

        await waitFor(async () => {
            await expect(mockUseCreateTodo).toHaveBeenCalled();
        });
    }
};

export const Edit: Story = {
    args: {
        todo: mockTodo,
        onSuccess: fn(),
    },
    parameters: {
        moduleMock: {
            mock: () => {
                const useCreateTodo = actual.useCreateTodo;
                const useUpdateTodo = actual.useUpdateTodo;

                const mockUseCreateTodo = createMock(actual, 'useCreateTodo');
                mockUseCreateTodo.mockImplementation(useCreateTodo);

                const mockUseUpdateTodo = createMock(actual, 'useUpdateTodo');
                mockUseUpdateTodo.mockImplementation(useUpdateTodo);

                return [mockUseCreateTodo, mockUseUpdateTodo];
            }
        }
    },
    play: async ({ canvasElement, parameters }) => {
        const mockUseCreateTodo = getMock(parameters, actual, 'useCreateTodo');
        mockUseCreateTodo.mockImplementation(() => ({
            context: undefined,
            data: undefined,
            error: null,
            variables: undefined,
            submittedAt: 0,
            failureCount: 0,
            failureReason: null,
            status: 'idle',
            mutate: fn(),
            mutateAsync: fn(),
            isError: false,
            isSuccess: false,
            isPaused: false,
            isPending: false,
            isIdle: true,
            reset: fn(),
        }));

        const mockUseUpdateTodo = getMock(parameters, actual, 'useUpdateTodo');
        mockUseUpdateTodo.mockImplementation(() => ({
            context: undefined,
            data: undefined,
            error: null,
            variables: undefined,
            submittedAt: 0,
            failureCount: 0,
            failureReason: null,
            status: 'idle',
            mutate: fn(),
            mutateAsync: fn(),
            isError: false,
            isSuccess: false,
            isPaused: false,
            isPending: false,
            isIdle: true,
            reset: fn(),
        }));

        render(parameters);
        const canvas = within(canvasElement);

        const input = canvas.getByDisplayValue('Sample Todo');
        expect(input).toBeInTheDocument();
        // change the value of the input
        fireEvent.change(canvas.getByPlaceholderText('Enter a todo'), {
            target: { value: 'Updated Todo' }
        });

        // const button = canvas.getByRole('button', { name: 'Update Todo' });
        // expect(button).toBeInTheDocument();

        // act(() => {
        //     button.click();
        // });

        // await waitFor(async () => {
        //     await expect(mockUseUpdateTodo).toHaveBeenCalled();
        // });
    }
};
