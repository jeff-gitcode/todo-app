import React, { act } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TodoList from './todo-list';
import { fn } from '@storybook/test';
import * as actual from '../hooks/use-todos';

const routerPush = fn();

const mockTodos = [
  { id: 1, title: 'Todo 1', completed: false, createdAt: new Date(), updatedAt: new Date(), createdAt: new Date(), updatedAt: new Date() },
  { id: 2, title: 'Todo 2', completed: false, createdAt: new Date(), updatedAt: new Date(), createdAt: new Date(), updatedAt: new Date() },
  { id: 3, title: 'Todo 3', completed: false, createdAt: new Date(), updatedAt: new Date(), createdAt: new Date(), updatedAt: new Date() },
];

const useTodos = fn(actual.useTodos).mockName('useTodos');
const useDeleteTodo = fn(actual.useDeleteTodo).mockName('useDeleteTodo');

const meta = {
  title: 'Components/TodoList',
  component: TodoList,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    nextjs: {
      // 👇 As in the Next.js application, next/navigation only works using App Router
      appDirectory: true,
      router: {
        push: routerPush,
        asPath: '/presentation/pages/protected/todos',
        pathname: '/presentation/pages/protected/todos',
        query: {},
      },
    },
    jest: ['todo-list.test.tsx'],

  },
} satisfies Meta<typeof TodoList>;;


export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  beforeEach: () => {
    // Reset the mock before each test
    useTodos.mockClear();
    useDeleteTodo.mockClear();

    useTodos.mockReturnValue({ data: mockTodos, isLoading: false, error: null });
    useDeleteTodo.mockReturnValue({
      mutate: fn(),
      data: undefined,
      error: null,
      variables: undefined,
      isError: false,
      isLoading: false,
      isSuccess: false,
    });
  },
  args: {
    // Provide default props here if needed
  },
};
