import { act } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TodoList from './todo-list';
import { fn, waitFor, within, expect } from '@storybook/test';
import * as actual from '../hooks/use-todos';
import { createMock, getMock, render } from 'storybook-addon-module-mock';

const routerPush = fn();

const mockTodos = [
  { id: 1, title: 'Todo 1', completed: false, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, title: 'Todo 2', completed: false, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, title: 'Todo 3', completed: false, createdAt: new Date(), updatedAt: new Date() },
];

// const useTodos = fn(actual.useTodos).mockName('useTodos');
// const useDeleteTodo = fn(actual.useDeleteTodo).mockName('useDeleteTodo');

const meta = {
  title: 'Components/TodoList',
  component: TodoList,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    nextjs: {
      // 👇 As in the Next.js application, next/navigation only works using App Router
      appDirectory: true,
      // router: {
      //   push: routerPush,
      //   asPath: '/',
      //   pathname: '/',
      //   query: {},
      //   redirect: fn(),
      //   getRouter: fn(),
      // },
    },
    jest: ['todo-list.test.tsx'],
  },
} satisfies Meta<typeof TodoList>;;


export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  beforeEach: () => {
    // Reset the mock before each test
    // useTodos.mockClear();
    // useDeleteTodo.mockClear();

    // useTodos.mockReturnValue({ data: mockTodos, isLoading: false, error: null });
    // useDeleteTodo.mockReturnValue({
    //   mutate: fn(),
    //   data: undefined,
    //   error: null,
    //   variables: undefined,
    //   isError: false,
    //   isLoading: false,
    //   isSuccess: false,
    // });
  },
  args: {
    // Provide default props here if needed
  },
  parameters: {
    nextjs: {
      // appDirectory: true,
      router: {
        push: routerPush,
      },
    },
    moduleMock: {
      mock: () => {
        const useTodos = actual.useTodos;
        const useDeleteTodo = actual.useDeleteTodo;

        const mock = createMock(actual, 'useTodos');
        mock.mockImplementation(useTodos);

        const mock2 = createMock(actual, 'useDeleteTodo');
        mock2.mockImplementation(useDeleteTodo);
        
        return [mock, mock2];
      },
    },
  },
  play: async ({ canvasElement, parameters }) => {
    const mock = getMock(parameters, actual, 'useTodos');
    mock.mockImplementation(() => ({ data: mockTodos, isLoading: false, error: null }));
    const mock2 = getMock(parameters, actual, 'useDeleteTodo');
    mock2.mockImplementation(() => ({
      mutate: fn(),
      data: undefined,
      error: null,
      variables: undefined,
      isError: false,
      isLoading: false,
      isSuccess: false,
    }));

    render(parameters);
    const canvas = within(canvasElement);

    await waitFor(async () => {
      expect(mock).toBeCalled();
      expect(mock2).toBeCalled();
    });

    const deleteButton = canvas.getAllByRole('button', { name: /Delete/i })[0];


    // for (let i = 0; i < 1; i++) {
    //   const deleteButton = canvas.getAllByRole('button', { name: /Delete/i })
    //     .find((button) => button.id === i.toString());

    expect(deleteButton).toBeDefined();

    act(() => {
      deleteButton!.click();
    });

    await waitFor(() => {
      expect(mock2).toBeCalled();
    });
  },
};
