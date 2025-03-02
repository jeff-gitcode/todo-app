import { renderHook, act } from '@testing-library/react-hooks';
import { useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCreateTodo } from './use-todos';
import { TodoFormData } from '../validation/todo-schema';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useCreateTodo', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should create a new todo', async () => {
    const newTodo: TodoFormData = { title: 'Test Todo', description: 'Test Description' };
    const createdTodo = { id: 1, ...newTodo, createdAt: new Date(), updatedAt: new Date() };

    fetchMock.mockResponseOnce(JSON.stringify(createdTodo));

    const { result, waitFor } = renderHook(() => useCreateTodo(), { wrapper });

    act(() => {
      result.current.mutate(newTodo);
    });

    await waitFor(() => result.current.isSuccess);

    expect(fetchMock).toHaveBeenCalledWith(`${API_BASE_URL}/api/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });

    expect(result.current.data).toEqual(createdTodo);
  });

  it('should handle errors', async () => {
    const newTodo: TodoFormData = { title: 'Test Todo', description: 'Test Description' };

    fetchMock.mockRejectOnce(new Error('Failed to create todo'));

    const { result, waitFor } = renderHook(() => useCreateTodo(), { wrapper });

    act(() => {
      result.current.mutate(newTodo);
    });

    await waitFor(() => result.current.isError);

    expect(result.current.error).toEqual(new Error('Failed to create todo'));
  });

  it('should invalidate todos query on success', async () => {
    const newTodo: TodoFormData = { title: 'Test Todo', description: 'Test Description' };
    const createdTodo = { id: 1, ...newTodo, createdAt: new Date(), updatedAt: new Date() };

    fetchMock.mockResponseOnce(JSON.stringify(createdTodo));

    const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');

    const { result, waitFor } = renderHook(() => useCreateTodo(), { wrapper });

    act(() => {
      result.current.mutate(newTodo);
    });

    await waitFor(() => result.current.isSuccess);

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['todos'] });
  });
});