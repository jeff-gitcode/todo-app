import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { fn, waitFor, within, expect } from '@storybook/test';
import TodoItem from './todo-item';
import { createMock, getMock, render } from 'storybook-addon-module-mock';
import * as actual from '@/app/presentation/hooks/use-todos';

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

                const mock = createMock(actual, 'useCreateTodo');
                mock.mockImplementation(useCreateTodo);

                const mock2 = createMock(actual, 'useUpdateTodo');
                mock2.mockImplementation(useUpdateTodo);

                return [mock, mock2];
            },
        },
    },
    play: async ({ canvasElement, parameters }) => {
        const mock = getMock(parameters, actual, 'useCreateTodo');
        mock.mockImplementation(() => ({ mutate: fn() }));

        const mock2 = getMock(parameters, actual, 'useUpdateTodo');
        mock2.mockImplementation(() => ({ mutate: fn() }));

        render(parameters);

        const canvas = within(canvasElement);
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

                const mock = createMock(actual, 'useCreateTodo');
                mock.mockImplementation(useCreateTodo);

                const mock2 = createMock(actual, 'useUpdateTodo');
                mock2.mockImplementation(useUpdateTodo);

                return [mock, mock2];
            }
        }
    },
    play: async ({ canvasElement, parameters }) => {
        const mock = getMock(parameters, actual, 'useCreateTodo');
        mock.mockImplementation(() => ({ mutate: fn() }));

        const mock2 = getMock(parameters, actual, 'useUpdateTodo');
        mock2.mockImplementation(() => ({ mutate: fn() }));

        render(parameters);

        const canvas = within(canvasElement);
    }
};