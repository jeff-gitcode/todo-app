import React, { act } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { fn, waitFor, within, expect } from '@storybook/test';
import { UseMutateFunction } from '@tanstack/react-query';
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
    args: {
        todo: undefined,
    },
    parameters: {
        nextjs: {
            appDirectory: true,
        },
        moduleMocks: {
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
            mutate: fn() as UseMutateFunction<any, Error, { title: string; completed?: boolean | undefined; }, unknown>,
            data: undefined,
            error: null,
            variables: undefined,
            isError: false,
            isIdle: true,
            isLoading: false,
            isPaused: false,
            isSuccess: false,
        }));

        const mockUseUpdateTodo = getMock(parameters, actual, 'useUpdateTodo');
        mockUseUpdateTodo.mockImplementation(() => ({
            mutate: fn() as UseMutateFunction<any, Error, { title: string; completed?: boolean | undefined; }, unknown>,
            data: undefined,
            error: null,
            variables: undefined,
            isError: false,
            isIdle: true,
            isLoading: false,
            isPaused: false,
            isSuccess: false,
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
    },
    parameters: {
        moduleMocks: {
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
        const mockUseUpdateTodo = getMock(parameters, actual, 'useUpdateTodo');
        mockUseUpdateTodo.mockImplementation(() => ({
            mutate: fn() as UseMutateFunction<any, Error, { title: string; completed?: boolean | undefined; }, unknown>,
            data: undefined,
            error: null,
            variables: undefined,
            isError: false,
            isIdle: true,
            isLoading: false,
            isPaused: false,
            isSuccess: false,
        }));


        render(parameters);

        const canvas = within(canvasElement);

        const input = canvas.getByDisplayValue('Sample Todo');
        expect(input).toBeInTheDocument();

        const button = canvas.getByRole('button', { name: 'Update Todo' });
        expect(button).toBeInTheDocument();

        act(() => {
            button.click();
        });

        await waitFor(async () => {
            await expect(mockUseUpdateTodo).toHaveBeenCalled();
        });
    }
};
